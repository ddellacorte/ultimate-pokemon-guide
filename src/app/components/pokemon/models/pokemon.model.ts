export interface PokemonCardDto {
  id: number;
  name: string;
  pokemontypes: PokemonCardType[];
  pokemonsprites: PokemonCardSprite[];
}

export interface PokemonDto extends PokemonCardDto {
  
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
  front_default: string;
}
