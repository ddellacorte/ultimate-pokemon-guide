import { PokemonCardDto } from "../components/pokemon/models/pokemon.model";

export interface GraphResponse<T> {
  result: GraphDataResponse<T>;
}

export interface GraphDataResponse<T> {
  data: T;
}

export interface PokemonQueryResult {
  pokemon: PokemonCardDto[];
}