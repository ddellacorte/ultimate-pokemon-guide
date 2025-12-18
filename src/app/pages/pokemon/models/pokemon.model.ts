export interface PokemonCardDto {
  id: number;
  name: string;
  pokemontypes: PokemonType[];
  pokemonsprites: PokemonSprite[];
}

export interface PokemonDto extends PokemonCardDto {
  height: number;
  weight: number;
  pokemonspecy: PokemonSpecy;
  pokemonabilities: PokemonAbility[];
  pokemoncries: PokemonCry[];
  pokemonstats: PokemonStat[];
}

export interface PokemonType {
  type: Type;
}

export interface Type {
  name: string;
  TypeefficaciesByTargetTypeId: PokemonTypeEfficacies[];
}

export interface TypeName {
  typenames: Type[];
}

export interface PokemonTypeEfficacies {
  damage_factor: number;
  type: Type;
}

export interface PokemonSprite {
  sprites: PokemonSprites;
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
  other: PokemonOtherSprites;
}

export interface PokemonOtherSprites {
  "official-artwork": PokemonOtherSpritesOfficialArtwork;
}

export interface PokemonOtherSpritesOfficialArtwork {
  front_default: string | null;
  front_shiny: string | null;
}

export interface PokemonSpecy {
  pokemonspeciesflavortexts: PokemonSpecyFlavorText[];
  pokemons: PokemonCardDto[];
}

export interface PokemonSpecyFlavorText {
  flavor_text: string;
}

export interface PokemonAbility {
  ability: Ability;
}

export interface Ability {
  name: string;
  abilityeffecttexts: AbilityEffect[];
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

export interface PokemonStat {
  base_stat: number;
  stat: Stat;
}

export interface Stat {
  name: string;
}