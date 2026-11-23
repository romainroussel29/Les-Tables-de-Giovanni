import { useState } from 'react';
import { Link, useParams } from 'react-router';
import Icon from '@/components/Icon';
import MenuCard from '@/components/MenuCard';
import Picture from '@/components/Picture';
import { MENUS, getMenu } from '@/data/menus';
import { SITE } from '@/data/site';
import { euro } from '@/modules/format';
import { menuImageKey } from '@/modules/images';
import NotFoundPage from './NotFoundPage';

export default function MenuDetailPage() {
  const { slug } = useParams();
  const menu = getMenu(slug);
  const [guests, setGuests] = useState(menu?.minGuests ?? 10);

  // Nouveau menu affiché : on repart de son minimum d'invités (ajusté pendant le rendu, sans effet)
  const [shownSlug, setShownSlug] = useState(slug);
  if (shownSlug !== slug) {
    setShownSlug(slug);
    setGuests(menu?.minGuests ?? 10);
  }

  if (!menu) return <NotFoundPage />;

  const count = Math.max(guests || 0, menu.minGuests);
  const others = MENUS.filter(
    (m) => m.slug !== menu.slug && (m.category === menu.category || m.diet === menu.diet),
  ).slice(0, 3);

  const sections = [
    { title: 'Entrées', items: menu.courses.entrees },
    { title: 'Plats', items: menu.courses.plats },
    { title: 'Desserts', items: menu.courses.desserts },
  ];

  return (
    <>
      <section className="detail-hero">
        <Picture
          key={menu.slug}
          className="detail-hero__bg"
          imageKey={menuImageKey(menu.slug)}
          alt={menu.imageAlt}
          sizes="100vw"
          priority
        />
        <div className="detail-hero__veil" />
        <div className="container detail-hero__content">
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <ol>
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="/menus/">Nos menus</Link>
              </li>
              <li aria-current="page">{menu.name}</li>
            </ol>
          </nav>
          <h1 className="detail-hero__title">{menu.name}</h1>
          <p className="detail-hero__tagline">{menu.tagline}</p>
          <ul className="tags">
            <li className="tag">{menu.category}</li>
            <li className="tag">{menu.diet}</li>
          </ul>
        </div>
      </section>

      <section className="section section--marmo">
        <div className="container detail">
          <div className="detail__main">
            <p className="detail__desc">{menu.description}</p>

            <div className="carte">
              <h2 className="carte__title">La carte</h2>
              <p className="carte__hint">Un choix par service, à préciser lors de votre commande</p>
              {sections.map((s) => (
                <div key={s.title} className="carte__section">
                  <h3>{s.title}</h3>
                  <ul>
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="infos">
              <div className="info">
                <h3>Allergènes</h3>
                <ul className="tags">
                  {menu.allergens.map((a) => (
                    <li key={a} className="tag tag--warn">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="info">
                <h3>Bon à savoir</h3>
                <p>
                  Livraison sur {SITE.zone}. Plats livrés en contenants isothermes, à conserver entre 0 et 4 °C et à
                  consommer dans les 24 h. Vaisselle et service en salle disponibles sur demande.
                </p>
              </div>
            </div>
          </div>

          <aside className="booking" aria-label="Estimer et réserver">
            <p className="booking__price">
              {euro(menu.pricePerPerson)} <small>/ personne</small>
            </p>
            <ul className="booking__facts">
              <li>
                <Icon name="invites" size="sm" /> À partir de {menu.minGuests} personnes
              </li>
              <li>
                <Icon name="horloge" size="sm" /> Commande {menu.orderDelay} jours à l'avance minimum
              </li>
            </ul>

            <label htmlFor="invites" className="booking__label">
              Nombre d'invités
            </label>
            <div className="stepper">
              <button
                type="button"
                onClick={() => setGuests(Math.max(menu.minGuests, count - 1))}
                aria-label="Retirer un invité"
              >
                −
              </button>
              <input
                id="invites"
                type="number"
                min={menu.minGuests}
                inputMode="numeric"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                onBlur={() => setGuests(count)}
              />
              <button type="button" onClick={() => setGuests(count + 1)} aria-label="Ajouter un invité">
                +
              </button>
            </div>

            <div className="booking__total">
              <span>Estimation</span>
              <strong aria-live="polite">{euro(count * menu.pricePerPerson)}</strong>
            </div>
            <p className="booking__note">Tarif indicatif TTC, hors livraison et service.</p>

            <Link to={`/contact/?menu=${menu.slug}&invites=${count}`} className="btn btn--primary btn--block">
              Demander un devis
            </Link>
            <a href={SITE.phoneHref} className="btn btn--outline btn--block">
              <Icon name="telephone" size="sm" /> {SITE.phone}
            </a>
          </aside>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <div className="section__head">
              <h2 className="section__title">Dans le même esprit</h2>
            </div>
            <ul className="menu-grid">
              {others.map((m) => (
                <MenuCard key={m.slug} menu={m} />
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
