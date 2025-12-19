export interface EvolutionNode {
  id: number;
  pokemon: string;
  sprite: string | null;
  evolvesFrom: number | null;
  methods?: EvolutionMethod[];
}

export interface EvolutionMethod {
  trigger: string;
  location?: Location;
  item?: Item;
  minLevel?: number;
  minAffection?: number;
  minBeauty?: number;
  minHappiness?: number;
  timeOfDay?: string;
  gender?: string;
  move?: string;
}

interface Location {
  name: string;
  generation: string;
}

interface Item {
    name: string;
    sprite: string;
}
