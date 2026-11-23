import { useEffect } from 'react';

/**
 * Animations au défilement, relancées à chaque changement de page :
 *  - `data-reveal` : l'élément reçoit `.is-in` quand il entre à l'écran
 *    (les cartes ajoutées plus tard, ex. après un filtre, sont aussi prises en compte) ;
 *  - `data-parallax="0.08"` : léger décalage vertical proportionnel au défilement.
 * La classe `.motion` est posée sur <html> dans le <head> (avant l'affichage, sans clignotement),
 * sauf si le visiteur préfère réduire les animations.
 */
export function useMotion(key: string) {
  useEffect(() => {
    const root = document.documentElement;
    const main = document.getElementById('contenu');
    if (!main) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      root.classList.remove('motion');
      return;
    }
    root.classList.add('motion');

    // --- Apparitions ---
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
    );
    const scan = () => main.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(main, { childList: true, subtree: true });

    // --- Parallaxe ---
    let raf = 0;
    const parallax = () => {
      raf = 0;
      const vh = window.innerHeight;
      main.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const speed = Number(el.dataset.parallax) || 0.08;
        const offset = (r.top + r.height / 2 - vh / 2) * -speed;
        el.style.translate = `0 ${offset.toFixed(1)}px`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(parallax);
    };
    parallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [key]);
}
