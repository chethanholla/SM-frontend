import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent implements OnInit{

  customerForm: FormGroup;
  customerId: number;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.customerForm = this.fb.group({
      id:[0],
      name:['', Validators.required],
      email:['', Validators.required]
    });
  }

  ngOnInit(): void{
    this.route.params.subscribe(params =>{
      this.customerId = params['id'];
      if(this.customerId){
        this.customerService.getCustomer(this.customerId).subscribe(customer => {
          this.customerForm.patchValue(customer);
        });
      }
    });
  }

  saveCustomer(): void{
    if(this.customerForm.valid){
      this.customerService.createCustomer(this.customerForm.value).subscribe(()=>{
        this.router.navigate(['/customers']);
      });
    }
  }

  cancel(): void{
    this.router.navigate(['/customers']);
  }
}
