import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxImage({ src, alt, className = "", imgClassName = "", testId, width, height }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} data-testid={testId} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ y }}
        loading="lazy"
        decoding="async"
        className={`h-full w-full scale-[1.18] object-cover ${imgClassName}`}
      />
    </div>
  );
}
