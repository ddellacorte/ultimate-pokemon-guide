<<<<<<< HEAD:src/app/pages/pokemon/pokemon-info/pokemon-info.ts
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
=======
import {
  CommonModule,
  isPlatformBrowser,
  UpperCasePipe,
} from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DividePipe } from '../../../pipes/divide.pipe';
import { PadNumberPipe } from '../../../pipes/pad-number.pipe';
import { Destroy } from '../../destroy';
import { PokemonDto } from '../models/pokemon.model';
import { PokemonService } from '../pokemon.service';

declare var bootstrap: any;

@Component({
  selector: 'app-pokemon-info',
  imports: [UpperCasePipe, PadNumberPipe, CommonModule, DividePipe],
  templateUrl: './pokemon-info.html',
  styleUrl: './pokemon-info.scss',
})
export class PokemonInfo extends Destroy implements OnInit {
  public pokemon?: PokemonDto;

  public constructor(
    private readonly router: Router,
    private readonly pokemonService: PokemonService,
    private readonly route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    super();
  }

  public ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    if (id)
      this.pokemonService
        .getPokemonGraph(id)
        .pipe(this.takeUntilDestroy())
        .subscribe((pokemon) => {
          this.pokemon = pokemon;
          this.initTooltips();
        });
  }

  private initTooltips(): void {
    if (isPlatformBrowser(this.platformId)) {
      const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
      );
      const tooltipList = [...tooltipTriggerList].map(
        (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
      );
    }
  }

  public back(): void {
    this.router.navigateByUrl('pokemon');
  }
}
>>>>>>> 593f8b1 (feat(pokemon): enhance Pokemon info display with new attributes and shiny toggle):src/app/components/pokemon/pokemon-info/pokemon-info.ts
