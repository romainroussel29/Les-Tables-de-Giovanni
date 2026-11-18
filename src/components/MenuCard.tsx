import { Link } from "react-router-dom";
import type { Menu } from "../types";
import { euro } from "../utils";

export default function MenuCard({ menu }: { menu: Menu }) {
  return (
    <article className="menu-card">
      <Link to={`/menus/${menu.slug}`} className="menu-card__link">
        <div className="menu-card__media">
          <img src={menu.image} alt={menu.imageAlt} loading="lazy" />
        </div>
        <p className="menu-card__kind">
          {menu.category}
          {menu.diet !== "Classique" && <span>{menu.diet}</span>}
        </p>
        <h3 className="menu-card__title">{menu.name}</h3>
        <p className="menu-card__tagline">{menu.tagline}</p>
        <p className="menu-card__meta">
          <span>{euro(menu.pricePerPerson)} / pers.</span>
          <span className="menu-card__more">Voir le menu</span>
        </p>
      </Link>
    </article>
  );
}
