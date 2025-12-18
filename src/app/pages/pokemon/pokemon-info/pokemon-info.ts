import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  NgbProgressbarModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { switchMap } from 'rxjs';
import { DividePipe } from '../../../shared/pipes/divide.pipe';
import { PadNumberPipe } from '../../../shared/pipes/pad-number.pipe';
import { TypeColorPipe } from '../../../shared/pipes/type-color.pipe';
import { LanguageService } from '../../../shared/services/language.service';
import { TypeUtils } from '../../../shared/utils/type.utils';
import { Destroy } from '../../destroy';
import { PokemonDto } from '../models/pokemon.model';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-info',
  imports: [
    UpperCasePipe,
    PadNumberPipe,
    CommonModule,
    DividePipe,
    NgbTooltipModule,
    NgbProgressbarModule,
    TypeColorPipe,
  ],
  templateUrl: './pokemon-info.html',
  styleUrl: './pokemon-info.scss',
})
export class PokemonInfo extends Destroy implements OnInit {
  @Input() id?: number;

  public pokemon?: PokemonDto;
  public weaknesses = new Map<string, string[]>();

  public constructor(
    private readonly router: Router,
    private readonly pokemonService: PokemonService,
    private readonly languageService: LanguageService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.languageService.lang$
      .pipe(
        this.takeUntilDestroy(),
        switchMap((langId) => {
          return this.pokemonService.getPokemonGraph(this.id!, langId);
        })
      )
      .subscribe((pokemon) => {
        if (pokemon) {
          this.pokemon = pokemon;
          this.weaknesses = TypeUtils.calculateWeaknesses(pokemon.pokemontypes);
        }
      });
  }

  public playCry(url: string): void {
    const audio = new Audio(url);
    audio.play();
  }

  public back(): void {
    this.router.navigateByUrl('pokemon');
  }
}
