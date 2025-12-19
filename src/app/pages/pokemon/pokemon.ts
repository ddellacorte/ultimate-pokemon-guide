import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PadNumberPipe } from '../../shared/pipes/pad-number.pipe';
import { TypeColorPipe } from '../../shared/pipes/type-color.pipe';
import { TYPES } from '../../shared/utils/constants';
import { PokemonCardDto, PokemonType } from './models/pokemon.model';
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
  public shiny = false;

  public constructor(
    private readonly pokemonService: PokemonService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.pokemonService
      .getPokemonListGraph(151, 0)
      .subscribe((result: PokemonCardDto[] | undefined) => {
        if (result) this.pokemons = result;
      });
  }

  public getCardStyle(pokemon: PokemonCardDto): {
    [className: string]: string;
  } {
    const types = pokemon.pokemontypes.map((t: PokemonType) => t.type.name);

    if (types.length === 1) {
      const c = TYPES.find((t) => t.name === types[0])?.color || '#777';
      return {
        '--border-gradient': c,
        background: c + '33', // aggiungo trasparenza (33 = ~20%)
        backdropFilter: 'brightness(1.1)',
      };
    }

    const c1 = TYPES.find((t) => t.name === types[0])?.color || '#777';
    const c2 = TYPES.find((t) => t.name === types[1])?.color || '#777';

    return {
      '--border-gradient': `linear-gradient(45deg, ${c1}, ${c2})`,
      background: `linear-gradient(45deg, ${c1}55, ${c2}55)`,
      backdropFilter: 'brightness(1.15)',
    };
  }

  public selectPokemon(pokemon: PokemonCardDto): void {
    this.router.navigateByUrl(`pokemon/${pokemon.id}`);
  }
}
