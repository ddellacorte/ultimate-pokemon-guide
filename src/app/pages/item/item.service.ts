import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { finalize, map, Observable } from 'rxjs';
import { LoaderService } from '../../shared/components/loader/loader.service';
import {
  CategoryListQueryResult,
  ItemListQueryResult,
} from '../../shared/models/graph-response';
import { FilterUtils } from '../../shared/utils/filter.utils';
import { ItemCategory } from './models/item-category.model';
import { ItemFilter } from './models/item-filter.model';
import { ItemCardDto } from './models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  public constructor(
    private readonly apollo: Apollo,
    private readonly loader: LoaderService
  ) {}

  public getItemListGraph(
    limit: number,
    offset: number,
    languageId: number,
    itemFilter: ItemFilter
  ): Observable<ItemCardDto[]> {
    const whereClause = FilterUtils.buildItemWhereClause(
      languageId,
      itemFilter
    );
    this.loader.start();
    return this.apollo
      .query<ItemListQueryResult>({
        query: gql`
            query {
              itemname(
                limit: ${limit}, 
                offset: ${offset}, 
                where: ${whereClause},
                order_by: {id: asc}
              ) {
                id
                name
                item {
                  itemsprites {
                    sprites
                  }
                  itemattributemaps {
                    item {
                      name
                    }
                    itemattribute {
                      itemattributedescriptions(where: { language_id: { _eq: ${languageId} } }) {
                        description
                      }
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
          if (result.data) return result.data.itemname;
          return [];
        }),
        map((items) => {
          return items.filter((item) =>
            item.item.itemsprites.some(
              (sprite) => sprite.sprites.default !== null
            )
          );
        }),
        finalize(() => this.loader.stop())
      );
  }

  public getCategories(languageId: number): Observable<ItemCategory[]> {
    this.loader.start();
    return this.apollo
      .query<CategoryListQueryResult>({
        query: gql`
          query {
            itemcategory(order_by: { id: asc }) {
              id
              itemcategorynames(where: { language_id: { _eq: ${languageId} } }) {
                name
              }
            }
          }
        `,
      })
      .pipe(
        map((result) => {
          if (result.data) return result.data.itemcategory;
          return [];
        }),
        finalize(() => this.loader.stop())
      );
  }
}
