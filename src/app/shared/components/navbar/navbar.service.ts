import { Injectable } from '@angular/core';
import { CustomRouter } from '../../classes/custom-router';
import { NavItem, NavItemElement } from './models/navitem';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  public constructor(private readonly router: CustomRouter) {}

  private readonly items: NavItem[] = Object.values(NavItemElement).map(
    (element) => ({
      label: element,
      image: `images/${element}-icon.png`, // costruisci dinamicamente il path dell’immagine
      action: () => this.router.navigateByUrl(element.toLowerCase()),
    })
  );

  public getItems(): NavItem[] {
    return this.items;
  }
}
