<<<<<<< HEAD:src/app/shared/models/graph-response.ts
import { PokemonCardDto } from "../../pages/pokemon/models/pokemon.model";

export interface GraphResponse<T> {
  result: GraphDataResponse<T>;
}

export interface GraphDataResponse<T> {
  data: T;
}

export interface PokemonListQueryResult {
  pokemon: PokemonCardDto[];
=======
import { PokemonCardDto, PokemonDto } from "../components/pokemon/models/pokemon.model";

export interface GraphResponse<T> {
  result: GraphDataResponse<T>;
}

export interface GraphDataResponse<T> {
  data: T;
}

export interface PokemonListQueryResult {
  pokemon: PokemonCardDto[];
}

export interface PokemonQueryResult {
  pokemon: PokemonDto[];
>>>>>>> 593f8b1 (feat(pokemon): enhance Pokemon info display with new attributes and shiny toggle):src/app/models/graph-response.ts
}