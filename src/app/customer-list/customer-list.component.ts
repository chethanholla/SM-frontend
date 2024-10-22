import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit{
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;

  constructor(private customerService: CustomerService){}

  ngOnInit(): void{
    this.loadCustomers();
  }

  loadCustomers(): void{
    this.customerService.getCustomers().subscribe(customers =>{
      this.customers = customers;
    });
  }

  deleteCustomer(id: number): void{
    this.customerService.deleteCustomer(id).subscribe(()=>{
      this.loadCustomers();
    });
  }

  selectCustomer(customer: Customer): void{
    this.selectedCustomer = {...customer};
  }

  onSubmit(): void{
    if(this.selectedCustomer){
      this.customerService.updateCustomer(this.selectedCustomer.id, this.selectedCustomer).subscribe((data)=>{
        console.log('Customer updated successfully', data);
        this.loadCustomers();
        this.selectedCustomer = null;
      },
      (error) => {
        console.error('Error updating customer',error);
      }
    );
  }
  }

  cancelUpdate(): void{
    this.selectedCustomer = null;
  }

  searchCustomers(name: string): void{
    this.customerService.searchCustomers(name).subscribe(customers => {
      this.customers = customers;
    });
  }
}
