import { Link } from "react-router-dom";
import type { Menu } from "../types";
import { euro } from "../utils";
import { ArrowIcon, UsersIcon } from "./Icons";

export default function MenuCard({ menu }: { menu: Menu }) {
  return (
    <article className="menu-card">
      <Link to={`/menus/${menu.slug}`} className="menu-card__link" aria-label={`Voir le menu ${menu.name}`}>
        <div className="menu-card__media">
          <img src={menu.image} alt={menu.imageAlt} loading="lazy" />
          <span className="menu-card__category">{menu.category}</span>
          {menu.diet !== "Classique" && <span className="menu-card__diet">{menu.diet}</span>}
        </div>
        <div className="menu-card__body">
          <h3 className="menu-card__title">{menu.name}</h3>
          <p className="menu-card__tagline">{menu.tagline}</p>
          <div className="menu-card__meta">
            <span className="menu-card__price">
              {euro(menu.pricePerPerson)} <small>/ pers.</small>
            </span>
            <span className="menu-card__guests">
              <UsersIcon size={15} /> dès {menu.minGuests} pers.
            </span>
          </div>
          <span className="menu-card__more">
            Découvrir <ArrowIcon size={16} />
          </span>
        </div>
      </Link>
    </article>
  );
}
