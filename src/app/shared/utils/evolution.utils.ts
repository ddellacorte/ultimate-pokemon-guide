import {
  PokemonEvolution,
  PokemonSpeciesInEvolutionChain,
} from '../../pages/pokemon/models/pokemon.model';
import { EvolutionMethod, EvolutionNode } from '../models/evolution.model';

export class EvolutionUtils {
  public static buildEvolutionTree(
    pokemons: PokemonSpeciesInEvolutionChain[]
  ): EvolutionNode[][] {
    if (pokemons.length < 2) return [];

    let nodes: EvolutionNode[][] = [];

    const ids = pokemons.map((p) => p.evolves_from_species_id);

    if (new Set(ids).size === ids.length) {
      const linearNodes = _sortEvolutionChainLinear(pokemons).map((pokemon) => {
        const node: EvolutionNode = {
          id: pokemon.id,
          pokemon: pokemon.name,
          evolvesFrom: pokemon.evolves_from_species_id,
          sprite:
            pokemon.pokemons[0].pokemonsprites[0].sprites.other[
              'official-artwork'
            ].front_default ??
            pokemon.pokemons[0].pokemonsprites[0].sprites.front_default,
        };
        // if (pokemon.pokemonevolutions.length) {
        //   const pokemonEvolution: PokemonEvolution =
        //     pokemon.pokemonevolutions[0];
        //   if (pokemon.pokemons)
        //     if (pokemonEvolution.min_level)
        //       node.minLevel = pokemonEvolution.min_level;
        //   if (pokemonEvolution.min_affection)
        //     node.minAffection = pokemonEvolution.min_affection;
        //   if (pokemonEvolution.min_beauty)
        //     node.minBeauty = pokemonEvolution.min_beauty;
        //   if (pokemonEvolution.min_happiness)
        //     node.minHappiness = pokemonEvolution.min_happiness;
        //   if (pokemonEvolution.time_of_day)
        //     node.timeOfDay = pokemonEvolution.time_of_day;
        //   if (pokemonEvolution.evolutiontrigger)
        //     node.trigger =
        //       pokemonEvolution.evolutiontrigger.evolutiontriggernames[0].name;
        //   if (pokemonEvolution.item) {
        //     node.item = pokemonEvolution.item.itemnames[0].name;
        //     node.itemSprite =
        //       pokemonEvolution.item.itemsprites[0].sprites.default;
        //   }
        //   if (pokemonEvolution.move)
        //     node.move = pokemonEvolution.move.movenames[0].name;
        //   if (pokemonEvolution.gender)
        //     node.gender = pokemonEvolution.gender.name;
        //   if (pokemonEvolution.location)
        //     node.location = pokemonEvolution.location.locationnames[0].name;
        // }
        node.methods = _condenseEvolutionMethods(pokemon.pokemonevolutions);
        return node;
      });
      nodes.push(linearNodes);
    } else {
      const basePokemon = pokemons.find(
        (p) => p.evolves_from_species_id === null
      );
      if (!basePokemon) return [];

      // padre → figli
      const childrenMap = new Map<number, PokemonSpeciesInEvolutionChain[]>();
      for (const p of pokemons) {
        if (p.evolves_from_species_id !== null) {
          const parentId = p.evolves_from_species_id;
          if (!childrenMap.has(parentId)) {
            childrenMap.set(parentId, []);
          }
          childrenMap.get(parentId)!.push(p);
        }
      }

      const paths: EvolutionNode[][] = [];

      const dfs = (
        current: PokemonSpeciesInEvolutionChain,
        path: EvolutionNode[]
      ) => {
        const node: EvolutionNode = {
          id: current.id,
          pokemon: current.name,
          evolvesFrom: current.evolves_from_species_id,
          sprite:
            current.pokemons[0].pokemonsprites[0].sprites.other[
              'official-artwork'
            ].front_default ??
            current.pokemons[0].pokemonsprites[0].sprites.front_default,
        };

        // const evo = current.pokemonevolutions[0];
        // if (evo) {
        //   if (evo.min_level) node.minLevel = evo.min_level;
        //   if (evo.min_beauty) node.minBeauty = evo.min_beauty;
        //   if (evo.min_happiness) node.minHappiness = evo.min_happiness;
        //   if (evo.min_affection) node.minAffection = evo.min_affection;
        //   if (evo.time_of_day) node.timeOfDay = evo.time_of_day;
        //   if (evo.item) {
        //     node.item = evo.item.itemnames[0].name;
        //     node.itemSprite = evo.item.itemsprites[0].sprites.default;
        //   }
        //   if (evo.gender) node.gender = evo.gender.name;
        //   if (evo.move) node.move = evo.move.movenames[0].name;
        //   if (evo.location) node.location = evo.location.locationnames[0].name;
        //   if (evo.evolutiontrigger)
        //     node.trigger = evo.evolutiontrigger.evolutiontriggernames[0].name;
        // }
        node.methods = _condenseEvolutionMethods(current.pokemonevolutions);

        const newPath = [...path, node];
        const children = childrenMap.get(current.id) ?? [];

        if (!children.length) {
          paths.push(newPath);
          return;
        }

        for (const child of children) {
          dfs(child, newPath);
        }
      };

      dfs(basePokemon, []);

      nodes = paths;
    }

    return nodes;
  }
}

function _sortEvolutionChainLinear(
  species: PokemonSpeciesInEvolutionChain[]
): PokemonSpeciesInEvolutionChain[] {
  if (!species.length) return [];

  // mappa id → specie
  const map = new Map<number, PokemonSpeciesInEvolutionChain>();
  species.forEach((s) => map.set(s.id, s));

  // trova il primo (base form)
  const root = species.find((s) => s.evolves_from_species_id === null);

  if (!root) return [];

  const ordered: PokemonSpeciesInEvolutionChain[] = [];
  let current: PokemonSpeciesInEvolutionChain | undefined = root;

  while (current) {
    ordered.push(current);

    current = species.find((s) => s.evolves_from_species_id === current!.id);
  }

  return ordered;
}

function _condenseEvolutionMethods(
  evolutions: PokemonEvolution[]
): EvolutionMethod[] {
  const methods: EvolutionMethod[] = [];

  for (const evo of evolutions) {
    const trigger =
      evo.evolutiontrigger?.evolutiontriggernames[0]?.name;

    if (!trigger) continue;

    const method: EvolutionMethod = { trigger };

    // location-based evolution
    if (evo.location) {
      method.location = {
        name: evo.location.locationnames[0].name,
        generation:
          evo.location.region.generation.generationnames[0].name.replace("Generation", "Gen"),
      };
    }

    // item-based evolution
    if (evo.item) {
      method.item = {
        name: evo.item.itemnames[0]?.name,
        sprite: evo.item.itemsprites[0]?.sprites.default,
      };
    }

    if (evo.min_level) method.minLevel = evo.min_level;
    if (evo.time_of_day) method.timeOfDay = evo.time_of_day;
    if (evo.min_affection) method.minAffection = evo.min_affection;
    if (evo.min_beauty) method.minBeauty = evo.min_beauty;
    if (evo.min_happiness) method.minHappiness = evo.min_happiness;
    if (evo.gender) method.gender = evo.gender.name;

    // evita duplicati identici
    const exists = methods.some(
      (m) =>
        m.trigger === method.trigger &&
        m.location?.name === method.location?.name &&
        m.item?.name === method.item?.name
    );

    if (!exists) {
      methods.push(method);
    }
  }

  return methods;
}


