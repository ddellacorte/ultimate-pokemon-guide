import { Injectable } from '@angular/core';
import { NavItem, NavItemElement } from './models/navitem';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private navItem$ = new BehaviorSubject<NavItemElement>(NavItemElement.POKEMON);

  private readonly items: NavItem[] = Object.values(NavItemElement).map((element) => ({
    label: element,
    image: `images/${element}-icon.png`, // costruisci dinamicamente il path dell’immagine
    action: () => {this.navItem$.next(element); console.log({element});
    },
  }));

  public getItems(): NavItem[] {
    return this.items;
  }

  public getSelectedItem$(): Observable<NavItemElement> {
    return this.navItem$.asObservable();
  }
}
