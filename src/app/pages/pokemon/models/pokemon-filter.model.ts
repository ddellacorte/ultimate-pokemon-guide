import { GenericFilter } from "../../../shared/models/generic-filter.model";

export interface PokemonFilter extends GenericFilter {
  types?: string[];
  generations?: string[];
}
