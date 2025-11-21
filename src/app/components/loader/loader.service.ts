import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loading$ = new BehaviorSubject<boolean>(false);

  public start(): void {
    this._loading$.next(true);
  }

  public stop(): void {
    this._loading$.next(false);
  }

  public get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }
}
