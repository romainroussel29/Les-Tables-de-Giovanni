import type { ReactNode } from 'react';
import Picture from './Picture';

interface PageHeroProps {
  title: string;
  /** Photo facultative, affichée à droite du titre */
  imageKey?: string;
  children?: ReactNode;
}

/** En-tête des pages intérieures : titre (h1), chapô et photo */
export default function PageHero({ title, imageKey, children }: PageHeroProps) {
  return (
    <section className={`page-hero${imageKey ? ' page-hero--media' : ''}`}>
      <div className="container page-hero__inner">
        <div className="page-hero__content">
          <h1 className="page-hero__title">{title}</h1>
          {children && <div className="page-hero__text">{children}</div>}
        </div>
        {imageKey && (
          <figure className="page-hero__media" data-reveal="image">
            <Picture imageKey={imageKey} alt="" priority sizes="(min-width: 861px) 40vw, 100vw" />
          </figure>
        )}
      </div>
    </section>
  );
}
