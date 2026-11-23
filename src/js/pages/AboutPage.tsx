import PageHero from '@/components/PageHero';
import Picture from '@/components/Picture';
import { Facts, FinalCta, Steps, delay, type Step } from '@/components/Sections';
import { SITE } from '@/data/site';

const COMMITMENTS: Step[] = [
  {
    numeral: 'I',
    title: 'Fait maison, le jour même',
    text: "Les pâtes sont roulées le matin même, la focaccia sort du four avant le départ, les sauces mijotent depuis l'aube.",
  },
  {
    numeral: 'II',
    title: 'Les produits de Provence',
    text: "Les légumes viennent du marché d'Arles, l'huile d'olive des Alpilles, le taureau et le riz de Camargue.",
  },
  {
    numeral: 'III',
    title: 'Une table pour chacun',
    text: 'Végétarien, vegan, sans gluten, allergies : chaque menu s’adapte à vos invités, et les allergènes sont indiqués sur chaque carte.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="Giovanni, de Bari à Arles" imageKey="menu-trattoria-della-nonna">
        <p>Une cuisine de famille des Pouilles, servie à votre table depuis {SITE.founded}.</p>
      </PageHero>

      <section className="section">
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
              Les carnets de la nonna
            </h2>
            <p className="lead" data-reveal style={delay(1)}>
              Giovanni a grandi à Bari, dans une famille où l'on cuisinait pour vingt. Les recettes se transmettaient
              d'une génération à l'autre, notées dans les carnets de sa grand-mère.
            </p>
            <p data-reveal style={delay(2)}>
              En {SITE.founded}, il s'installe à Arles avec ces carnets et fonde Les Tables de Giovanni. Depuis, il
              cuisine pour vos tables comme pour la sienne : mariages, anniversaires, séminaires et repas de famille.
            </p>
            <Facts revealDelay={3} />
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <header className="section__head section__head--center">
            <h2 className="h2" data-reveal>
              Nos engagements
            </h2>
          </header>
          <Steps steps={COMMITMENTS} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <header className="section__head section__head--center">
            <h2 className="h2" data-reveal>
              Où nous livrons
            </h2>
            <p className="lead" data-reveal style={delay(1)}>
              Depuis notre atelier du {SITE.address}, nous livrons {SITE.zone}.
            </p>
          </header>
          <ul className="zones" data-reveal style={delay(2)}>
            {SITE.areaServed.map((zone) => (
              <li key={zone}>{zone}</li>
            ))}
          </ul>
          <p className="zones__note">
            Votre lieu de réception n'est pas dans la liste ?{' '}
            <a href={SITE.phoneHref} className="link">
              Appelez-nous
            </a>
            , nous vous dirons si nous pouvons venir.
          </p>
        </div>
      </section>

      <FinalCta
        title="Une date en tête ?"
        text="Racontez-nous votre événement : Giovanni compose un menu à votre mesure, avec un devis gratuit sous 48 h."
      />
    </>
  );
}
