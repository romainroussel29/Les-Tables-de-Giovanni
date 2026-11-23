/** Icônes de public/assets/icons/, affichées en masque : elles prennent la couleur du texte */
export type IconName = 'telephone' | 'email' | 'adresse' | 'horloge' | 'invites';

interface IconProps {
  name: IconName;
  size?: 'sm' | 'lg';
}

export default function Icon({ name, size }: IconProps) {
  return <span className={`icon icon--${name}${size ? ` icon--${size}` : ''}`} aria-hidden="true" />;
}
