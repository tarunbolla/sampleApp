import { Component, OnInit, Input } from '@angular/core';
import { Router,
         ActivatedRoute, } from '@angular/router';
import { Location }        from '@angular/common';
import { OrderService }    from 'src/app/services/order.service';
import { Order } from 'src/app/classes/order.class';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.scss']
})
export class OrderAddComponent implements OnInit {
  
  order: Order;

    customer = new FormControl('');
    total = new FormControl('');
    items = new FormControl('');
    id = new FormControl('');
    timestamp = new FormControl('');

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}


  ngOnInit() {
    /*this.orderService.getOrderList().subscribe(data => {
      this.orders = data;
      console.log(data)
    }, error => {
      console.error(error);
    });
    */
    let randomID = "R" + (Math.random() + "").substring(2, 10)
    this.id.setValue(randomID);
    this.order = {} as Order;
    this.order.id = this.id.value;
  }  
  
  public addOrder() {
    this.order.customer = this.customer.value;
    this.order.items = this.items.value;
    this.order.total = this.total.value;
    this.order.timestamp = this.timestamp.value;

    this.orderService.addOrder(this.order)
      .subscribe(() => this.navigateBack());
  }

  public navigateBack() {
    this.location.back();
  }

}
