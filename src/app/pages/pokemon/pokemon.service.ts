import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { finalize, map, Observable } from 'rxjs';
import { PokemonFilter } from './models/pokemon-filter.model';
import { PokemonCardDto, PokemonDto } from './models/pokemon.model';
import { FilterUtils } from '../../shared/utils/filter.utils';
import { LoaderService } from '../../shared/components/loader/loader.service';
import {
  PokemonListQueryResult,
  PokemonQueryResult,
} from '../../shared/models/graph-response';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public constructor(
    private readonly apollo: Apollo,
    private readonly loader: LoaderService
  ) {}

  public getPokemonListGraph(
    limit: number,
    offset: number,
    filter?: PokemonFilter
  ): Observable<PokemonCardDto[]> {
    let whereClause = '{}';
    if (filter) whereClause = FilterUtils.buildPokemonWhereClause(filter);
    this.loader.start();
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
                id
                pokemonspeciesflavortexts(where: {language_id: { _eq: ${languageId} }}) {
                  flavor_text
                }
                pokemons {
                  id
                  name
                  pokemontypes {
                    type {
                      typenames(where: {language_id: { _eq: ${languageId} }}) {
                capture_rate
                pokemonspeciesflavortexts(where: {language_id: { _eq: 9 }}) {
                  flavor_text
                }
                evolutionchain {
                  pokemonspecies {
                    evolution_chain_id
                    id
                    name
                    evolves_from_species_id
                    pokemonevolutions {
                      pokemonspecy {
                        id 
                        name
                        pokemons {
                          pokemonforms {
                            form_name
                            name
                          }
                        }
                      }
                      PokemonspecyByPartySpeciesId {id name}
                      region_id
                      region {
                        name
                      }
                      location {
                        name
                      }
                      evolved_species_id
                      min_level
                      party_species_id
                      base_form_id
                      baseformid {
                        id
                        name
                      }
                      evolution_item_id
                      item {
                        id
                        name
                      }
                      ItemByHeldItemId {
                        name
                      }
                      type {
                        name
                      }
                      region {
                        name
                      }
                      gender {
                        name
                      }
                      evolutiontrigger {
                        evolutiontriggernames(where: {language_id: { _eq: 9 }}) {
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
}
