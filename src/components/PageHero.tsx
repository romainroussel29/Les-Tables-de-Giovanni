import type { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  /** Photo facultative, affichée à droite du titre */
  image?: string;
  children?: ReactNode;
}

export default function PageHero({ title, image, children }: PageHeroProps) {
  return (
    <section className={`page-hero${image ? " page-hero--media" : ""}`}>
      <div className="container page-hero__inner">
        <div className="page-hero__content">
          <h1 className="page-hero__title">{title}</h1>
          {children && <div className="page-hero__text">{children}</div>}
        </div>
        {image && (
          <figure className="page-hero__media" data-reveal="image">
            <img src={image} alt="" />
          </figure>
        )}
      </div>
    </section>
  );
}
