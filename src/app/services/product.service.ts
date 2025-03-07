import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/product';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]>{
      return this.http.get<Product[]>(`${this.baseUrl}`);
    }

    getProduct(id: number):Observable<Product>{
      return this.http.get<Product>(`${this.baseUrl}/${id}`)
    }

    createProduct(product: Product):Observable<Product>{
      return this.http.post<Product>(`${this.baseUrl}`,product);
    }

    updateProduct(id: number, product: Product):Observable<Product>{
          return this.http.put<Product>(`${this.baseUrl}/${product.id}`,product);
        }

    deleteProduct(id: number): Observable<void>{
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    searchProducts(name: string): Observable<Product[]>{
      return this.http.get<Product[]>(`${this.baseUrl}/searchProduct?name=${name}`);
    }
}
