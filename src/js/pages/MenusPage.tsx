import { useMemo, useState } from 'react';
import MenuCard from '@/components/MenuCard';
import PageHero from '@/components/PageHero';
import { CATEGORIES, DIETS, MENUS } from '@/data/menus';
import { normalize } from '@/modules/format';
import type { Category, Diet } from '@/types/menu';

type Sort = 'default' | 'price-asc' | 'price-desc';

/** Texte dans lequel cherche la recherche plein texte (plats compris) */
const HAYSTACKS = new Map(
  MENUS.map((m) => [
    m.slug,
    normalize(
      [m.name, m.tagline, m.description, ...m.courses.entrees, ...m.courses.plats, ...m.courses.desserts].join(' '),
    ),
  ]),
);

export default function MenusPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | 'Tous'>('Tous');
  const [diet, setDiet] = useState<Diet | 'Tous'>('Tous');
  const [guests, setGuests] = useState('');
  const [sort, setSort] = useState<Sort>('default');

  const results = useMemo(() => {
    const q = normalize(query);
    const n = Number(guests);
    const list = MENUS.filter(
      (m) =>
        (!q || HAYSTACKS.get(m.slug)!.includes(q)) &&
        (category === 'Tous' || m.category === category) &&
        (diet === 'Tous' || m.diet === diet) &&
        (!n || n >= m.minGuests),
    );
    if (sort === 'price-asc') list.sort((a, b) => a.pricePerPerson - b.pricePerPerson);
    if (sort === 'price-desc') list.sort((a, b) => b.pricePerPerson - a.pricePerPerson);
    return list;
  }, [query, category, diet, guests, sort]);

  const reset = () => {
    setQuery('');
    setCategory('Tous');
    setDiet('Tous');
    setGuests('');
    setSort('default');
  };

  return (
    <>
      <PageHero title="Nos menus" imageKey="menu-buffet-riviera">
        <p>
          Dix formules pensées pour toutes les occasions, du plateau-repas au dîner de gala. Chaque menu peut être
          adapté à vos invités : allergies, régimes, quantités… il suffit de nous le dire.
        </p>
      </PageHero>

      <section className="section section--tight">
        <div className="container">
          <form className="filters" role="search" aria-label="Rechercher un menu" onSubmit={(e) => e.preventDefault()}>
            <div className="field field--grow">
              <label htmlFor="q">Rechercher</label>
              <input
                id="q"
                type="search"
                placeholder="Un plat, un ingrédient… (ex. tiramisù)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="diet">Régime</label>
              <select id="diet" value={diet} onChange={(e) => setDiet(e.target.value as Diet | 'Tous')}>
                <option value="Tous">Tous</option>
                {DIETS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="guests">Invités</label>
              <input
                id="guests"
                type="number"
                min={1}
                inputMode="numeric"
                placeholder="Nombre"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="sort">Trier</label>
              <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                <option value="default">Par défaut</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
              </select>
            </div>
          </form>

          <div className="chips" role="group" aria-label="Filtrer par type de menu">
            {(['Tous', ...CATEGORIES] as const).map((c) => (
              <button
                key={c}
                type="button"
                className="chip"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <p className="results-count" aria-live="polite">
            {results.length} menu{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
          </p>

          <h2 className="visually-hidden">Tous nos menus traiteur</h2>
          {results.length > 0 ? (
            <ul className="menu-grid">
              {results.map((m) => (
                <MenuCard key={m.slug} menu={m} />
              ))}
            </ul>
          ) : (
            <div className="empty">
              <p>Aucun menu ne correspond à votre recherche.</p>
              <button type="button" className="btn btn--outline" onClick={reset}>
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
