"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

/**
 * Lightbox sertifikat ringan (tanpa library). Menampilkan satu atau beberapa
 * foto; kalau lebih dari satu, muncul tombol prev/next + indikator.
 * Tutup via tombol X, klik latar, atau tombol Escape.
 */
export default function CertificateViewer({
  images,
  title,
  onClose,
}: {
  images: string[];
  title: string;
  onClose: () => void;
}) {
  const [i, setI] = useState(0);
  const many = images.length > 1;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((v) => Math.min(v + 1, images.length - 1));
      if (e.key === "ArrowLeft") setI((v) => Math.max(v - 1, 0));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [images.length, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Sertifikat — ${title}`}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07040d]/85 p-4 backdrop-blur-sm sm:p-8"
    >
      {/* header */}
      <div
        className="mb-3 flex w-full max-w-4xl items-center justify-between gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mono truncate text-xs uppercase tracking-wide text-glow-soft">
          {title}
        </p>
        <button
          aria-label="Close"
          onClick={onClose}
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-glow/60 hover:text-glow-soft"
        >
          ✕
        </button>
      </div>

      {/* gambar */}
      <div
        className="relative flex max-h-[78vh] w-full max-w-4xl items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[i]}
          alt={`${title} — sertifikat ${i + 1}`}
          className="max-h-[78vh] w-auto rounded-xl border border-glow/25 shadow-2xl"
        />

        {many && (
          <>
            <button
              aria-label="Previous"
              onClick={() => setI((v) => Math.max(v - 1, 0))}
              disabled={i === 0}
              className="absolute left-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition-colors hover:border-glow/60 disabled:opacity-30"
            >
              ‹
            </button>
            <button
              aria-label="Next"
              onClick={() => setI((v) => Math.min(v + 1, images.length - 1))}
              disabled={i === images.length - 1}
              className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition-colors hover:border-glow/60 disabled:opacity-30"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* indikator */}
      {many && (
        <div
          className="mt-4 flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Sertifikat ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === i ? "w-6 bg-glow" : "w-2 bg-white/25"
              }`}
            />
          ))}
          <span className="mono ml-2 text-xs text-slate-400">
            {i + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
}
