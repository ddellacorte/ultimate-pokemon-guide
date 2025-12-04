import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { finalize, map, Observable } from 'rxjs';
import { LoaderService } from '../../shared/components/loader/loader.service';
import { NatureListQueryResult } from '../../shared/models/graph-response';
import { NatureDto } from './models/nature.model';

@Injectable({
  providedIn: 'root',
})
export class NatureService {
  public constructor(
    private readonly apollo: Apollo,
    private readonly loader: LoaderService
  ) {}

  public getNatureListGraph(languageId: number): Observable<NatureDto[]> {
    this.loader.start();
    return this.apollo
      .query<NatureListQueryResult>({
        query: gql`
          query {
            naturename(
              where: { language_id: { _eq: ${languageId} } }
              order_by: { id: asc }
            ) {
              id
              name
              nature {
                StatByIncreasedStatId {
                  statnames(where: { language_id: { _eq: ${languageId} } }) {
                    name
                  }
                }
                stat {
                  statnames(where: { language_id: { _eq: ${languageId} } }) {
                    name
                  }
                }
              }
            }
          }
        `,
      })
      .pipe(
        map((result) => {
          if (result.data) return result.data.naturename;
          return [];
        }),
        finalize(() => this.loader.stop())
      );
  }
}
