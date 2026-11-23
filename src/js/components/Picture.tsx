import type { ImgHTMLAttributes } from 'react';
import { getImage } from '@/modules/images';

interface PictureProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  /** Nom de la photo, ex. « menu-trattoria-della-nonna » (voir modules/images.ts) */
  imageKey: string;
  alt: string;
  /** Largeur affichée, pour que le navigateur choisisse le bon fichier */
  sizes?: string;
  /** Photo visible dès l'arrivée (la plus grande de l'écran) : chargée tout de suite et en priorité */
  priority?: boolean;
  /** Attribut de parallaxe (voir modules/useMotion.ts) */
  'data-parallax'?: string;
}

/** Photo responsive (srcset), avec ses dimensions, chargée en différé sauf si `priority` est indiqué */
export default function Picture({ imageKey, alt, sizes = '100vw', priority = false, ...props }: PictureProps) {
  const image = getImage(imageKey);
  if (!image) return null;

  return (
    <img
      {...props}
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={priority ? undefined : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  );
}
