import {
  PokemonEvolution,
  PokemonSpeciesInEvolutionChain,
} from '../../pages/pokemon/models/pokemon.model';
import { EvolutionNode } from '../models/evolution.model';

export class EvolutionUtils {
  public static buildEvolutionTree(
    pokemonId: number,
    pokemons: PokemonSpeciesInEvolutionChain[]
  ): EvolutionNode[] {
    if (pokemons.length < 2) return [];

    let nodes: EvolutionNode[] = [];

    const ids = pokemons.map((p) => p.evolves_from_species_id);

    if (new Set(ids).size === ids.length) {
      nodes = _sortEvolutionChainLinear(pokemons).map((pokemon) => {
        const node: EvolutionNode = {
          id: pokemon.id,
          pokemon: pokemon.name,
          evolvesFrom: pokemon.evolves_from_species_id,
        };
        if (pokemon.pokemonevolutions.length) {
          const pokemonEvolution: PokemonEvolution =
            pokemon.pokemonevolutions[0];
          if (pokemonEvolution.min_level)
            node.minLevel = pokemonEvolution.min_level;
          if (pokemonEvolution.min_affection)
            node.minAffection = pokemonEvolution.min_affection;
          if (pokemonEvolution.min_beauty)
            node.minBeauty = pokemonEvolution.min_beauty;
          if (pokemonEvolution.min_happiness)
            node.minHappiness = pokemonEvolution.min_happiness;
          if (pokemonEvolution.time_of_day)
            node.timeOfDay = pokemonEvolution.time_of_day;
          if (pokemonEvolution.evolutiontrigger)
            node.trigger =
              pokemonEvolution.evolutiontrigger.evolutiontriggernames[0].name;
          if (pokemonEvolution.item)
            node.item = pokemonEvolution.item.itemnames[0].name;
          if (pokemonEvolution.move)
            node.move = pokemonEvolution.move.movenames[0].name;
          if (pokemonEvolution.gender)
            node.gender = pokemonEvolution.gender.name;
        }
        return node;
      });
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
        };

        const evo = current.pokemonevolutions[0];
        if (evo) {
          if (evo.min_level) node.minLevel = evo.min_level;
          if (evo.min_beauty) node.minBeauty = evo.min_beauty;
          if (evo.min_happiness) node.minHappiness = evo.min_happiness;
          if (evo.min_affection) node.minAffection = evo.min_affection;
          if (evo.time_of_day) node.timeOfDay = evo.time_of_day;
          if (evo.item) node.item = evo.item.itemnames[0].name;
          if (evo.gender) node.gender = evo.gender.name;
          if (evo.move) node.move = evo.move.movenames[0].name;
          if (evo.evolutiontrigger)
            node.trigger = evo.evolutiontrigger.evolutiontriggernames[0].name;
        }

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

      nodes = paths.flat();
    }

    console.log({ nodes });

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
