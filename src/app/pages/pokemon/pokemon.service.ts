import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { PokemonListQueryResult } from '../../models/graph-response';
import { FilterUtils } from '../../utils/filter.utils';
import { PokemonFilter } from './models/pokemon-filter.model';
import { PokemonCardDto, PokemonDto } from './models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public constructor(private readonly apollo: Apollo) {}

  public getPokemonListGraph(
    limit: number,
    offset: number,
    filter?: PokemonFilter
  ): Observable<PokemonCardDto[]> {
    let whereClause = '{}';
    if (filter) whereClause = FilterUtils.buildPokemonWhereClause(filter);

    return this.apollo
      .query<PokemonListQueryResult>({
        query: gql`
          query {
            pokemon(
              limit: ${limit}, 
              offset: ${offset}, 
              where: ${whereClause},
              order_by: {id: asc}
            ) {
              id
              name
              pokemontypes {
                type {
                  name
                }
              }
              pokemonsprites {
                sprites 
              }
            }
          }
        `,
      })
      .pipe(
        map((result) => {
          if (result.data) return result.data.pokemon;
          return [];
        })
      );
  }

  public getPokemonGraph(id: number): Observable<PokemonDto | undefined> {
    return this.apollo
      .query<PokemonListQueryResult>({
        query: gql`
          query {
            pokemon(
              limit: 1, 
              offset: 0, 
              where: { id: { _eq: ${id}} },
              order_by: {id: asc}
            ) {
              id
              name
              pokemontypes {
                type {
                  name
                }
              }
              pokemonsprites {
                sprites 
              }
            }
          }
        `,
      })
      .pipe(
        map((result) => {
          if (result.data) return result.data.pokemon[0];
          return undefined;
        })
      );
  }
}
