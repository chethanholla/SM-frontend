import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;
  productId: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.productForm = this.fb.group({
      id:[0],
      name:['', Validators.required],
      price:[0,[Validators.required,Validators.min(0.01)]],
      quantity:[0,[Validators.required,Validators.min(0)]]
    });
  }

  ngOnInit(): void{
    this.route.params.subscribe(params =>{
      this.productId = params['id'];
      if(this.productId){
        this.productService.getProduct(this.productId).subscribe(product => {
          this.productForm.patchValue(product);
        });
      }
    });
  }

  saveProduct(): void{
    if(this.productForm.valid){
      this.productService.createProduct(this.productForm.value).subscribe(()=>{
        this.router.navigate(['/products']);
      });
    }
  }

  cancel(): void{
    this.router.navigate(['/products']);
  }
}
