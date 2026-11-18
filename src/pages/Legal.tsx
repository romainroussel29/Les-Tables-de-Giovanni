import PageHero from "../components/PageHero";
import { SITE } from "../data/site";

export default function Legal() {
  return (
    <>
      <PageHero title="Mentions légales" />
      <section className="section section--tight">
        <div className="container prose">
          <h2>Éditeur du site</h2>
          <p>
            {SITE.name}, traiteur — {SITE.address}
            <br />
            Téléphone : {SITE.phone}
            <br />
            E-mail : {SITE.email}
          </p>

          <h2>Site et nom de domaine</h2>
          <p>
            Le site est accessible à l'adresse <a href={SITE.url}>{SITE.domain}</a>. Le nom de domaine{" "}
            {SITE.domain} est la propriété de {SITE.name}.
          </p>

          <h2>Hébergement</h2>
          <p>Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, États-Unis — cloudflare.com</p>

          <h2>Crédits photos</h2>
          <p>Photographies issues d'Unsplash, utilisées selon la licence Unsplash.</p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus de ce site (textes, photographies, logo) est la propriété de {SITE.name}. Toute
            reproduction sans autorisation préalable est interdite.
          </p>

          <h2>Données personnelles</h2>
          <p>
            Les informations saisies dans le formulaire de contact servent uniquement à répondre à votre demande et ne
            sont jamais cédées à des tiers. Conformément au RGPD, vous pouvez demander leur consultation, rectification
            ou suppression en écrivant à {SITE.email}.
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
