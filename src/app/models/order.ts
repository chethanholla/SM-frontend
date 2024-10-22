import { Customer } from './customer';
import { Product } from './product';

export class Order{
id?: number;
quantity: number;
product: {id: number};
customer: {id: number};
}
