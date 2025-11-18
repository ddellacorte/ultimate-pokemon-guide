import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TYPE_COLORS } from '../../constants';
import { PadNumberPipe } from '../../pipes/pad-number.pipe';
import { TypeColorPipe } from '../../pipes/type-color.pipe';
import { PokemonCardDto } from './models/pokemon.model';
import { PokemonNavbar } from './pokemon-navbar/pokemon-navbar';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-pokemon',
  imports: [
    TitleCasePipe,
    PadNumberPipe,
    TypeColorPipe,
    CommonModule,
    PokemonNavbar,
  ],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.scss',
})
export class Pokemon implements OnInit {
  public pokemons: PokemonCardDto[] = [];

  public constructor(private readonly pokemonService: PokemonService) {}

  public ngOnInit(): void {
    this.pokemonService
      .getPokemonListGraph(50, 0)
      .subscribe((result: PokemonCardDto[] | undefined) => {
        if (result) this.pokemons = result;
      });
  }

  getCardStyle(pokemon: any): {
    [className: string]: string;
  } {
    const types = pokemon.pokemontypes.map((t: any) => t.type.name);

    if (types.length === 1) {
      const c = TYPE_COLORS[types[0]];
      return {
        // border: `3px solid ${c}`,
        '--border-gradient': c,
        background: c + '33', // aggiungo trasparenza (33 = ~20%)
        backdropFilter: 'brightness(1.1)',
      };
    }

    const c1 = TYPE_COLORS[types[0]];
    const c2 = TYPE_COLORS[types[1]];

    return {
      // border: '3px solid transparent',
      // borderImage: `linear-gradient(90deg, ${c1}, ${c2}) 1`,
      '--border-gradient': `linear-gradient(45deg, ${c1}, ${c2})`,
      background: `linear-gradient(45deg, ${c1}55, ${c2}55)`,
      backdropFilter: 'brightness(1.15)',
    };
  }

  // getCardBackground(pokemon: PokemonDto) {
  //   const types = pokemon.types.map((t: any) => t.type.name);

  //   // Pokémon monotipo → sfondo uniforme
  //   if (types.length === 1) {
  //     const c = TYPE_COLORS[types[0]];
  //     return {
  //       background: c + '33', // aggiungo trasparenza (33 = ~20%)
  //       backdropFilter: 'brightness(1.1)',
  //     };
  //   }

  //   // Pokémon due tipi → gradiente
  //   const c1 = TYPE_COLORS[types[0]];
  //   const c2 = TYPE_COLORS[types[1]];

  //   return {
  //     background: `linear-gradient(45deg, ${c1}55, ${c2}55)`,
  //     backdropFilter: 'brightness(1.15)',
  //   };
  // }
}
