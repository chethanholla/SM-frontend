import { Component , OnInit} from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit{
  orders: any[] = [];

  constructor(private orderService: OrderService, private router: Router){}

  ngOnInit(): void{
    this.loadOrders();
  }

  loadOrders(): void{
    this.orderService.getOrders().subscribe(orders =>{
      this.orders = orders;
    });
  }

  deleteOrder(id: number): void{
    this.orderService.deleteOrder(id).subscribe(()=>{
      this.loadOrders();
    });
  }

  getOrderHistory(name: string): void{
    this.orderService.getCustomerOrderHistory(name).subscribe(orders => {
      this.orders = orders;
    });
  }

  updateOrder(id: number){
    this.router.navigate([`/orders/new/${id}`]);
  }
}
