import pieces from "../pieces.json";

export const config = { runtime: "edge" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function pieceFor(day) {
  const n = parseInt(String(day || ""), 10);
  if (!n || n < 1) {
    const keys = Object.keys(pieces).sort();
    const last = keys[keys.length - 1];
    return { n: parseInt(last.replace("day-", ""), 10), ...(pieces[last] || {}) };
  }
  const id = "day-" + String(n).padStart(2, "0");
  return { n, ...(pieces[id] || { day: "Day " + n, title: "Study", desc: "" }) };
}

function welcomeHtml(p, origin) {
  const url = origin + "/day/" + p.n;
  const title = (p.day || "Day " + p.n) + " · " + (p.title || "Study");
  return `<!doctype html>
<html><body style="margin:0;background:#f4f2ee;font-family:Geist,ui-sans-serif,system-ui,sans-serif;color:#1f1c1a;">
  <div style="max-width:520px;margin:40px auto;padding:36px 32px;background:#fff;border-radius:20px;">
    <p style="margin:0 0 8px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#6b6661;">Visual Repository</p>
    <h1 style="margin:0 0 12px;font-size:28px;letter-spacing:-.03em;">${title}</h1>
    <p style="margin:0 0 24px;font-size:16px;line-height:1.45;color:#6b6661;">${p.desc || ""}</p>
    <p style="margin:0 0 28px;"><a href="${url}" style="color:#2e6b5c;font-weight:600;">Open the piece</a></p>
    <p style="margin:0;font-size:13px;color:#6b6661;">Friday you’ll get ideas from the week, plus the install prompt. Unsubscribe anytime.</p>
  </div>
</body></html>`;
}

export default async function handler(req) {
  if (req.method !== "POST") {
    return Response.json({ error: "method" }, { status: 405 });
  }

  let body = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad_json" }, { status: 400 });
  }

  if (body.company) {
    return Response.json({ ok: true, skipped: true });
  }

  const email = String(body.email || "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "email" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const origin = new URL(req.url).origin;
  const piece = pieceFor(body.day);
  const from = process.env.RESEND_FROM || "Visual Repository <beth.t@example.com>";
  const audience = process.env.RESEND_AUDIENCE_ID;
  const headers = { Authorization: "Bearer " + key, "content-type": "application/json" };

  if (audience) {
    const add = await fetch("https://api.resend.com/audiences/" + audience + "/contacts", {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        unsubscribed: false,
        data: { source: "visual-repo", day: String(piece.n || "") },
      }),
    });
    if (add.status === 409) {
      // already on the list; still try welcome once
    } else if (!add.ok) {
      const err = await add.text();
      if (!/already exists/i.test(err)) {
        return Response.json({ error: "list", detail: err.slice(0, 200) }, { status: 502 });
      }
    }
  }

  const sent = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers,
    body: JSON.stringify({
      from,
      to: [email],
      subject: piece.day + " · " + (piece.title || "Visual Repository"),
      html: welcomeHtml(piece, origin),
    }),
  });

  if (!sent.ok) {
    const err = await sent.text();
    return Response.json({ error: "send", detail: err.slice(0, 200) }, { status: 502 });
  }

  return Response.json({ ok: true, day: piece.n });
}
