import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8080/order';

    constructor(private http: HttpClient) { }

    getOrders(): Observable<Order[]>{
      return this.http.get<Order[]>(`${this.baseUrl}`);
    }

    getOrder(id: number):Observable<Order>{
      return this.http.get<Order>(`${this.baseUrl}/${id}`)
    }

    createOrder(order: Order):Observable<Order>{
      return this.http.post<Order>(`${this.baseUrl}`,order);
    }

    updateOrder(id: number, order: Order):Observable<Order>{
      return this.http.put<Order>(`${this.baseUrl}/update/${id}`,order);
    }

    deleteOrder(id: number): Observable<void>{
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    getCustomerOrderHistory(name: string): Observable<Order[]> {
      return this.http.get<Order[]>(`${this.baseUrl}/history?name=${name}`);
    }
}
