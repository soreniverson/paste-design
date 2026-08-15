import { ImageResponse } from "@vercel/og";

export const config = { runtime: "edge" };

const INK = "#1f1c1a";
const MUTED = "#6b6661";
const SURFACE = "#ffffff";
const STAGE = "#f5f5f5";
const PAPER = "#f4f2ee";
const LINE = "rgba(31,28,26,0.08)";

function box(style, children) {
  const props = { style: { display: "flex", ...style } };
  if (children !== undefined) props.children = children;
  return { type: "div", props };
}

function hair() {
  return "inset 0 0 0 1px " + LINE;
}

function svg(w, h, children, extra) {
  return {
    type: "svg",
    props: { width: String(w), height: String(h), viewBox: "0 0 " + w + " " + h, ...(extra || {}), children },
  };
}

function asset(n, a) {
  if (n === 1) {
    return box(
      {
        background: a,
        color: "#fff",
        borderRadius: 999,
        padding: "18px 36px",
        fontSize: 28,
        fontWeight: 600,
        letterSpacing: -0.4,
      },
      "Send"
    );
  }
  if (n === 2) {
    return box(
      {
        width: 360,
        height: 64,
        background: SURFACE,
        borderRadius: 16,
        alignItems: "center",
        paddingLeft: 22,
        paddingRight: 18,
        justifyContent: "space-between",
        boxShadow: hair(),
      },
      [
        box({ color: MUTED, fontSize: 28, letterSpacing: 6, fontWeight: 600 }, "••••••••"),
        box(
          {
            width: 36,
            height: 36,
            borderRadius: 999,
            background: STAGE,
            alignItems: "center",
            justifyContent: "center",
          },
          svg(20, 20, [
            { type: "circle", props: { cx: "10", cy: "10", r: "3", fill: MUTED } },
            {
              type: "ellipse",
              props: { cx: "10", cy: "10", rx: "8", ry: "5", fill: "none", stroke: MUTED, strokeWidth: "1.6" },
            },
          ])
        ),
      ]
    );
  }
  if (n === 3) {
    return box(
      {
        width: 92,
        height: 52,
        borderRadius: 999,
        background: a,
        padding: 5,
        justifyContent: "flex-end",
        alignItems: "center",
      },
      box({ width: 42, height: 42, borderRadius: 999, background: SURFACE })
    );
  }
  if (n === 4) {
    const item = (label, on) =>
      box(
        {
          padding: "12px 22px",
          borderRadius: 999,
          background: on ? SURFACE : "transparent",
          color: on ? INK : MUTED,
          fontSize: 22,
          fontWeight: 600,
          boxShadow: on ? hair() : "none",
        },
        label
      );
    return box(
      {
        background: "rgba(31,28,26,0.06)",
        borderRadius: 999,
        padding: 6,
        gap: 4,
        alignItems: "center",
      },
      [item("Day", false), item("Week", true), item("Month", false)]
    );
  }
  if (n === 5) {
    return box(
      {
        width: 220,
        height: 64,
        borderRadius: 999,
        background: SURFACE,
        alignItems: "center",
        justifyContent: "center",
        color: INK,
        fontSize: 24,
        fontWeight: 600,
        boxShadow: hair(),
      },
      "Hold"
    );
  }
  if (n === 6) {
    return box(
      {
        width: 88,
        height: 88,
        borderRadius: 999,
        background: SURFACE,
        alignItems: "center",
        justifyContent: "center",
        boxShadow: hair(),
      },
      svg(40, 40, [
        {
          type: "path",
          props: {
            d: "M20 34s-14-8.6-14-17.2C6 11 11 8 16 11c2.2 1.3 4 4 4 4s1.8-2.7 4-4c5-3 10 0 10 5.8C34 25.4 20 34 20 34z",
            fill: a,
          },
        },
      ])
    );
  }
  if (n === 7) {
    return box(
      {
        width: 56,
        height: 56,
        borderRadius: 16,
        background: a,
        alignItems: "center",
        justifyContent: "center",
      },
      svg(28, 28, [
        {
          type: "polyline",
          props: {
            points: "6,15 12,21 22,8",
            fill: "none",
            stroke: "#fff",
            strokeWidth: "3.2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
      ])
    );
  }
  if (n === 8) {
    const cell = (t, muted) =>
      box(
        {
          width: 56,
          height: 56,
          borderRadius: 16,
          background: SURFACE,
          alignItems: "center",
          justifyContent: "center",
          color: muted ? MUTED : INK,
          fontSize: 28,
          fontWeight: 600,
          boxShadow: hair(),
        },
        t
      );
    return box({ gap: 12, alignItems: "center" }, [cell("−", true), cell("3", false), cell("+", true)]);
  }
  if (n === 9) {
    return box(
      { width: 420, height: 28, alignItems: "center", position: "relative" },
      [
        box({
          position: "absolute",
          left: 0,
          right: 0,
          height: 8,
          borderRadius: 999,
          background: "rgba(31,28,26,0.08)",
        }),
        box({
          position: "absolute",
          left: 0,
          width: "58%",
          height: 8,
          borderRadius: 999,
          background: a,
        }),
        box({
          position: "absolute",
          left: "58%",
          marginLeft: -16,
          width: 32,
          height: 32,
          borderRadius: 999,
          background: SURFACE,
          boxShadow: "0 0 0 1px " + LINE + ", 0 6px 16px rgba(31,28,26,0.16)",
        }),
      ]
    );
  }
  if (n === 10) {
    return box(
      {
        width: 380,
        height: 64,
        background: SURFACE,
        borderRadius: 16,
        alignItems: "center",
        paddingLeft: 22,
        paddingRight: 16,
        justifyContent: "space-between",
        boxShadow: hair(),
      },
      [
        box({ color: INK, fontSize: 24, fontWeight: 500 }, "Search"),
        box(
          {
            width: 28,
            height: 28,
            borderRadius: 999,
            background: STAGE,
            alignItems: "center",
            justifyContent: "center",
            color: MUTED,
            fontSize: 18,
            fontWeight: 600,
          },
          "×"
        ),
      ]
    );
  }
  if (n === 11) {
    const cell = (ch, on) =>
      box(
        {
          width: 64,
          height: 76,
          borderRadius: 16,
          background: SURFACE,
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          fontWeight: 600,
          color: INK,
          boxShadow: on ? "inset 0 0 0 2px " + a : hair(),
        },
        ch
      );
    return box({ gap: 12 }, [cell("4", true), cell("", false), cell("", false), cell("", false)]);
  }
  if (n === 12) {
    return box(
      { fontSize: 72, fontWeight: 600, letterSpacing: -2, color: INK, alignItems: "flex-end" },
      [box({ fontSize: 40, marginBottom: 8, marginRight: 4, color: MUTED, fontWeight: 600 }, "$"), "48"]
    );
  }
  if (n === 13) {
    return box(
      {
        width: 420,
        height: 72,
        borderRadius: 999,
        background: "rgba(31,28,26,0.06)",
        alignItems: "center",
        paddingLeft: 8,
        paddingRight: 28,
        justifyContent: "space-between",
      },
      [
        box(
          {
            width: 56,
            height: 56,
            borderRadius: 999,
            background: SURFACE,
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 16px rgba(31,28,26,0.12)",
          },
          svg(22, 22, [
            {
              type: "polyline",
              props: {
                points: "8,4 16,11 8,18",
                fill: "none",
                stroke: a,
                strokeWidth: "2.4",
                strokeLinecap: "round",
                strokeLinejoin: "round",
              },
            },
          ])
        ),
        box({ color: MUTED, fontSize: 22, fontWeight: 500 }, "slide to unlock"),
      ]
    );
  }
  if (n === 14) {
    return box(
      {
        background: SURFACE,
        borderRadius: 999,
        padding: "16px 28px",
        fontSize: 24,
        fontWeight: 600,
        color: INK,
        boxShadow: hair(),
        alignItems: "center",
        gap: 12,
      },
      [
        svg(22, 22, [
          {
            type: "path",
            props: {
              d: "M9 12h8M13 8l4 4-4 4",
              fill: "none",
              stroke: a,
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            },
          },
          {
            type: "rect",
            props: { x: "3", y: "5", width: "10", height: "12", rx: "2", fill: "none", stroke: a, strokeWidth: "1.8" },
          },
        ]),
        "Copy link",
      ]
    );
  }
  if (n === 15) {
    const hs = [0.45, 0.7, 0.55, 1, 0.62, 0.38, 0.5];
    return box(
      { alignItems: "flex-end", gap: 14, height: 160 },
      hs.map((h, i) =>
        box({
          width: 28,
          height: Math.round(140 * h),
          borderRadius: 8,
          background: i === 3 ? a : "rgba(31,28,26,0.12)",
        })
      )
    );
  }
  if (n === 16) {
    return box(
      {
        width: 380,
        height: 96,
        background: SURFACE,
        borderRadius: 22,
        alignItems: "center",
        paddingLeft: 18,
        paddingRight: 22,
        gap: 16,
        boxShadow: hair(),
      },
      [
        box(
          {
            width: 56,
            height: 56,
            borderRadius: 16,
            background: STAGE,
            alignItems: "center",
            justifyContent: "center",
            color: MUTED,
            fontSize: 32,
            fontWeight: 500,
          },
          "+"
        ),
        box({ flexDirection: "column", gap: 6 }, [
          box({ fontSize: 22, fontWeight: 600, color: INK }, "Drop a file"),
          box({ fontSize: 18, fontWeight: 500, color: MUTED }, "or browse"),
        ]),
      ]
    );
  }
  if (n === 17) {
    return box(
      {
        background: SURFACE,
        borderRadius: "24px 24px 24px 8px",
        padding: "20px 24px",
        fontSize: 24,
        fontWeight: 500,
        color: INK,
        boxShadow: hair(),
        maxWidth: 480,
      },
      "okay yeah I can do Saturday"
    );
  }
  if (n === 18) {
    return box(
      {
        width: 300,
        background: SURFACE,
        borderRadius: 24,
        padding: "16px 20px 16px 16px",
        alignItems: "center",
        gap: 14,
        boxShadow: hair(),
      },
      [
        box(
          {
            width: 52,
            height: 52,
            borderRadius: 16,
            background: a,
            opacity: 1,
            alignItems: "center",
            justifyContent: "center",
          },
          svg(26, 26, [
            {
              type: "path",
              props: {
                d: "M13 4v2M8 8a7 7 0 1 1 10 0c0 4-3 5-3 8H11c0-3-3-4-3-8zM11 20h4",
                fill: "none",
                stroke: "#fff",
                strokeWidth: "1.8",
                strokeLinecap: "round",
              },
            },
          ])
        ),
        box({ flexDirection: "column", gap: 4 }, [
          box({ fontSize: 28, fontWeight: 600, letterSpacing: -0.6, color: INK }, "7:30"),
          box({ fontSize: 16, fontWeight: 500, color: MUTED }, "flick to snooze"),
        ]),
      ]
    );
  }
  if (n === 19) {
    return box(
      {
        width: 220,
        height: 220,
        background: SURFACE,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxShadow: hair(),
      },
      [
        box({ fontSize: 36, fontWeight: 600, letterSpacing: 4, color: INK }, "YES"),
        {
          type: "svg",
          props: {
            width: "220",
            height: "220",
            viewBox: "0 0 220 220",
            style: { position: "absolute", left: 0, top: 0 },
            children: [
              { type: "polygon", props: { points: "164,220 220,220 220,164", fill: STAGE } },
              { type: "polygon", props: { points: "164,164 220,164 164,220", fill: "#e8dcc6" } },
            ],
          },
        },
      ]
    );
  }
  const tile = () => box({
    width: 120,
    height: 120,
    borderRadius: 24,
    background: SURFACE,
    boxShadow: hair(),
  });
  return box({ flexDirection: "column", gap: 16 }, [
    box({ gap: 16 }, [tile(), tile()]),
    box({ gap: 16 }, [tile(), tile()]),
  ]);
}

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const n = parseInt(searchParams.get("day") || "", 10);
  const accent = ("#" + (searchParams.get("accent") || "2e6b5c").replace("#", "")).toLowerCase();
  const child = Number.isFinite(n) && n > 0 ? asset(n, accent) : asset(0, accent);

  return new ImageResponse(
    box(
      {
        width: "100%",
        height: "100%",
        background: PAPER,
        alignItems: "center",
        justifyContent: "center",
        padding: 48,
      },
      box(
        {
          width: 1104,
          height: 534,
          background: STAGE,
          borderRadius: 28,
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 0 1px rgba(31,28,26,0.06)",
        },
        child
      )
    ),
    { width: 1200, height: 630 }
  );
}
