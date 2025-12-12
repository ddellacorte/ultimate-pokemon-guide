export interface NatureDto {
  id: number;
  name: string;
  nature: NatureStatsDto;
}

export interface NatureStatsDto {
  StatByIncreasedStatId: StatDto | null;
  stat: StatDto | null;
}

interface StatDto {
  statnames: StatName[];
}

interface StatName {
  name: string;
}
