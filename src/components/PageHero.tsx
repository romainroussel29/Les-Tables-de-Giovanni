import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}

export default function PageHero({ eyebrow, title, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-hero__title">{title}</h1>
        {children && <div className="page-hero__text">{children}</div>}
      </div>
    </section>
  );
}
