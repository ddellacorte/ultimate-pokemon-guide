import { Component } from '@angular/core';
import { NavbarService } from './navbar.service';
import { NavItem } from './models/navitem';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  
  public items: NavItem[] = [];
  public currentRoute?: string;

  constructor(private readonly navbarService: NavbarService, private readonly router: Router) {
    this.items = this.navbarService.getItems();
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((route) => {
      this.currentRoute = route.urlAfterRedirects;
    });
  }

}
