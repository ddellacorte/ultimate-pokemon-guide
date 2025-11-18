import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pokemon-navbar',
  imports: [CommonModule],
  templateUrl: './pokemon-navbar.html',
  styleUrl: './pokemon-navbar.scss',
})
export class PokemonNavbar {
  public generationFilter: string[] = [];
  public typeFilter: string[] = [];

  public addGenerationFilter(gen: string): void {
    const index = this.generationFilter.indexOf(gen);
    if (index === -1) {
      this.generationFilter.push(gen);
    } else {
      this.generationFilter.splice(index, 1);
    }
  }

  public addTypeFilter(type: string): void {
    console.log(type);
    
    const index = this.typeFilter.indexOf(type);
    if (index === -1) {
      this.typeFilter.push(type);
    } else {
      this.typeFilter.splice(index, 1);
    }
  }
}
