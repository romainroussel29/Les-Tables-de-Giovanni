import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MENUS, getMenu } from "../data/menus";
import { SITE } from "../data/site";
import { euro } from "../utils";
import MenuCard from "../components/MenuCard";
import NotFound from "./NotFound";
import { ClockIcon, PhoneIcon, UsersIcon } from "../components/Icons";

export default function MenuDetail() {
  const { slug } = useParams();
  const menu = getMenu(slug);
  const [guests, setGuests] = useState(menu?.minGuests ?? 10);

  // Nouveau menu affiché : on repart de son minimum d'invités
  useEffect(() => {
    setGuests(menu?.minGuests ?? 10);
  }, [menu]);

  if (!menu) return <NotFound />;

  const count = Math.max(guests || 0, menu.minGuests);
  const others = MENUS.filter((m) => m.slug !== menu.slug && (m.category === menu.category || m.diet === menu.diet)).slice(0, 3);

  const sections = [
    { title: "Entrées", items: menu.courses.entrees },
    { title: "Plats", items: menu.courses.plats },
    { title: "Desserts", items: menu.courses.desserts },
  ];

  return (
    <>
      <section className="detail-hero">
        <img className="detail-hero__bg" src={menu.image} alt="" />
        <div className="detail-hero__overlay" />
        <div className="container detail-hero__content">
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link to="/">Accueil</Link> / <Link to="/menus">Menus</Link> / <span>{menu.name}</span>
          </nav>
          <p className="eyebrow eyebrow--light">
            {menu.category} · {menu.diet}
          </p>
          <h1 className="detail-hero__title">{menu.name}</h1>
          <p className="detail-hero__tagline">{menu.tagline}</p>
        </div>
      </section>

      <section className="section">
        <div className="container detail">
          <div className="detail__main">
            <p className="detail__desc">{menu.description}</p>

            <div className="carte">
              <p className="carte__ornament" aria-hidden="true">✦</p>
              <h2 className="carte__title">La carte</h2>
              <p className="carte__hint">Un choix par service, à préciser lors de votre commande</p>
              {sections.map((s) => (
                <div key={s.title} className="carte__section">
                  <h3>{s.title}</h3>
                  <ul>
                    {s.items.map((i) => (
                      <li key={i}>{i}</li>
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
                    <li key={a} className="tag tag--warn">{a}</li>
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
              <li><UsersIcon size={16} /> À partir de {menu.minGuests} personnes</li>
              <li><ClockIcon size={16} /> Commande {menu.orderDelay} jours à l'avance minimum</li>
            </ul>

            <label htmlFor="guests" className="booking__label">Nombre d'invités</label>
            <div className="stepper">
              <button type="button" onClick={() => setGuests(Math.max(menu.minGuests, count - 1))} aria-label="Retirer un invité">−</button>
              <input
                id="guests"
                type="number"
                min={menu.minGuests}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                onBlur={() => setGuests(count)}
              />
              <button type="button" onClick={() => setGuests(count + 1)} aria-label="Ajouter un invité">+</button>
            </div>

            <div className="booking__total">
              <span>Estimation</span>
              <strong>{euro(count * menu.pricePerPerson)}</strong>
            </div>
            <p className="booking__note">Tarif indicatif TTC, hors livraison et service.</p>

            <Link to={`/contact?menu=${menu.slug}&invites=${count}`} className="btn btn--primary btn--block">
              Demander un devis
            </Link>
            <a href={SITE.phoneHref} className="btn btn--outline btn--block">
              <PhoneIcon size={16} /> {SITE.phone}
            </a>
          </aside>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section section--tinted">
          <div className="container">
            <div className="section__head">
              <p className="eyebrow">Vous aimerez aussi</p>
              <h2 className="section__title">D'autres tables à découvrir</h2>
            </div>
            <div className="menu-grid">
              {others.map((m) => (
                <MenuCard key={m.slug} menu={m} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
