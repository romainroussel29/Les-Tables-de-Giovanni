import { Link } from 'react-router';
import { CARD_SIZES } from '@/components/MenuCard';
import Picture from '@/components/Picture';
import { Facts, FinalCta, Steps, delay, type Step } from '@/components/Sections';
import { MENUS, TESTIMONIALS } from '@/data/menus';
import { SITE } from '@/data/site';
import { euro } from '@/modules/format';
import { menuImageKey } from '@/modules/images';
import { HERO_SIZES } from '@/routes';

const STEPS: Step[] = [
  {
    numeral: 'I',
    title: 'Vous nous appelez',
    text: "On parle de la date, du lieu, du nombre d'invités et de vos envies.",
  },
  {
    numeral: 'II',
    title: 'Nous composons',
    text: 'Sous 48 h, un devis ajusté à votre budget, aux allergies et aux régimes de chacun.',
  },
  {
    numeral: 'III',
    title: 'Nous servons',
    text: 'Le jour venu, nous livrons, dressons la table et, selon la formule, assurons le service.',
  },
];

/** Un plat signature par menu, pour le bandeau défilant */
const DISHES = MENUS.map((m) => m.courses.plats[0]);

export default function HomePage() {
  return (
    <>
      {/* ---------- Ouverture ---------- */}
      <section className="hero">
        <div className="hero__panel">
          <h1 className="hero__title">
            <span className="mask">
              <span style={delay(1)}>Les Tables</span>
            </span>
            <span className="mask">
              <span style={delay(2)}>de Giovanni</span>
            </span>
            <span className="visually-hidden">, traiteur italien à Arles</span>
          </h1>
          <span className="hero__rule" aria-hidden="true" />
          <p className="hero__lead">
            Traiteur italien à Arles depuis {SITE.founded}. La cuisine de famille des Pouilles pour vos mariages,
            réceptions et repas d'entreprise, de 4 à 200 invités.
          </p>
          <div className="actions hero__actions">
            <Link to="/contact/" className="btn btn--light">
              Demander un devis
            </Link>
            <Link to="/menus/" className="btn btn--outline-light">
              Découvrir les menus
            </Link>
          </div>
        </div>
        <figure className="hero__media">
          <Picture
            imageKey="table-italienne-spaghetti-palourdes"
            alt="Table italienne vue du dessus : spaghetti aux palourdes, spritz et vin blanc"
            sizes={HERO_SIZES}
            priority
            data-parallax="0.12"
          />
        </figure>
      </section>

      {/* ---------- Giovanni ---------- */}
      <section className="section" id="histoire">
        <div className="container recit">
          <figure className="recit__media" data-reveal="image">
            <Picture
              imageKey="giovanni-risotto-crevettes"
              alt="Giovanni présente un risotto aux crevettes"
              sizes="(min-width: 861px) 45vw, 100vw"
              data-parallax="0.06"
            />
          </figure>
          <div className="recit__body">
            <h2 className="h2" data-reveal>
              Une cuisine de famille, servie avec soin.
            </h2>
            <p className="lead" data-reveal style={delay(1)}>
              Giovanni a grandi à Bari, dans une famille où l'on cuisinait pour vingt. Arrivé à Arles en {SITE.founded}{' '}
              avec les carnets de sa grand-mère, il cuisine pour vos tables comme pour la sienne.
            </p>
            <p data-reveal style={delay(2)}>
              Les pâtes sont roulées le matin même, la focaccia sort du four avant le départ, les sauces mijotent depuis
              l'aube. Les légumes viennent du marché d'Arles, l'huile d'olive des Alpilles.
            </p>
            <Facts revealDelay={3} />
            <p data-reveal style={delay(4)}>
              <Link to="/a-propos/" className="link">
                Lire l'histoire de la maison
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Bandeau de plats ---------- */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...DISHES, ...DISHES].map((dish, i) => (
            <span key={i} className="marquee__item">
              {dish}
            </span>
          ))}
        </div>
      </div>

      {/* ---------- La carte ---------- */}
      <section className="section section--alt" id="carte" aria-labelledby="carte-title">
        <div className="container">
          <header className="section__head section__head--center">
            <h2 id="carte-title" className="h2" data-reveal>
              La carte
            </h2>
            <p className="lead" data-reveal style={delay(1)}>
              {MENUS.length} menus, du plateau-repas au dîner de gala. Tous s'adaptent à vos invités.
            </p>
          </header>

          <ul className="gallery">
            {MENUS.map((m, i) => (
              <li key={m.slug} className="gallery__item" data-reveal style={delay(i % 5 < 3 ? i % 5 : (i % 5) - 3)}>
                <Link to={`/menus/${m.slug}/`} className="plate">
                  <span className="plate__media">
                    <Picture imageKey={menuImageKey(m.slug)} alt={m.imageAlt} sizes={CARD_SIZES} />
                  </span>
                  <span className="plate__line">
                    <span className="plate__name">{m.name}</span>
                    <span className="plate__leader" aria-hidden="true" />
                    <span className="plate__price">{euro(m.pricePerPerson)}</span>
                  </span>
                  <span className="plate__desc">
                    {m.tagline}. Dès {m.minGuests} personnes.
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="gallery__foot" data-reveal>
            Prix par personne, TTC.{' '}
            <Link to="/menus/" className="link">
              Comparer et filtrer les menus
            </Link>
          </p>
        </div>
      </section>

      {/* ---------- Déroulé d'une commande ---------- */}
      <section className="section" id="etapes">
        <div className="container">
          <header className="section__head section__head--center">
            <h2 className="h2" data-reveal>
              Comment se passe une commande
            </h2>
          </header>
          <Steps steps={STEPS} />
        </div>
      </section>

      {/* ---------- Avis (raccourci du menu : /#avis) ---------- */}
      <section className="section section--dark" id="avis" aria-labelledby="avis-title">
        <div className="container">
          <header className="section__head section__head--center">
            <h2 id="avis-title" className="h2" data-reveal>
              Ils nous ont reçus à leur table
            </h2>
          </header>
          <div className="reviews">
            {TESTIMONIALS.map((t, i) => (
              <figure key={t.name} className="review" data-reveal style={delay(i * 2)}>
                <blockquote>{t.text}</blockquote>
                <figcaption>
                  {t.name}, {t.event}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        title="Parlons de votre réception"
        text="Giovanni vous répond au téléphone ou par écrit. Le devis est gratuit et vous parvient sous 48 h."
      />
    </>
  );
}
