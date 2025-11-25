import { NavigationBehaviorOptions, Router, UrlTree } from '@angular/router';
import { LoaderService } from '../components/loader/loader.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CustomRouter extends Router {
  public constructor(private readonly loader: LoaderService) {
    super();
  }
  public override async navigateByUrl(
    url: string | UrlTree,
    extras?: NavigationBehaviorOptions
  ): Promise<boolean> {
    this.loader.start();
    return super.navigateByUrl(url, extras);
  }
}
