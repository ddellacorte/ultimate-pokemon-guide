import { Component } from '@angular/core';
import { NavbarService } from './navbar.service';
import { NavItem } from './models/navitem';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  
  public items: NavItem[] = [];

  constructor(private readonly navbarService: NavbarService) {
    this.items = this.navbarService.getItems();
  }

}
