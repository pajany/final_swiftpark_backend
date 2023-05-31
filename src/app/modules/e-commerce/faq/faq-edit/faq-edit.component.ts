import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,FormArray ,FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Product } from '../../_models/product.model';
import { Managefaq } from '../../_models/Managefaq.model';
import { ProductsService } from '../../_services';
import { ManagefaqService } from '../../_services/Managefaq.service';
import { RxwebValidators,RxFormBuilder } from "@rxweb/reactive-form-validators"
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

const EMPTY_FAQ: Managefaq = {
  id: undefined,
  faq_question: '',
  faq_answer:''
};

@Component({
  selector: 'app-faq-edit',
  templateUrl: './faq-edit.component.html',
  styleUrls: ['./faq-edit.component.scss']
})
export class FaqEditComponent implements OnInit {

  id: number;
  managefaq: Managefaq;
  previous: Managefaq;
  faqForm: FormGroup;
  isLoading$: Observable<boolean>;
  errorMessage = '';
  faqdata:any;

  private subscriptions: Subscription[] = [];
  constructor(
    private fb: FormBuilder,
    private managefaqService: ManagefaqService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private http: HttpClient,
  ) { 
    this.faqForm = this.fb.group({
      quantities: this.fb.array([]) ,
    });

  }

  ngOnInit(): void {
    this.isLoading$ = this.managefaqService.isLoading$;
     this.loadFaq();
  }

  loadFaq() {
    const sb = this.route.paramMap.pipe(
      switchMap(params => {
        // get id from URL
        this.id = Number(params.get('id'));
        if (this.id || this.id > 0) {
          return this.managefaqService.getItemById(this.id);
        }
        return of(EMPTY_FAQ);
      }),
      catchError((errorMessage) => {
        this.errorMessage = errorMessage;
        return of(undefined);
      }),
    ).subscribe((res: Managefaq) => {
      if (!res) {
        this.router.navigate(['/Managefaq'], { relativeTo: this.route });
      }

      this.managefaq = res;
      this.previous = Object.assign({}, res);
      this.loadForm();
      console.log("edit data",this.managefaq);
       
    });
    this.subscriptions.push(sb);
  }

  loadForm() {
    if (!this.managefaq) {
      return;
    }
    this.faqForm = this.fb.group({
       faq_question: [this.managefaq.faq_question],
       faq_answer: [this.managefaq.faq_answer]
    
    });
  }

  reset() {
    if (!this.previous) {
      return;
    }
    this.managefaq = Object.assign({}, this.previous);
    this.loadForm();
  }

  save() {
  
    this.faqForm.markAllAsTouched();
    // if (!this.formGroup.valid) {
    //   return;	
    // }
    
     // const formValues = this.faqForm.value.quantities;
     const formValues = this.faqForm.value;
     this.managefaq = Object.assign(this.managefaq, formValues);
    
      if (this.id) {
        this.edit();
        setTimeout(function() { $("#msgupdate").show().fadeOut(3000); }, 1500);
        
      } else {
        this.create();
        setTimeout(function() { $("#msgadd").show().fadeOut(2500); }, 1500);
      }

  }

   edit() {
    const sbUpdate = this.managefaqService.update(this.managefaq).pipe(
      tap(() => this.router.navigate(['/superadmin/managefaq'])),
      catchError((errorMessage) => {
        console.error('UPDATE ERROR', errorMessage);
        return of(this.managefaq);
      })
    ).subscribe(res => this.managefaq = res);
    
    this.subscriptions.push(sbUpdate);
    
  }
  
  create() {
    
    const sbCreate = this.managefaqService.create(this.managefaq).pipe(
      tap(() => this.router.navigate(['/superadmin/managefaq'])),
      catchError((errorMessage) => {
        console.error('UPDATE ERROR', errorMessage);
        return of(this.managefaq);
      })
    ).subscribe(res => this.managefaq = res as Managefaq);
    this.subscriptions.push(sbCreate);
  }


   quantities() : FormArray {
     return this.faqForm.get("quantities") as FormArray
   }
    
   newQuantity(): FormGroup {
     return this.fb.group({
      faq_question: '',
      faq_answer: '',
     })
   }
    
   addQuantity() {
     this.quantities().push(this.newQuantity());
   }
    
   removeQuantity(i:number) {
     this.quantities().removeAt(i);
   }
 
   onSubmit() {
     console.log(this.faqForm.value.quantities);
     this.faqdata= this.faqForm.value.quantities;
  
   }
  


}
