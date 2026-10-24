"use client";

import Image from "next/image";
import { useState } from "react";
import { achievements, certificates } from "@/content/achievements";
import { useOS } from "@/components/OSProvider";

// certificates.exe: rubens.design's gallery.exe — thumbnail sidebar,
// prev/next, fit/fill, zoom and rotate.
export default function GalleryApp() {
  const { galleryIndex, setGalleryIndex } = useOS();
  const [fill, setFill] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rot, setRot] = useState(0);
  const n = certificates.length;
  const cur = certificates[galleryIndex] ?? certificates[0];
  const award = achievements[cur.award];

  const go = (d: number) => {
    setGalleryIndex((galleryIndex + d + n) % n);
    setZoom(1);
    setRot(0);
  };

  return (
    <div className="app app--gallery">
      <div className="toolbar" role="toolbar" aria-label="Viewer">
        <div className="toolbar__group">
          <button type="button" className="toolbar__btn" onClick={() => go(-1)} title="Previous">
            ◀
          </button>
          <button type="button" className="toolbar__btn" onClick={() => go(1)} title="Next">
            ▶
          </button>
        </div>
        <span className="toolbar__sep" />
        <div className="toolbar__group">
          <button type="button" className="toolbar__btn" aria-pressed={!fill} onClick={() => setFill(false)}>
            Fit
          </button>
          <button type="button" className="toolbar__btn" aria-pressed={fill} onClick={() => setFill(true)}>
            Fill
          </button>
        </div>
        <span className="toolbar__sep" />
        <div className="toolbar__group">
          <button type="button" className="toolbar__btn" onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))} title="Zoom out">
            −
          </button>
          <span className="toolbar__label">{Math.round(zoom * 100)}%</span>
          <button type="button" className="toolbar__btn" onClick={() => setZoom((z) => Math.min(3, z + 0.25))} title="Zoom in">
            +
          </button>
          <button type="button" className="toolbar__btn" onClick={() => setRot((r) => r + 90)} title="Rotate">
            ↻
          </button>
        </div>
      </div>
      <div className="gallery">
        <ul className="gallery__side">
          {certificates.map((c, i) => (
            <li key={c.src}>
              <button
                type="button"
                className="gallery__thumb"
                aria-current={i === galleryIndex || undefined}
                onClick={() => {
                  setGalleryIndex(i);
                  setZoom(1);
                  setRot(0);
                }}
              >
                <Image src={c.src} alt="" width={64} height={46} />
                <span>{c.label}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="gallery__view">
          <Image
            key={cur.src}
            src={cur.src}
            alt={`Certificate: ${award.title}`}
            fill
            sizes="(min-width: 960px) 560px, 100vw"
            style={{
              objectFit: fill ? "cover" : "contain",
              transform: `scale(${zoom}) rotate(${rot}deg)`,
            }}
          />
        </div>
      </div>
      <footer className="statusbar">
        <span>
          {award.rank} · {award.date}
        </span>
        <span>
          {galleryIndex + 1} / {n}
        </span>
      </footer>
    </div>
  );
}
