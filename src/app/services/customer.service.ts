import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
    private baseUrl = 'http://localhost:8080/customer';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(`${this.baseUrl}`);
  }

  getCustomer(id: number):Observable<Customer>{
    return this.http.get<Customer>(`${this.baseUrl}/${id}`)
  }

  createCustomer(customer: Customer):Observable<Customer>{
    return this.http.post<Customer>(`${this.baseUrl}`,customer);
  }

  updateCustomer(id: number, customer: Customer):Observable<Customer>{
    return this.http.put<Customer>(`${this.baseUrl}/${id}`,customer);
  }

  deleteCustomer(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  searchCustomers(name: string): Observable<Customer[]>{
        return this.http.get<Customer[]>(`${this.baseUrl}/searchCustomer?name=${name}`);
      }
}
