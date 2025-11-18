import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { PokemonQueryResult } from '../../models/graph-response';
import { PokemonCardDto } from './models/pokemon.model';

interface PokemonResponse {
  count: number;
  next: string;
  previous: string;
  results: PokemonResultResponse[];
}

interface PokemonResultResponse {
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public constructor(
    private readonly http: HttpClient,
    private readonly apollo: Apollo
  ) {}

  public getPokemonListGraph(limit: number, offset: number): Observable<PokemonCardDto[]> {
    return this.apollo
      .query<PokemonQueryResult>({
        query: gql`
          query {
            pokemon(limit: ${limit}, offset: ${offset}) {
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
}
