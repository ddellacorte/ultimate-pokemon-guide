import { Component, OnInit } from '@angular/core';
import { PokemonDto } from './models/pokemon.model';
import { PokemonService } from './pokemon.service';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { PadNumberPipe } from '../../pipes/pad-number.pipe';
import { TypeColorPipe } from '../../pipes/type-color.pipe';

@Component({
  selector: 'app-pokemon',
  imports: [TitleCasePipe, PadNumberPipe, TypeColorPipe, CommonModule],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.scss',
})
export class Pokemon implements OnInit {
  public pokemons: PokemonDto[] = [];

  public constructor(private readonly pokemonService: PokemonService) {}

  public ngOnInit(): void {
    this.pokemonService.getPokemonList(500, 0).subscribe((data) => {
      this.pokemons = data;
    });
  }
}
