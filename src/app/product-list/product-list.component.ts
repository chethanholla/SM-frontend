import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService){}

  ngOnInit(): void{
      this.loadProducts();
    }

    loadProducts(): void{
      this.productService.getProducts().subscribe(products =>{
        this.products = products;
      });
    }

    deleteProduct(id: number): void{
      this.productService.deleteProduct(id).subscribe(()=>{
        this.loadProducts();
      });
    }

    searchProducts(name: string): void{
      this.productService.searchProducts(name).subscribe(products => {
        this.products = products;
      });
    }

    selectProduct(product: Product): void{
        this.selectedProduct = {...product};
    }

      onSubmit(): void{
        if(this.selectedProduct){
          this.productService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe((data)=>{
            console.log('Product updated successfully', data);
            this.loadProducts();
            this.selectedProduct = null;
          },
          (error) => {
            console.error('Error updating Product',error);
          }
        );
      }
      }

      cancelUpdate(): void{
        this.selectedProduct = null;
      }
}
