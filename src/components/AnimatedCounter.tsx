"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  target: number;
  suffix?: string;
  duration?: number;
};

function formatValue(value: number, suffix: string) {
  const floorValue = Math.floor(value);
  if (floorValue >= 1000) {
    return `${floorValue.toLocaleString("pt-BR")}${suffix}`;
  }
  return `${floorValue}${suffix}`;
}

export function AnimatedCounter({ target, suffix = "", duration = 2000 }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(() => formatValue(target, suffix));
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasAnimated.current) return;

        hasAnimated.current = true;
        let frame = 0;
        const totalFrames = Math.max(1, Math.round(duration / 16));

        const timer = window.setInterval(() => {
          frame += 1;
          const progress = Math.min(frame / totalFrames, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(formatValue(target * eased, suffix));

          if (progress >= 1) {
            window.clearInterval(timer);
            setDisplay(formatValue(target, suffix));
          }
        }, 16);
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [duration, suffix, target]);

  return (
    <div ref={ref} className="stat-number" data-target={target} data-suffix={suffix}>
      {display}
    </div>
  );
}
