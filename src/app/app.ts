import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loader } from './shared/components/loader/loader';
import { Navbar } from './shared/components/navbar/navbar';
import { Observable } from 'rxjs';
import { LoaderService } from './shared/components/loader/loader.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [Navbar, RouterOutlet, Loader, AsyncPipe],
  styleUrl: './app.scss',
})
export class App {
  public loading$ = new Observable<boolean>();

  constructor(private loader: LoaderService) {
    this.loading$ = this.loader.loading$;
  }
}
