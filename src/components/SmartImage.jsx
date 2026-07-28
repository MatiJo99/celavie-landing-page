import { useState } from "react";

export default function SmartImage({
  src,
  alt = "",
  label,
  hint,
  className = "",
  imgClassName = "object-cover w-full h-full",
  rounded = "rounded-xl",
}) {
  const [missing, setMissing] = useState(!src);

  if (missing) {
    return (
      <div
        className={`${className} ${rounded} flex flex-col items-center justify-center gap-1 border-2 border-dashed border-brand-cream/25 bg-black/25 px-3 py-4 text-center`}
        role="img"
        aria-label={label || alt || "Image placeholder"}
      >
        <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-gold/90">
          {label || "Add image"}
        </span>
        {src && (
          <code className="max-w-full break-all text-[10px] leading-tight text-brand-cream/55">
            {src}
          </code>
        )}
        {hint && <span className="text-[10px] text-brand-cream/40">{hint}</span>}
      </div>
    );
  }

  return (
    <div className={`${className} ${rounded} overflow-hidden bg-black/30`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setMissing(true)}
        className={imgClassName}
      />
    </div>
  );
}
