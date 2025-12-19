import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { LoaderService } from '../../shared/components/loader/loader.service';
import {
  PokemonListQueryResult,
  PokemonQueryResult,
} from '../../shared/models/graph-response';
import { FilterUtils } from '../../shared/utils/filter.utils';
import { PokemonFilter } from './models/pokemon-filter.model';
import { PokemonCardDto, PokemonDto } from './models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly _filter$ = new BehaviorSubject<PokemonFilter>({});
  
  public readonly filterImmediate$ = this._filter$.asObservable(); // no debounce
  public readonly filter$: Observable<PokemonFilter> = this._filter$
    .asObservable()
    .pipe(
      debounceTime(500), // attende 300ms dopo l'ultimo cambiamento
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)) // evita emissioni identiche
    );

  public constructor(
    private readonly apollo: Apollo,
    private readonly loader: LoaderService
  ) {}

  public addSearchFilter(search: string): void {
    this._updateFilter({
      search: search?.trim() || undefined,
    });
  }

  public toggleType(type: string): void {
    const types = this._filter$.value.types ?? [];
    this._updateFilter({
      types: types.includes(type)
        ? types.filter((t) => t !== type)
        : [...types, type],
    });
  }

  public toggleGeneration(gen: string): void {
    const gens = this._filter$.value.generations ?? [];
    this._updateFilter({
      generations: gens.includes(gen)
        ? gens.filter((g) => g !== gen)
        : [...gens, gen],
    });
  }

  public clearFilters(): void {
    this._filter$.next({});
  }

  public getPokemonListGraph(
    limit: number,
    offset: number
  ): Observable<PokemonCardDto[]> {
    return this.filter$.pipe(
      tap(() => this.loader.start()),
      switchMap((filter) => {
        const whereClause = FilterUtils.buildPokemonWhereClause(filter);
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
            }),
            finalize(() => this.loader.stop())
          );
      })
    );
  }

  public getPokemonGraph(
    id: number,
    languageId: number
  ): Observable<PokemonDto | undefined> {
    return this.apollo
      .query<PokemonQueryResult>({
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
              height
              weight
              pokemontypes {
                type {
                  name
                  TypeefficaciesByTargetTypeId {
                    damage_factor
                    type {
                      name
                    }
                  }
                }
              }
              pokemonsprites {
                sprites 
              }
              pokemonspecy {
                pokemons(where: {is_default:{_eq: false}}) {
                  is_default
                  name
                  pokemonsprites {
                    sprites 
                  }
                }
                capture_rate
                pokemonspeciesflavortexts(where: {language_id: { _eq: 9 }}) {
                  flavor_text
                }
                evolutionchain {
                  pokemonspecies {
                    pokemons {
                      pokemonsprites {
                        sprites
                      }
                    }
                    evolution_chain_id
                    id
                    name
                    evolves_from_species_id
                    pokemonevolutions {
                      min_level
                      min_affection
                      min_beauty
                      min_happiness
                      time_of_day
                      location {
                        locationnames(where: {language_id: { _eq: 9 }}) {
                          id
                          name
                        }
                        region {
                          generation {
                            generationnames(where: {language_id: { _eq: 9 }}) {
                              id
                              name
                            }
                          }
                        }
                      }
                      evolution_item_id
                      item {
                        itemnames(where: {language_id: { _eq: 9 }}) {
                          id
                          name
                        }
                        itemsprites {
                          sprites
                        }
                      }
                      ItemByHeldItemId {
                        id
                        name
                      }
                      type {
                        id
                        name
                      }
                      region {
                        id
                        name
                      }
                      gender {
                        id
                        name
                      }
                      evolutiontrigger {
                        evolutiontriggernames(where: {language_id: { _eq: 9 }}) {
                          id
                          name
                        }
                      }
                      move {
                        movenames(where: {language_id: { _eq: 9 }}) {
                          id
                          name
                        }
                      }
                    }
                  }
                }
              }
              pokemonabilities {
                ability {
                  name
                  abilityeffecttexts(where: {language_id: { _eq: 9 }}) {
                    effect
                  }
                }
              }
              pokemoncries {
                cries
              }
              pokemonstats {
                base_stat
                stat {
                  name
                }
              }
            }
          }
        `,
      })
      .pipe(
        map((result) => {
          if (result.data) return result.data.pokemon[0];
          return undefined;
        }),
        map((pokemon) => {
          if (pokemon) {
            return pokemon;
          }
          return undefined;
        })
      );
  }

  private _updateFilter(partial: Partial<PokemonFilter>): void {
    this._filter$.next({
      ...this._filter$.value,
      ...partial,
    });
  }
}
