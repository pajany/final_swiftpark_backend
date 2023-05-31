import { Component,VERSION, Pipe,OnDestroy, OnInit,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder,FormArray ,FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ManagePageService } from '../../_services';
import { ManagePage } from '../../_models/managepage.model';
import { RxwebValidators,RxFormBuilder } from "@rxweb/reactive-form-validators"
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
 
const EMP_PRODUCT: ManagePage = {
  id: undefined,
  pheader:'',
  ptitle:'',
  page_content:'',
  slug:'',
  ch_main_menu:'',
  main_menu_name:'',
};

@Component({
  selector: 'app-managepage-edit',
  templateUrl: './managepage-edit.component.html',
  styleUrls: ['./managepage-edit.component.scss']
})
 
export class ManagepageEditComponent implements OnInit, OnDestroy {

   name = 'Angular ' + VERSION.major;
   data: any = `<p>Hello, world!</p>`;
   //public editor: ClassicEditor;
   pagename="test paragraph";
   public Editor = ClassicEditor;
   mainmanushown: boolean = false ;
   main_menu: boolean =false;

  id: number;
  managepage: ManagePage;
  previous: ManagePage;
  formGroup: FormGroup;
  isLoading$: Observable<boolean>;
  errorMessage = '';
 
  tabs = {
    BASIC_TAB: 0,
    REMARKS_TAB: 1,
    SPECIFICATIONS_TAB: 2
  };
  activeTabId = this.tabs.BASIC_TAB; // 0 => Basic info | 1 => Remarks | 2 => Specifications
  private subscriptions: Subscription[] = [];
  public saveUsername:boolean;
 

  constructor(
    private fb: FormBuilder,
    private managepageservice: ManagePageService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private http: HttpClient,
   
  ) { }

  
  ngOnInit(): void {
    this.isLoading$ = this.managepageservice.isLoading$;
    this.loadProduct();
    KTCkeditor.init(); 
   
  }

  

  loadProduct() {
    const sb = this.route.paramMap.pipe(
      switchMap(params => {
        // get id from URL
        this.id = Number(params.get('id'));
        if (this.id || this.id > 0) {
          return this.managepageservice.getItemById(this.id);
        }
        return of(EMP_PRODUCT);
      }),
      catchError((errorMessage) => {
        this.errorMessage = errorMessage;
        return of(undefined);
      }),
    ).subscribe((res: ManagePage) => {
      if (!res) {
        this.router.navigate(['/managepage'], { relativeTo: this.route });
      }
      console.log("edit data",res);

      if(res.ch_main_menu == 'true' || res.ch_main_menu =='1'){
        this.main_menu= true;
      }

      this.managepage = res;
      this.previous = Object.assign({}, res);
      this.loadForm();
    });
    this.subscriptions.push(sb);
  }

// this function remove all html tags in text
extratHtmlTags(content) {
    return content.replace(/<[^>]*>/g, '');
}
      
    show_mainmanu($event){
      this.mainmanushown  =  $event && $event.target && $event.target.checked;
    }

  loadForm() {
    if (!this.managepage) {
      return;
    }
     
    this.formGroup = this.fb.group({
      page_content: [this.managepage.page_content, Validators.required],
      pheader: [this.managepage.pheader, Validators.required],
      ptitle: [this.managepage.ptitle, Validators.required],
      slug: [this.managepage.slug, Validators.required],
      ch_main_menu: [this.managepage.ch_main_menu, Validators.required],
      main_menu_name: [this.managepage.main_menu_name, Validators.required]
    });
  }

  reset() {
    if (!this.previous) {
      return;
    }
    this.managepage = Object.assign({}, this.previous);
    this.loadForm();
  }

   
  save() {
    
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;	
    }

      // this.formGroup.patchValue({
      //   page_content:$('textarea#editor').val() 
        
      // });
    
      const formValues = this.formGroup.value;
      console.log("get all values",formValues);

      this.managepage = Object.assign(this.managepage, formValues);
      if (this.id) {
        this.edit();
        setTimeout(function() { $("#msgupdate").show().fadeOut(3000); }, 1500);
        
      } else {
        this.create();
        setTimeout(function() { $("#msgadd").show().fadeOut(2500); }, 1500);
      }
    
   
  }

   edit() {
     
    const sbUpdate = this.managepageservice.update(this.managepage).pipe(
      tap(() => this.router.navigate(['/superadmin/managepage'])),
      catchError((errorMessage) => {
        console.error('UPDATE ERROR', errorMessage);
        return of(this.managepage);
      })
    ).subscribe(res => this.managepage = res);
    

    this.subscriptions.push(sbUpdate);
    
  }
  
  create() {
    
    const sbCreate = this.managepageservice.create(this.managepage).pipe(
      tap(() => this.router.navigate(['/superadmin/managepage'])),
      catchError((errorMessage) => {
        console.error('UPDATE ERROR', errorMessage);
        return of(this.managepage);
      })
    ).subscribe(res => this.managepage = res as ManagePage);
    this.subscriptions.push(sbCreate);
  }

  changeTab(tabId: number) {
    this.activeTabId = tabId;
  }

 
  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }

}

var KTCkeditor = function () {
  // Private functions

  var demos = function () {
    var myEditor;
      ClassicEditor
          .create( document.querySelector( '#editor' ) )
          .then( editor => {
            myEditor = editor;  
               
          } )
          .catch( error => {
              //console.error( error );
          } );
  }

  return {
      // public functions
      init: function() {
          demos();
      }
  };
}();

 
// Initialization
$(document).ready(function() {
  KTCkeditor.init(); 
  
});
 
 

  

 