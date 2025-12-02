import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LanguageListQueryResult } from '../models/graph-response';
import { LanguageDto } from '../models/language.model';

/*
{
    "id": 1,
    "name": "ja-Hrkt",
},
{
    "id": 2,
    "name": "roomaji",
},
{
    "id": 3,
    "name": "ko",
},
{
    "id": 4,
    "name": "zh-Hant",
},
{
    "id": 5,
    "name": "fr",
},
{
    "id": 6,
    "name": "de",
},
{
    "id": 7,
    "name": "es",
},
{
    "id": 8,
    "name": "it",
},
{
    "id": 9,
    "name": "en",
},
{
    "id": 10,
    "name": "cs",
},
{
    "id": 11,
    "name": "ja",
},
{
    "id": 12,
    "name": "zh-Hans",
},
{
    "id": 13,
    "name": "pt-BR",
}
*/

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private _lang$ = new BehaviorSubject<number>(9);

  public constructor(private readonly apollo: Apollo) {}

  public getLanguageListGraph(): Observable<LanguageDto[]> {
    return this.apollo
      .query<LanguageListQueryResult>({
        query: gql`
          query {
            language(order_by: { id: asc }) {
              id
              name
            }
          }
        `,
      })
      .pipe(
        map((result) => {
          if (result.data) return result.data.language;
          return [];
        })
      );
  }

  public translate(langId: number): void {
    this._lang$.next(langId);
  }

  public get lang$(): Observable<number> {
    return this._lang$.asObservable();
  }

  public get lang(): number {
    return this._lang$.value;
  }
}
