export interface PokemonCardDto {
  id: number;
  name: string;
  pokemontypes: PokemonCardType[];
  pokemonsprites: PokemonCardSprite[];
}

export interface PokemonDto extends PokemonCardDto {
  height: number;
  weight: number;
  pokemonspecy: PokemonSpecy;
  pokemonabilities: PokemonAbility[];
  pokemoncries: PokemonCry[];
}

export interface PokemonCardType {
  type: PokemonType;
}

export interface PokemonType {
  name: string;
}

export interface PokemonCardSprite {
  sprites: PokemonSprites;
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
}

export interface PokemonSpecy {
  pokemonspeciesflavortexts: PokemonSpecyFlavorText[];
  pokemons: PokemonCardDto[]
}

export interface PokemonSpecyFlavorText {
  flavor_text: string;
}

export interface PokemonAbility {
  ability: Ability;
}

export interface Ability {
  name: string;
  abilityeffecttexts: AbilityEffect[]
}

export interface AbilityEffect {
  effect: string;
}

export interface PokemonCry {
  cries: Cry;
}

export interface Cry {
  latest: string;
  legacy: string;
}
