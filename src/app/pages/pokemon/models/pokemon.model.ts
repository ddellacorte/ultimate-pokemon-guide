import { BaseInfo } from "../../../shared/models/graph-response";
import { ItemSpriteDto } from "../../item/models/item.model";

export interface PokemonCardDto extends BaseInfo {
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
  capture_rate: number;
  evolutionchain: PokemonEvolutionChain;
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

export interface PokemonEvolutionChain {
  pokemonspecies: PokemonSpeciesInEvolutionChain[];
}

export interface PokemonSpeciesInEvolutionChain extends BaseInfo {
  evolution_chain_id: number;
  evolves_from_species_id: number | null;
  pokemonevolutions: PokemonEvolution[];
  pokemons: PokemonCardDto[];
}

export interface PokemonEvolution {
  location: PokemonEvolutionLocation | null;
  min_level: number | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  time_of_day: string | null;
  party_species_id: number | null;
  base_form_id: number | null;
  baseformid: BaseInfo | null;
  evolution_item_id: number | null;
  item: PokemonEvolutionItem | null;
  ItemByHeldItemId: BaseInfo | null;
  type: BaseInfo | null;
  region: BaseInfo | null;
  gender: BaseInfo | null;
  evolutiontrigger: PokemonEvolutionTrigger | null;
  move: PokemonEvolutionMove | null;
}

export interface PokemonEvolutionItem {
  itemsprites: ItemSpriteDto[];
  itemnames: BaseInfo[];
}

export interface PokemonEvolutionTrigger {
  evolutiontriggernames: BaseInfo[];
}

export interface PokemonEvolutionMove {
  movenames: BaseInfo[];
}

export interface PokemonEvolutionSprite {
  pokemonsprites: PokemonSprite[];
}

export interface PokemonEvolutionLocation {
  locationnames: BaseInfo[];
  region: PokemonEvolutionRegionLocation;
}

export interface PokemonEvolutionRegionLocation {
  generation: PokemonEvolutionRegionLocationNames;
}

export interface PokemonEvolutionRegionLocationNames {
  generationnames: BaseInfo[];
}