// Photos du site : public/assets/img/<nom>-<largeur>w.webp
// L'inventaire (largeurs et dimensions) est écrit dans data/images.json par `npm run images`.

import inventory from '@/data/images.json';

export interface ImageInfo {
  /** Largeurs disponibles, de la plus petite à la plus grande */
  widths: number[];
  /** Dimensions de la plus grande version (attributs width/height : pas de décalage à l'affichage) */
  width: number;
  height: number;
}

const IMAGES: Record<string, ImageInfo> = inventory;

const fileUrl = (key: string, width: number) => `/assets/img/${key}-${width}w.webp`;

/** Infos d'une photo (« menu-jardin-vegetal », « table-italienne-spaghetti-palourdes »…) */
export function getImage(key: string) {
  const info = IMAGES[key];
  if (!info) return null;
  const largest = info.widths[info.widths.length - 1];
  // Image de repli (navigateurs sans srcset) : la version 960 px, sinon la plus grande
  const fallback = info.widths.find((w) => w >= 960) ?? largest;
  return {
    ...info,
    src: fileUrl(key, fallback),
    largestSrc: fileUrl(key, largest),
    srcSet: info.widths.map((w) => `${fileUrl(key, w)} ${w}w`).join(', '),
  };
}

/** Photo d'un menu, à partir de son identifiant */
export const menuImageKey = (slug: string) => `menu-${slug}`;
