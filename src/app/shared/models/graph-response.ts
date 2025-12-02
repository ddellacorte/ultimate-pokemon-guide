import { NatureDto } from '../../pages/nature/models/nature.model';
import {
  PokemonCardDto,
  PokemonDto,
} from '../../pages/pokemon/models/pokemon.model';
import { LanguageDto } from './language.model';

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
}

export interface NatureListQueryResult {
  naturename: NatureDto[];
}

export interface LanguageListQueryResult {
  language: LanguageDto[];
}
