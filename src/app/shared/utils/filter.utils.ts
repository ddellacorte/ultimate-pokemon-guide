import { ItemFilter } from '../../pages/item/models/item-filter.model';
import { PokemonFilter } from '../../pages/pokemon/models/pokemon-filter.model';

export class FilterUtils {
  public static buildPokemonWhereClause(filter: PokemonFilter): string {
    let whereClause = '';
    let genConditions = '';
    let typeConditions = '';
    let searchCondition = '';

    // const idClause = '{ id: { _lt: 10000 } }';
    const idClause = '{}';

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

  public static buildItemWhereClause(
    langId: number,
    filter: ItemFilter
  ): string {
    let whereClause = '{}';
    let categoryConditions = '';
    let searchCondition = '';

    const langClause = `{ language_id: { _eq: ${langId} } }`;
    const { categories, search } = filter;

    if (categories && categories.length > 0) {
      categoryConditions = categories
        .map((category) => `{item:{itemcategory: {id: {_eq: ${category}}}}}`)
        .join(', ');
      categoryConditions = `{ _or: [${categoryConditions}] }`;
    }

    if (search && search.trim().length > 0) {
      searchCondition = `{ name: { _ilike: "%${search.trim()}%" } }`;
    }

    const conditions = [categoryConditions, searchCondition].filter(
      (c) => c
    );

    whereClause = `{ _and: [${[langClause, ...conditions].join(', ')}] }`;
    return whereClause;
  }
}
