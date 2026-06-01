"use client";

import { useEffect } from "react";

export function ScrollAnimations() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            const delay = Number(target.dataset.animationDelay || 0);
            window.setTimeout(() => {
              target.classList.add("visible");
              window.setTimeout(() => {
                target.style.willChange = "auto";
              }, 1200);
            }, delay);
          } else {
            target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    const isMobile = window.innerWidth <= 768;

    const heroContent = document.querySelector<HTMLElement>(".hero-content");
    const heroImage = document.querySelector<HTMLElement>(".hero-image");

    if (heroContent && !isMobile) {
      heroContent.classList.add("fade-in");
      heroContent.dataset.animationDelay = "0";
      observer.observe(heroContent);
    }

    if (heroImage) {
      heroImage.classList.add("fade-in");
      heroImage.dataset.animationDelay = "150";
      observer.observe(heroImage);
    }

    document.querySelectorAll<HTMLElement>(".stat-item").forEach((item, index) => {
      item.classList.add("fade-in");
      item.dataset.animationDelay = String(index * 120);
      observer.observe(item);
    });

    document.querySelectorAll<HTMLElement>(".stat-number").forEach((item, index) => {
      item.classList.add("number-pop");
      item.dataset.animationDelay = String(index * 120 + 300);
      observer.observe(item);
    });

    document.querySelectorAll<HTMLElement>(".section-title").forEach((title) => {
      title.classList.add("fade-up-rotate");
      title.dataset.animationDelay = "0";
      observer.observe(title);
    });

    document.querySelectorAll<HTMLElement>(".section-subtitle").forEach((subtitle) => {
      subtitle.classList.add("fade-in");
      subtitle.dataset.animationDelay = "200";
      observer.observe(subtitle);
    });

    document.querySelectorAll<HTMLElement>(".feature-card").forEach((card, index) => {
      card.classList.add(index % 2 === 0 ? "slide-left" : "slide-right");
      card.dataset.animationDelay = String(index * 100);
      observer.observe(card);
    });

    document.querySelectorAll<HTMLElement>(".step-item").forEach((step, index) => {
      step.classList.add("slide-left");
      step.dataset.animationDelay = String(index * 150);
      observer.observe(step);
    });

    document.querySelectorAll<HTMLElement>(".benefit-item").forEach((item, index) => {
      item.classList.add("fade-in");
      item.dataset.animationDelay = String(index * 80);
      observer.observe(item);
    });

    const ctaTitle = document.querySelector<HTMLElement>(".cta h2");
    const ctaText = document.querySelector<HTMLElement>(".cta p");
    const ctaButton = document.querySelector<HTMLElement>(".cta .btn-primary");

    if (ctaTitle) {
      ctaTitle.classList.add("fade-up-rotate");
      ctaTitle.dataset.animationDelay = "0";
      observer.observe(ctaTitle);
    }
    if (ctaText) {
      ctaText.classList.add("fade-in");
      ctaText.dataset.animationDelay = "200";
      observer.observe(ctaText);
    }
    if (ctaButton) {
      ctaButton.classList.add("scale-in");
      ctaButton.dataset.animationDelay = "400";
      observer.observe(ctaButton);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
