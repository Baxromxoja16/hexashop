import { Directive, HostListener, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/admin-panel/services/products.service';

@Directive({
  selector: '[appScrollListener]',
})
export class ScrollListenerDirective implements OnDestroy{
  @Input() isLoading: boolean = false;
  @Input() isLast: boolean = false;
  @Input() loadData!: () => void;

  private subscription: Subscription = new Subscription();

  constructor(private productsService: ProductsService) {}


  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (!this.isLoading && !this.isLast) {
      const scrolling =
        window.innerHeight + document.documentElement.scrollTop;
      const conditionScroll =
        scrolling >= (document.scrollingElement?.scrollHeight as number);

      if (conditionScroll) {
        this.subscription.add(this.loadData());
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
