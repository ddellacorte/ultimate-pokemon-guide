import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Ability } from './components/ability/ability';
import { Item } from './components/item/item';
import { Move } from './components/move/move';
import { Nature } from './components/nature/nature';
import { NavItemElement } from './components/navbar/models/navitem';
import { Navbar } from './components/navbar/navbar';
import { NavbarService } from './components/navbar/navbar.service';
import { Pokemon } from './components/pokemon/pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [Navbar, AsyncPipe, Pokemon, Nature, Move, Ability, Item],
  styleUrl: './app.scss',
})
export class App {
  public navItem$: Observable<NavItemElement>;

  public constructor(private readonly navbar: NavbarService) {
    this.navItem$ = this.navbar.getSelectedItem$();
  }
}
