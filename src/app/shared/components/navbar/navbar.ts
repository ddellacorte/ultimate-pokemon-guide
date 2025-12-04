import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { NavItem } from './models/navitem';
import { NavbarService } from './navbar.service';
import { LanguageDto, LanguageFlag } from '../../models/language.model';
import { Destroy } from '../../../pages/destroy';
import { LanguageService } from '../../services/language.service';
import { LANGUAGES } from '../../utils/constants';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar extends Destroy implements OnInit {
  public items: NavItem[] = [];
  public languageDtos: LanguageDto[] = [];
  public languages: LanguageFlag[] = LANGUAGES;
  public currentRoute?: string;

  constructor(
    public readonly languageService: LanguageService,
    private readonly navbarService: NavbarService,
    private readonly router: Router
  ) {
    super();
    this.items = this.navbarService.getItems();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((route) => {
        this.currentRoute = route.urlAfterRedirects;
      });
  }

  public ngOnInit(): void {
    this.languageService
      .getLanguageListGraph()
      .pipe(this.takeUntilDestroy())
      .subscribe((languages) => {
        this.languageDtos = languages;
      });
  }

  public translate(language: LanguageDto): void {
    this.languageService.translate(language.id);
  }

  public getFlag(id: number): string {
    const lang = LANGUAGES.find(lang => lang.id === id);
    return lang ? lang.flags[0] : 'en';
  }
}
