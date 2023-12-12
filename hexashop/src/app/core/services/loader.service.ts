import { Injectable } from '@angular/core';
import { Subject, distinctUntilChanged, filter, map, share, switchMap } from 'rxjs';
import { CategoryService } from 'src/app/admin-panel/services/category.service';
import { ProductsService } from 'src/app/admin-panel/services/products.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private readonly load$ = new Subject<void>();

  private readonly response$ = this.load$.pipe(
    // switchMap(() => this.loadingService.load()),
    share()
  );

  readonly result$ = this.response$.pipe(
    map(response => (typeof response === "string" ? response : null)),
    distinctUntilChanged()
  );

  readonly loadingProgress$ = this.response$.pipe(filter(Number.isFinite));


  constructor(private loadingService: LoadingService) { }
}
