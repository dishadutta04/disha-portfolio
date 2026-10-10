"use client";

import Image from "next/image";
import { useState } from "react";
import type { Shot } from "@/lib/data";
import { Icon } from "./Symbols";

export function Gallery({ shots, title }: { shots: Shot[]; title: string }) {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((v) => (v + d + shots.length) % shots.length);
  const shot = shots[i];

  return (
    <div className="gallery">
      <figure className="mac-frame">
        <div className="mac-frame-bar">
          <span />
          <span />
          <span />
          <p>{title}</p>
        </div>
        <div
          className="gallery-stage"
          tabIndex={0}
          aria-label={`Screenshot ${i + 1} of ${shots.length}`}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
        >
          <Image key={shot.src} src={shot.src} alt={shot.caption} width={1440} height={900} sizes="(max-width: 900px) 100vw, 900px" priority={i === 0} />
          {shots.length > 1 && (
            <>
              <button type="button" className="gallery-arrow gallery-prev" onClick={() => go(-1)} aria-label="Previous screenshot">
                <Icon name="chevronLeft" size={18} strokeWidth={2.2} />
              </button>
              <button type="button" className="gallery-arrow gallery-next" onClick={() => go(1)} aria-label="Next screenshot">
                <Icon name="chevronRight" size={18} strokeWidth={2.2} />
              </button>
            </>
          )}
        </div>
        <figcaption>
          <span className="gallery-count">
            {i + 1} / {shots.length}
          </span>
          {shot.caption}
        </figcaption>
      </figure>
      {shots.length > 1 && (
        <ul className="gallery-thumbs">
          {shots.map((s, n) => (
            <li key={s.src}>
              <button type="button" onClick={() => setI(n)} className={n === i ? "is-on" : ""} aria-label={s.caption} aria-current={n === i}>
                <Image src={s.src} alt="" width={240} height={150} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
