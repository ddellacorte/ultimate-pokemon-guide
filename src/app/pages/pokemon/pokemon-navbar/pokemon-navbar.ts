import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Generation } from '../../../shared/models/generation.model';
import { ColorType } from '../../../shared/models/type';
import { GENERATIONS, TYPES } from '../../../shared/utils/constants';
import { PokemonFilter } from '../models/pokemon-filter.model';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-navbar',
  imports: [CommonModule, FormsModule],
  templateUrl: './pokemon-navbar.html',
  styleUrl: './pokemon-navbar.scss',
})
export class PokemonNavbar {
  public generations: Generation[] = GENERATIONS;
  public types: ColorType[] = TYPES;
  public filter$: Observable<PokemonFilter>;
  public selectedFilter: PokemonFilter = {};
  private _shiny = false;
  private _search = '';

  public set shiny(v: boolean) {
    this._shiny = v;
    this.onShinyChange.emit(v);
  }

  public set search(v: string) {
    this._search = v;
    this.pokemonService.addSearchFilter(v);
  }

  @Output() public onShinyChange = new EventEmitter<boolean>();

  public constructor(private readonly pokemonService: PokemonService) {
    this.filter$ = this.pokemonService.filterImmediate$;
  }

  public addGenerationFilter(gen: string): void {
    this.pokemonService.toggleGeneration(gen);
  }

  public addTypeFilter(type: string): void {
    this.pokemonService.toggleType(type);
  }

  public clearFilters(): void {
    this.search = '';
    this.pokemonService.clearFilters();
  }
}
