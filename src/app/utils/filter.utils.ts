import { PokemonFilter } from '../components/pokemon/models/pokemon-filter.model';

export class FilterUtils {
  public static buildPokemonWhereClause(filter: PokemonFilter): string {
    let whereClause = '';
    let genConditions = '';
    let typeConditions = '';
    let searchCondition = '';

    const idClause = '{ id: { _lt: 10000 } }';

    const { generations, types, search } = filter;
    if (generations && generations.length > 0) {
      genConditions = generations
        .map(
          (gen) =>
            `{pokemonspecy: {generation: {name: {_eq: "generation-${gen}"}}}}`
        )
        .join(', ');
      genConditions = `{ _or: [${genConditions}] }`;
    }
    if (types && types.length > 0) {
      typeConditions = types
        .map((type) => `{pokemontypes: {type: {name: {_eq: "${type}"}}}}`)
        .join(', ');
      typeConditions = `{ _or: [${typeConditions}] }`;
    }
    if (search && search.trim().length > 0) {
      searchCondition = `{ name: { _ilike: "%${search.trim()}%" } }`;
    }

    const conditions = [genConditions, typeConditions, searchCondition].filter(
      (c) => c
    );

    whereClause = `{ _and: [${[idClause, ...conditions].join(', ')}] }`;

    return whereClause;
  }
}
