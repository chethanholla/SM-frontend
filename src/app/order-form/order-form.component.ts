import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { CustomerService } from '../services/customer.service';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { Customer } from '../models/customer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit{

  orderForm: FormGroup;
  orderId: number;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.orderForm = this.fb.group({
      quantity:[0, [Validators.required, Validators.min(0)]],
      product:[null, Validators.required],
      customer:[null, Validators.required]
    });
  }

  ngOnInit(): void{
    this.route.params.subscribe(params =>{
      this.orderId = params['id'];
      if(this.orderId){
        this.orderId = params['id'];
        this.isEditMode = true;
        this.loadOrder(this.orderId);
      }
    });
  }

  loadOrder(id: number){
    this.orderService.getOrder(id).subscribe(order => {
      this.orderForm.patchValue({
        quantity: order.quantity,
        product: order.product.id,
        customer: order.customer.id
      });
    });
  }

  onSubmit(){
    if(this.orderForm.valid){
      const formValue = this.orderForm.value;
      const order = {
        quantity: formValue.quantity,
        product: { id:formValue.product },
        customer: { id:formValue.customer }
      };

      if(this.isEditMode && this.orderId){
        this.orderService.updateOrder(this.orderId, order).subscribe(()=>{
          this.router.navigate(['/orders']);
        });
      }else{
        this.orderService.createOrder(order).subscribe(()=>{
          this.router.navigate(['/orders']);
        });
      }
    }
  }

  cancel(): void{
    this.router.navigate(['/customers']);
  }
}
