import { ItemCategory } from '../../pages/item/models/item-category.model';
import { ItemDto } from '../../pages/item/models/item.model';
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

export interface ItemListQueryResult {
  itemname: ItemDto[];
}

export interface CategoryListQueryResult {
  itemcategory: ItemCategory[];
}

export interface BaseInfo {
  id: number;
  name: string;
}