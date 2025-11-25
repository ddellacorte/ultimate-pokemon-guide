import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonDto } from '../models/pokemon.model';
import { PokemonService } from '../pokemon.service';
import { PadNumberPipe } from '../../../shared/pipes/pad-number.pipe';

@Component({
  selector: 'app-pokemon-info',
  imports: [UpperCasePipe, PadNumberPipe],
  templateUrl: './pokemon-info.html',
  styleUrl: './pokemon-info.scss',
})
export class PokemonInfo implements OnInit {
  public pokemon?: PokemonDto;

  public constructor(
    private readonly router: Router,
    private readonly pokemonService: PokemonService,
    private readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    if (id)
      this.pokemonService.getPokemonGraph(id).subscribe((pokemon) => {
        this.pokemon = pokemon;
      });
  }

  public back(): void {
    this.router.navigateByUrl('pokemon');
  }
}
