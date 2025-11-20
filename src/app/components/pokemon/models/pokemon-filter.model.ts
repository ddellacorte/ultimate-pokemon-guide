export interface GenericFilter {
  search?: string;
}

export interface PokemonFilter extends GenericFilter {
  types?: string[];
  generations?: string[];
}
