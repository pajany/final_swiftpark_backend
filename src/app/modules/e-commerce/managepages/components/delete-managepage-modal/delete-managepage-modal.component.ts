import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';
import { ProductsService } from '../../../_services';
import { ManagePageService } from '../../../_services';

@Component({
  selector: 'app-delete-managepage-modal',
  templateUrl: './delete-managepage-modal.component.html',
  styleUrls: ['./delete-managepage-modal.component.scss']
})
export class DeleteManagepageModalComponent implements OnInit, OnDestroy {

  @Input() id: number;
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(private managepageService: ManagePageService, public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  deleteProduct() {
    this.isLoading = true;
    const sb = this.managepageService.delete(this.id).pipe(
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
