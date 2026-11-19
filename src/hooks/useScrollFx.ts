import { useEffect } from "react";

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Effets liés au défilement : chaque élément `data-scroll` reçoit
 * une variable CSS `--p` (0 → 1) selon sa position à l'écran.
 *  - "sticky" / "x" : progression dans une section collante (x : défilement horizontal, mesure `--dist`)
 *  - "read"         : progression de lecture d'un paragraphe
 *  - par défaut     : traversée de l'écran (parallaxe)
 * Les éléments `data-magnetic` suivent légèrement la souris.
 * Rien n'est animé si l'utilisateur préfère réduire les animations.
 */
export function useScrollFx(key: string) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let els: HTMLElement[] = [];
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        let p: number;
        switch (el.dataset.scroll) {
          case "sticky":
          case "x":
            p = -r.top / Math.max(1, r.height - vh);
            break;
          case "read":
            p = (vh * 0.85 - r.top) / (r.height + vh * 0.25);
            break;
          default:
            p = (vh - r.top) / (vh + r.height);
        }
        el.style.setProperty("--p", clamp(p).toFixed(4));
      }
    };

    const measure = () => {
      els = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll]"));
      for (const el of els) {
        if (el.dataset.scroll !== "x") continue;
        const track = el.querySelector<HTMLElement>("[data-track]");
        if (track) el.style.setProperty("--dist", `${Math.max(0, track.scrollWidth - window.innerWidth)}px`);
      }
      update();
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    // Boutons aimantés (souris uniquement)
    let magnet: HTMLElement | null = null;
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const t = (e.target as Element | null)?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (magnet && magnet !== t) magnet.style.transform = "";
      magnet = t;
      if (!t) return;
      const r = t.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      t.style.transform = `translate(${dx * 0.22}px, ${dy * 0.32}px)`;
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    document.addEventListener("pointermove", onPointer);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      document.removeEventListener("pointermove", onPointer);
      if (magnet) magnet.style.transform = "";
    };
  }, [key]);
}
