export interface NavItem {
  label: NavItemElement;
  image: string;
  action: () => void;
}

export enum NavItemElement {
  POKEMON = 'pokemon',
  MOVES = 'moves',
  ABILITIES = 'abilities',
  ITEMS = 'items',
  NATURES = 'natures',
}
