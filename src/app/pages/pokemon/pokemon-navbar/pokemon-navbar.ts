import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonFilter } from '../models/pokemon-filter.model';
import { GENERATIONS, TYPES } from '../../../shared/utils/constants';
import { Generation } from '../../../shared/models/generation.model';
import { Type } from '../../../shared/models/type';

@Component({
  selector: 'app-pokemon-navbar',
  imports: [CommonModule, FormsModule],
  templateUrl: './pokemon-navbar.html',
  styleUrl: './pokemon-navbar.scss',
})
export class PokemonNavbar {
  public generations: Generation[] = GENERATIONS;
  public types: Type[] = TYPES;
  public search = '';
  public generationFilter: string[] = [];
  public typeFilter: string[] = [];

  @Output() public onFilterChange = new EventEmitter<PokemonFilter>();

  public addGenerationFilter(gen: string): void {
    const index = this.generationFilter.indexOf(gen);
    if (index === -1) {
      this.generationFilter.push(gen);
    } else {
      this.generationFilter.splice(index, 1);
    }
  }

  public addTypeFilter(type: string): void {
    const index = this.typeFilter.indexOf(type);
    if (index === -1) {
      this.typeFilter.push(type);
    } else {
      this.typeFilter.splice(index, 1);
    }
  }

  public applyFilter(): void {
    const filter: PokemonFilter = {};
    if (this.generationFilter.length > 0) {
      filter.generations = this.generationFilter;
    }
    if (this.typeFilter.length > 0) {
      filter.types = this.typeFilter;
    }
    if (this.search.trim().length > 0) {
      filter.search = this.search.trim();
    }
    this.onFilterChange.emit(filter);
  }

  public clearFilters(): void {
    this.generationFilter = [];
    this.typeFilter = [];
    this.search = '';
    this.applyFilter();
  }

  public get filterCounter(): number {
    return (
      this.generationFilter.length +
      this.typeFilter.length +
      (this.search.trim().length > 0 ? 1 : 0)
    );
  }
}
