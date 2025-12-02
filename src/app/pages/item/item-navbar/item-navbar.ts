import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../../shared/services/language.service';
import { Destroy } from '../../destroy';
import { ItemService } from '../item.service';
import { ItemCategory } from '../models/item-category.model';
import { ItemFilter } from '../models/item-filter.model';

@Component({
  selector: 'app-item-navbar',
  imports: [CommonModule, FormsModule],
  templateUrl: './item-navbar.html',
  styleUrl: './item-navbar.scss',
})
export class ItemNavbar extends Destroy implements OnInit {
  public search = '';
  public categories: ItemCategory[] = [];
  public categoryFilter: number[] = [];

  @Output() public onFilterChange = new EventEmitter<ItemFilter>();

  public constructor(
    private readonly itemService: ItemService,
    private readonly languageService: LanguageService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.itemService
      .getCategories(9)
      .pipe(this.takeUntilDestroy())
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  public addCategoryFilter(categoryId: number): void {
    const index = this.categoryFilter.indexOf(categoryId);
    if (index === -1) {
      this.categoryFilter.push(categoryId);
    } else {
      this.categoryFilter.splice(index, 1);
    }
  }

  public applyFilter(): void {
    const filter: ItemFilter = {};
    if (this.categoryFilter.length > 0) {
      filter.categories = this.categoryFilter;
    }
    if (this.search.trim().length > 0) {
      filter.search = this.search.trim();
    }
    this.onFilterChange.emit(filter);
  }

  public clearFilters(): void {
    this.categoryFilter = [];
    this.search = '';
    this.applyFilter();
  }

  public get filterCounter(): number {
    return (
      // this.generationFilter.length +
      // this.typeFilter.length +
      this.categoryFilter.length + (this.search.trim().length > 0 ? 1 : 0)
    );
  }
}
