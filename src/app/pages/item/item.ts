import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { LanguageService } from '../../shared/services/language.service';
import { Destroy } from '../destroy';
import { ItemService } from './item.service';
import { ItemCardDto } from './models/item.model';
import { ItemNavbar } from './item-navbar/item-navbar';
import { ItemFilter } from './models/item-filter.model';

@Component({
  selector: 'app-item',
  imports: [TitleCasePipe, ItemNavbar],
  templateUrl: './item.html',
  styleUrl: './item.scss',
})
export class Item extends Destroy implements OnInit {
  public items: ItemCardDto[] = [];
  public itemFilter: ItemFilter = {};

  public constructor(
    private readonly itemService: ItemService,
    private readonly languageService: LanguageService,
    private readonly router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    this.getItems();
  }

  public search(filter: ItemFilter): void {
    this.itemFilter = filter;
    this.getItems();
  }

  public selectItem(item: ItemCardDto): void {
    this.router.navigateByUrl(`item/${item.id}`);
  }

  private getItems(): void {
    this.languageService.lang$
      .pipe(
        this.takeUntilDestroy(),
        switchMap((langId) => {
          return this.itemService.getItemListGraph(
            150,
            0,
            langId,
            this.itemFilter
          );
        })
      )
      .subscribe((result: ItemCardDto[] | undefined) => {
        if (result) this.items = result;
      });
  }
}
