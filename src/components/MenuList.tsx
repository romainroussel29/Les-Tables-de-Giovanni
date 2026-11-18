import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { Menu } from "../types";
import { euro } from "../utils";

/**
 * La carte en liste : au survol d'une ligne, la photo du plat
 * suit le curseur, comme un objet qu'on présente (ordinateur uniquement).
 */
export default function MenuList({ menus }: { menus: Menu[] }) {
  const [active, setActive] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.14;
      pos.current.y += (target.current.y - pos.current.y) * 0.14;
      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="mlist"
      onMouseMove={(e) => {
        target.current = { x: e.clientX, y: e.clientY };
      }}
      onMouseLeave={() => setActive(null)}
    >
      <ul className="mlist__rows">
        {menus.map((m, i) => (
          <li key={m.slug} data-reveal>
            <Link
              to={`/menus/${m.slug}`}
              className={`mlist__row${active === i ? " is-active" : ""}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="mlist__index">{String(i + 1).padStart(2, "0")}</span>
              <img className="mlist__thumb" src={m.image} alt="" loading="lazy" />
              <span className="mlist__name">{m.name}</span>
              <span className="mlist__kind">{m.category}</span>
              <span className="mlist__price">{euro(m.pricePerPerson)}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className={`mlist__preview${active !== null ? " is-shown" : ""}`} ref={previewRef} aria-hidden="true">
        <div className="mlist__frame">
          {menus.map((m, i) => (
            <img key={m.slug} src={m.image} alt="" className={i === active ? "is-active" : undefined} loading="lazy" />
          ))}
        </div>
      </div>
    </div>
  );
}
