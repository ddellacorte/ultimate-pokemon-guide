import { PokemonType } from '../../pages/pokemon/models/pokemon.model';

export class TypeUtils {
  public static calculateWeaknesses(
    types: PokemonType[]
  ): Map<string, string[]> {
    const typeDamageMap = new Map<string, number>(); // type name > multiplier
    for (const type of types) {
      const targetTypes = type.type.TypeefficaciesByTargetTypeId;
      for (const efficacy of targetTypes) {
        if (typeDamageMap.has(efficacy.type.name)) {
          typeDamageMap.set(
            efficacy.type.name,
            (typeDamageMap.get(efficacy.type.name)! * efficacy.damage_factor) /
              100
          );
        } else {
          typeDamageMap.set(efficacy.type.name, efficacy.damage_factor / 100);
        }
      }
    }
    
    const damageTypesMap = new Map<string, string[]>(); // damage factor > type names[]
    typeDamageMap.forEach((multiplier, typeName) => {
      const key = multiplier.toString() + 'x';
      if (damageTypesMap.has(key)) {
        damageTypesMap.get(key)!.push(typeName);
      } else {
        damageTypesMap.set(key, [typeName]);
      }
    });

    const sortedDamageTypesMap = new Map(
      [...damageTypesMap.entries()].sort((a, b) => {
        const numA = parseFloat(a[0]);
        const numB = parseFloat(b[0]);
        return numB - numA;
      })
    );
    return sortedDamageTypesMap;
  }
}
