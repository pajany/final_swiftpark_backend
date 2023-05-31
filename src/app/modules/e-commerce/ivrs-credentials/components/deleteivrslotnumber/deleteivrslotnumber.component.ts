import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';
import { ProductsService } from '../../../_services';
import { ivrsService } from '../../../_services';

@Component({
  selector: 'app-deleteivrslotnumber',
  templateUrl: './deleteivrslotnumber.component.html',
  styleUrls: ['./deleteivrslotnumber.component.scss']
})
export class DeleteivrslotnumberComponent implements OnInit, OnDestroy {

  @Input() id: number;
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(private ivrsService: ivrsService, public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  deleteProduct() {
    this.isLoading = true;
    const sb = this.ivrsService.delete(this.id).pipe(
      delay(1000), // Remove it from your code (just for showing loading)
      tap(() => this.modal.close()),
      catchError((err) => {
        this.modal.dismiss(err);
        return of(undefined);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe();
    this.subscriptions.push(sb);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
