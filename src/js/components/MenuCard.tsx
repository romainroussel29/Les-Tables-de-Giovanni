import { Link } from 'react-router';
import type { Menu } from '@/types/menu';
import { euro } from '@/modules/format';
import { menuImageKey } from '@/modules/images';
import Picture from './Picture';

export const CARD_SIZES = '(min-width: 1100px) 360px, (min-width: 700px) 45vw, 100vw';

/** Carte d'un menu, dans une liste <ul className="menu-grid"> */
export default function MenuCard({ menu }: { menu: Menu }) {
  return (
    <li className="menu-card" data-reveal>
      <Link to={`/menus/${menu.slug}/`} className="menu-card__link">
        <div className="menu-card__media">
          <Picture imageKey={menuImageKey(menu.slug)} alt={menu.imageAlt} sizes={CARD_SIZES} />
        </div>
        <p className="menu-card__kind">
          {menu.category}
          {menu.diet !== 'Classique' && <span>{menu.diet}</span>}
        </p>
        <h3 className="menu-card__title">{menu.name}</h3>
        <p className="menu-card__tagline">{menu.tagline}</p>
        <p className="menu-card__meta">
          <span>{euro(menu.pricePerPerson)} / pers.</span>
          <span className="menu-card__more">Voir le menu</span>
        </p>
      </Link>
    </li>
  );
}
