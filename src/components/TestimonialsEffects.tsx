"use client";

import { useEffect } from "react";

export function TestimonialsEffects() {
  useEffect(() => {
    const wrapper = document.querySelector<HTMLElement>(".testimonials-carousel-wrapper");
    if (!wrapper) return;

    let interactionTimer: number | undefined;
    let lastInteraction = 0;

    const pauseAnimation = () => {
      wrapper.classList.add("user-interacting");
      lastInteraction = Date.now();
      if (interactionTimer) window.clearTimeout(interactionTimer);
      interactionTimer = window.setTimeout(() => {
        if (Date.now() - lastInteraction >= 2000) {
          wrapper.classList.remove("user-interacting");
        }
      }, 2000);
    };

    const events: Array<keyof HTMLElementEventMap> = ["scroll", "touchstart", "touchmove", "wheel", "mousedown", "mousemove"];
    events.forEach((eventName) => wrapper.addEventListener(eventName, pauseAnimation, { passive: true }));

    return () => {
      events.forEach((eventName) => wrapper.removeEventListener(eventName, pauseAnimation));
      if (interactionTimer) window.clearTimeout(interactionTimer);
    };
  }, []);

  return null;
}
