import { Link } from 'react-router';
import PageHero from '@/components/PageHero';
import { SITE } from '@/data/site';

export default function LegalNoticePage() {
  return (
    <>
      <PageHero title="Mentions légales" />
      <section className="section section--tight">
        <div className="container prose">
          <h2>Éditeur du site</h2>
          <p>
            {SITE.name}, traiteur — {SITE.address}
            <br />
            Téléphone : <a href={SITE.phoneHref}>{SITE.phone}</a>
            <br />
            E-mail : <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>

          <h2>Site et nom de domaine</h2>
          <p>
            Le site est accessible à l'adresse <a href={`${SITE.url}/`}>{SITE.domain}</a>. Le nom de domaine{' '}
            {SITE.domain} est la propriété de {SITE.name}.
          </p>

          <h2>Hébergement</h2>
          <p>
            OVH SAS, 2 rue Kellermann, 59100 Roubaix, France — RCS Lille Métropole 424 761 419 — téléphone : 1007 —{' '}
            <a href="https://www.ovhcloud.com/fr/" rel="noopener">
              ovhcloud.com
            </a>
          </p>

          <h2>Crédits photos</h2>
          <p>Photographies issues d'Unsplash, utilisées selon la licence Unsplash.</p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus de ce site (textes, photographies, logo) est la propriété de {SITE.name}. Toute
            reproduction sans autorisation préalable est interdite.
          </p>

          <h2>Données personnelles</h2>
          <p>
            Le traitement des informations saisies dans le formulaire de contact est décrit dans notre{' '}
            <Link to="/politique-confidentialite/">politique de confidentialité</Link>.
          </p>

          <h2>Allergènes</h2>
          <p>
            La liste des allergènes est indiquée sur chaque menu. Nos plats sont préparés dans un atelier où sont
            manipulés les 14 allergènes réglementaires : des traces peuvent subsister. N'hésitez pas à nous signaler
            toute allergie lors de votre commande.
          </p>
        </div>
      </section>
    </>
  );
}
