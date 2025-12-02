import { Component, OnInit } from '@angular/core';
import { NatureDto } from './models/nature.model';
import { NatureService } from './nature.service';
import { LanguageService } from '../../shared/services/language.service';
import { Destroy } from '../destroy';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-nature',
  imports: [],
  templateUrl: './nature.html',
  styleUrl: './nature.scss',
})
export class Nature extends Destroy implements OnInit {
  public natures: NatureDto[] = [];

  public constructor(
    private readonly natureService: NatureService,
    private readonly languageService: LanguageService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.languageService.lang$
      .pipe(
        this.takeUntilDestroy(),
        switchMap((langId) => {
          return this.natureService.getNatureListGraph(langId);
        })
      )
      .subscribe((result: NatureDto[] | undefined) => {
        if (result) this.natures = result;
      });
  }
}
