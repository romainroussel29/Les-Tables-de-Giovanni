// Blocs réutilisés par plusieurs pages : chiffres clés, étapes numérotées, appel final.
import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import { SITE } from '@/data/site';

/** Délai d'apparition au défilement, en multiples de 90 ms (voir base/_animations.scss) */
export const delay = (d: number) => ({ '--d': d }) as CSSProperties;

export function Facts({ revealDelay = 0 }: { revealDelay?: number }) {
  return (
    <dl className="facts" data-reveal style={delay(revealDelay)}>
      <div>
        <dt>Invités</dt>
        <dd>de 4 à 200</dd>
      </div>
      <div>
        <dt>Livraison</dt>
        <dd>{SITE.zone}</dd>
      </div>
      <div>
        <dt>Devis</dt>
        <dd>gratuit, sous 48 h</dd>
      </div>
    </dl>
  );
}

export interface Step {
  numeral: string;
  title: string;
  text: string;
}

export function Steps({ steps }: { steps: Step[] }) {
  return (
    <ol className="steps">
      {steps.map((s, i) => (
        <li key={s.title} className="step" data-reveal style={delay(i * 2)}>
          <span className="step__n" aria-hidden="true">
            {s.numeral}
          </span>
          <h3 className="h3">{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function FinalCta({ title, text }: { title: string; text: string }) {
  return (
    <section className="section" id="devis">
      <div className="container final">
        <h2 className="h2" data-reveal>
          {title}
        </h2>
        <p className="lead" data-reveal style={delay(1)}>
          {text}
        </p>
        <div className="actions actions--center" data-reveal style={delay(2)}>
          <Link to="/contact/" className="btn btn--primary">
            Demander un devis
          </Link>
          <a href={SITE.phoneHref} className="btn btn--outline">
            Appeler le {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
