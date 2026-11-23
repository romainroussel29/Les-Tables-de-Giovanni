import PageHero from '@/components/PageHero';
import { SITE } from '@/data/site';

export default function PrivacyPage() {
  const email = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;
  return (
    <>
      <PageHero title="Politique de confidentialité" />
      <section className="section section--tight">
        <div className="container prose">
          <h2>Responsable du traitement</h2>
          <p>
            {SITE.name}, {SITE.address}. Contact : {email}.
          </p>

          <h2>Données collectées</h2>
          <p>
            Seules les informations que vous saisissez dans le formulaire de demande de devis sont collectées : nom,
            adresse e-mail, et, si vous les indiquez, téléphone, date de l'événement, menu souhaité, nombre d'invités et
            votre message.
          </p>

          <h2>Utilisation</h2>
          <p>
            Ces informations servent uniquement à répondre à votre demande et à établir votre devis. Elles ne sont
            jamais cédées, vendues ni transmises à des tiers, et ne sont pas utilisées à des fins publicitaires.
          </p>

          <h2>Durée de conservation</h2>
          <p>
            Vos données sont conservées le temps nécessaire au traitement de votre demande, puis au plus trois ans après
            notre dernier échange si aucune commande n'a suivi.
          </p>

          <h2>Cookies et mesure d'audience</h2>
          <p>
            Ce site ne dépose aucun cookie et n'utilise aucun outil de mesure d'audience ni de publicité. Les polices et
            les photos sont hébergées sur le site lui-même : aucune donnée de navigation n'est envoyée à un service
            tiers.
          </p>

          <h2>Vos droits</h2>
          <p>
            Conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés,
            vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de limitation du
            traitement de vos données. Pour l'exercer, écrivez à {email}.
          </p>
          <p>
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (
            <a href="https://www.cnil.fr" rel="noopener">
              cnil.fr
            </a>
            ).
          </p>
        </div>
      </section>
    </>
  );
}
