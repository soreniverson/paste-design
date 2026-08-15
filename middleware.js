import pieces from "./pieces.json";

export const config = {
  matcher: ["/day/:path*"],
};

function pieceFromDay(day) {
  const n = parseInt(String(day || ""), 10);
  if (!n || n < 1) return null;
  const id = "day-" + String(n).padStart(2, "0");
  return { id, n, ...(pieces[id] || { day: "Day " + n, title: "Study", desc: "Interaction craft." }) };
}

function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default function middleware(request) {
  const url = new URL(request.url);
  const m = url.pathname.match(/^\/day\/(\d+)\/?$/);
  if (!m) return;

  const day = m[1];
  const accent = (url.searchParams.get("accent") || "2e6b5c").replace("#", "").toLowerCase();
  const density = url.searchParams.get("density") || "4";

  const ua = request.headers.get("user-agent") || "";
  const isBot =
    /bot|crawl|slurp|spider|facebookexternalhit|Facebot|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|Telegram|SkypeUriPreview|Applebot|redditbot|Pinterest|Iframely|embedly|Quora|vkShare|W3C_Validator|Preview/i.test(
      ua
    );
  if (!isBot) return;

  const piece = pieceFromDay(day);
  if (!piece) return;

  const og =
    url.origin +
    "/api/og?v=2&day=" +
    encodeURIComponent(String(piece.n)) +
    "&accent=" +
    encodeURIComponent(accent);

  const title = piece.day + " · " + piece.title;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${esc(title)} · Visual Repository</title>
<meta name="description" content="${esc(piece.desc)}"/>
<meta property="og:type" content="website"/>
<meta property="og:site_name" content="Visual Repository"/>
<meta property="og:title" content="${esc(title)}"/>
<meta property="og:description" content="${esc(piece.desc)}"/>
<meta property="og:url" content="${esc(url.href)}"/>
<meta property="og:image" content="${esc(og)}"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${esc(title)}"/>
<meta name="twitter:description" content="${esc(piece.desc)}"/>
<meta name="twitter:image" content="${esc(og)}"/>
</head>
<body></body>
</html>`;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, s-maxage=600, stale-while-revalidate=86400",
    },
  });
}
