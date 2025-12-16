export interface EvolutionNode {
    id: number;
    pokemon: string;
    evolvesFrom: number | null;
    sprite: string | null;
    item?: string;
    minLevel?: number;
    minAffection?: number;
    minBeauty?: number;
    minHappiness?: number;
    timeOfDay?: string;
    trigger?: string;
    move?: string;
    gender?: string;
    location?: string;
}
