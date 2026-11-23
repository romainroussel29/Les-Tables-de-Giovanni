import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router';
import Icon from '@/components/Icon';
import PageHero from '@/components/PageHero';
import { MENUS } from '@/data/menus';
import { HOURS, SITE } from '@/data/site';

interface FormData {
  name: string;
  email: string;
  phone: string;
  menu: string;
  guests: string;
  date: string;
  message: string;
}

type Errors = Partial<Record<keyof FormData, string>>;

const EMPTY: FormData = { name: '', email: '', phone: '', menu: '', guests: '', date: '', message: '' };

const validate = (f: FormData): Errors => {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Merci d'indiquer votre nom.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Adresse e-mail invalide.';
  if (f.phone && !/^[\d\s.+()-]{10,}$/.test(f.phone)) e.phone = 'Numéro de téléphone invalide.';
  if (f.guests && Number(f.guests) < 1) e.guests = "Nombre d'invités invalide.";
  if (f.message.trim().length < 10) e.message = 'Votre message doit contenir au moins 10 caractères.';
  return e;
};

export default function ContactPage() {
  const [params] = useSearchParams();
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  // Pré-remplissage depuis la fiche d'un menu (?menu=…&invites=…). Fait après l'affichage :
  // la page pré-rendue n'a pas de paramètres, le premier rendu doit lui être identique.
  const menuParam = params.get('menu');
  const guestsParam = params.get('invites');
  useEffect(() => {
    if (!menuParam && !guestsParam) return;
    setForm((f) => ({ ...f, menu: menuParam ?? f.menu, guests: guestsParam ?? f.guests }));
  }, [menuParam, guestsParam]);

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  const update = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`#${first}`)?.focus();
      return;
    }
    setSent(true);
  };

  const field = (name: keyof FormData) => ({
    id: name,
    name,
    value: form[name],
    onChange: update,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  const error = (name: keyof FormData) =>
    errors[name] && (
      <span id={`${name}-error`} className="field__error">
        {errors[name]}
      </span>
    );

  return (
    <>
      <PageHero title="Contact et devis" imageKey="menu-grande-reception">
        <p>Une question, une envie, une date ? Écrivez-nous ou appelez-nous : réponse sous 48 h, devis gratuit.</p>
      </PageHero>

      <section className="section section--tight">
        <div className="container contact">
          <aside className="contact__info" aria-label="Coordonnées">
            <a href={SITE.phoneHref} className="contact__phone">
              <Icon name="telephone" size="lg" />
              <span>
                <small>Appelez Giovanni</small>
                {SITE.phone}
              </span>
            </a>
            <ul className="contact__list">
              <li>
                <Icon name="email" /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <Icon name="adresse" /> {SITE.address}
              </li>
              <li>
                <Icon name="horloge" /> Zone de livraison : {SITE.zone}
              </li>
            </ul>
            <h2>Horaires de l'atelier</h2>
            <ul className="hours">
              {HOURS.map((h) => (
                <li key={h.day}>
                  <span>{h.day}</span>
                  <span>{h.hours}</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="contact__form-wrap">
            <h2 className="visually-hidden">Demande de devis</h2>
            {sent ? (
              <div className="success" role="status" tabIndex={-1} ref={successRef}>
                <h2>Grazie mille, {form.name.trim().split(' ')[0]} !</h2>
                <p>
                  Votre demande a bien été prise en compte. Nous revenons vers vous sous 48 h à l'adresse{' '}
                  <strong>{form.email}</strong>.
                </p>
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={() => {
                    setForm(EMPTY);
                    setSent(false);
                  }}
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form className="form" onSubmit={submit} noValidate>
                <div className="form__row">
                  <div className="field">
                    <label htmlFor="name">Nom complet *</label>
                    <input type="text" autoComplete="name" required {...field('name')} />
                    {error('name')}
                  </div>
                  <div className="field">
                    <label htmlFor="email">E-mail *</label>
                    <input type="email" autoComplete="email" required {...field('email')} />
                    {error('email')}
                  </div>
                </div>
                <div className="form__row">
                  <div className="field">
                    <label htmlFor="phone">Téléphone</label>
                    <input type="tel" autoComplete="tel" {...field('phone')} />
                    {error('phone')}
                  </div>
                  <div className="field">
                    <label htmlFor="date">Date de l'événement</label>
                    <input type="date" {...field('date')} />
                  </div>
                </div>
                <div className="form__row">
                  <div className="field">
                    <label htmlFor="menu">Menu souhaité</label>
                    <select {...field('menu')}>
                      <option value="">Je ne sais pas encore</option>
                      {MENUS.map((m) => (
                        <option key={m.slug} value={m.slug}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="guests">Nombre d'invités</label>
                    <input type="number" min={1} inputMode="numeric" {...field('guests')} />
                    {error('guests')}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="message">Votre message *</label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Type d'événement, lieu, allergies, envies particulières…"
                    {...field('message')}
                  />
                  {error('message')}
                </div>
                <p className="form__note">
                  * Champs obligatoires. Vos données servent uniquement à répondre à votre demande (
                  <Link to="/politique-confidentialite/">politique de confidentialité</Link>).
                </p>
                <button type="submit" className="btn btn--primary btn--lg">
                  Envoyer ma demande
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
