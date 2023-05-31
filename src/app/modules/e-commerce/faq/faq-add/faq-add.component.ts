import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-faq-add',
  templateUrl: './faq-add.component.html',
  styleUrls: ['./faq-add.component.scss']
})
export class FaqAddComponent implements OnInit {

  ngOnInit(): void {
  }

  API_URL = `${environment.apiUrl}/dynamicaddfaq`;
  
  productForm: FormGroup;
   
  constructor(private fb:FormBuilder,private http: HttpClient,private router: Router,) {
   
    this.productForm = this.fb.group({

      quantities: this.fb.array([]) ,
    });
  }
  
  
  quantities() : FormArray {
    return this.productForm.get("quantities") as FormArray
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
    console.log(this.productForm.value);
    if (this.productForm.value != "") {

      this.http.post(this.API_URL, this.productForm.value.quantities).subscribe((data: any) => {
  
        this.router.navigate(['/superadmin/managefaq']);
      });
    }

  }
}
