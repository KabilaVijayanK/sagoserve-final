"use client";

import { useRef, useEffect, useState } from "react";

// ── Row 1 images (replace with your own paths) ─────────────────────────────
const ROW1_BASE = [
 "/gallery/g1.jpg",
  "/gallery/g2.jpg",
  "/gallery/g3.jpg",
  "/gallery/g4.jpg",
  "/gallery/g5.jpg", 
  "/gallery/g6.jpg",
];

// ── Row 2 images (replace with your own paths) ─────────────────────────────
const ROW2_BASE = [
  "/gallery/g7.jpg", 
  "/gallery/g8.jpg",
  "/gallery/g9.jpg",
  "/gallery/g10.jpg", 
  "/gallery/g11.jpg",   
   "/gallery/g12.jpg"
];
// ───────────────────────────────────────────────────────────────────────────

// Even index = small card, Odd index = big card
const SMALL = { w: 210, h: 155 };
const BIG   = { w: 400, h: 265 };
const GAP   = 16;

function dims(i: number) {
  return i % 2 === 0 ? SMALL : BIG;
}

// Total pixel width of one full set
const ONE_SET_W1 = ROW1_BASE.reduce((acc, _, i) => acc + dims(i).w + GAP, 0);
const ONE_SET_W2 = ROW2_BASE.reduce((acc, _, i) => acc + dims(i + 1).w + GAP, 0);

// Repeat enough copies so the strip is always full — no empty edges
const COPIES = 10;
const ROW1_IMAGES = Array.from({ length: COPIES }, () => ROW1_BASE).flat();
const ROW2_IMAGES = Array.from({ length: COPIES }, () => ROW2_BASE).flat();

export default function GallerySection() {
  const pos1        = useRef(0);   // row 1 scroll position
  const pos2        = useRef(0);   // row 2 scroll position
  const vel1        = useRef(0);   // row 1 velocity
  const vel2        = useRef(0);   // row 2 velocity
  const lastScrollY = useRef(0);
  const rafRef      = useRef<number>(0);

  const [row1X, setRow1X] = useState(0);
  const [row2X, setRow2X] = useState(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta    = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      // Scroll down (delta > 0):
      //   row1 → moves LEFT  (pos1 increases, translateX = -pos1)
      //   row2 → moves RIGHT (pos2 decreases, translateX = +pos2)
      vel1.current += delta * 0.4;
      vel2.current += delta * 0.4;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const loop = () => {
      pos1.current += vel1.current;
      pos2.current += vel2.current;

      // Momentum decay
      vel1.current *= 0.105;
      vel2.current *= 0.105;
      if (Math.abs(vel1.current) < 0.02) vel1.current = 0;
      if (Math.abs(vel2.current) < 0.02) vel2.current = 0;

      // Infinite wrap — keeps numbers small, eliminates gaps
      pos1.current = ((pos1.current % ONE_SET_W1) + ONE_SET_W1) % ONE_SET_W1;
      pos2.current = ((pos2.current % ONE_SET_W2) + ONE_SET_W2) % ONE_SET_W2;

      // Row 1: scroll down → left  → translateX negative
      // Row 2: scroll down → right → translateX positive
      setRow1X(-pos1.current);
      setRow2X(pos2.current);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#f4f4f4] py-14">

      {/* Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center z-0"
      >
        <span
          style={{
            fontSize:      "clamp(90px, 19vw, 250px)",
            fontWeight:    900,
            fontFamily:    "'Georgia', serif",
            color:         "rgba(195,195,195,0.38)",
            letterSpacing: "-0.03em",
            lineHeight:    1,
            whiteSpace:    "nowrap",
          }}
        >
          gallery
        </span>
      </div>

      {/* Rows */}
      <div className="relative z-10 flex flex-col gap-5">

        {/* Row 1 — scroll down = LEFT, scroll up = RIGHT */}
        <ScrollRow
          images={ROW1_IMAGES}
          translateX={row1X}
          startOffset={0}
        />

        {/* Row 2 — scroll down = RIGHT, scroll up = LEFT */}
        <ScrollRow
          images={ROW2_IMAGES}
          translateX={row2X - ONE_SET_W2 * 2}
          startOffset={1}
        />

      </div>
    </section>
  );
}

function ScrollRow({
  images,
  translateX,
  startOffset,
}: {
  images:      string[];
  translateX:  number;
  startOffset: number;
}) {
  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex items-center will-change-transform"
        style={{
          gap:       `${GAP}px`,
          transform: `translateX(${translateX}px)`,
        }}
      >
        {images.map((src, i) => {
          const { w, h } = dims(i + startOffset);
          return <Card key={i} src={src} w={w} h={h} />;
        })}
      </div>
    </div>
  );
}

function Card({ src, w, h }: { src: string; w: number; h: number }) {
  return (
    <div
      className="relative flex-shrink-0 rounded-2xl overflow-hidden shadow-md group cursor-pointer"
      style={{ width: w, height: h, background: "#d8d8d8" }}
    >
      <img
        src={src}
        alt="Gallery"
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        loading="lazy"
        draggable={false}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.08] transition-colors duration-300 rounded-2xl" />
    </div>
  );
}