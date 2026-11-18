import type { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  /** Photo de fond facultative, très assombrie */
  image?: string;
  children?: ReactNode;
}

export default function PageHero({ title, image, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      {image && (
        <>
          <img className="page-hero__bg" src={image} alt="" />
          <div className="page-hero__veil" />
        </>
      )}
      <div className="page-hero__content">
        <h1 className="page-hero__title">{title}</h1>
        {children && <div className="page-hero__text">{children}</div>}
      </div>
    </section>
  );
}
