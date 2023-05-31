import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';
import { BplateService } from '../../../_services';


@Component({
  selector: 'app-delete-bplate-modal',
  templateUrl: './delete-bplate-modal.component.html',
  styleUrls: ['./delete-bplate-modal.component.scss']
})
export class DeleteBplateModalComponent implements OnInit, OnDestroy {
  @Input() id: number;
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(private bplateService: BplateService, public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  deleteBplate() {
    this.isLoading = true;
    const sb = this.bplateService.delete(this.id).pipe(
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
