import { Directive, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Directive()
export abstract class Destroy implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  protected takeUntilDestroy<T>() {
    return takeUntil<T>(this.destroy$);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
