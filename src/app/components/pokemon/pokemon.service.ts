import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { POKEAPIURL } from '../../constants';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { PokemonDto } from './models/pokemon.model';

interface PokemonResponse {
  count: number;
  next: string;
  previous: string;
  results: PokemonResultResponse[];
}

interface PokemonResultResponse {
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  
  public constructor(private readonly http: HttpClient) {}

  public getPokemonList(limit: number, offset: number): Observable<PokemonDto[]> {
    return this.http.get<PokemonResponse>(`${POKEAPIURL}/pokemon?limit=${limit}&offset=${offset}`).pipe(
      switchMap(response => {
        const pokemonDetails$ = response.results.map(pokemon => 
          this.http.get<PokemonDto>(pokemon.url)
        );
        return forkJoin(pokemonDetails$);
      })
    );
  }
}
