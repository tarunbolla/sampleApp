import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Order } from '../../../classes/order.class';
import { OrderService } from '../../../services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {

  order: Order;

  customer = new FormControl('');
  total = new FormControl('');
  items = new FormControl('');
  id = new FormControl('');
  timestamp = new FormControl('');

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private location: Location
  ) { }


  ngOnInit() {
    const orderID = this.route.snapshot.paramMap.get("id");

    this.orderService.getOrderDetail(orderID)
      .subscribe((order) => {
        this.order = order;
        this.id.setValue(this.order.id);
        this.customer.setValue(this.order.customer);
        this.items.setValue(this.order.items);
        this.total.setValue(this.order.total);
        this.timestamp.setValue(this.order.timestamp);
      });
  }

  public updateOrder() {
    this.order.customer = this.customer.value;
    this.order.items = this.items.value;
    this.order.total = this.total.value;
    this.order.timestamp = this.timestamp.value;

    this.orderService.updateOrder(this.order)
      .subscribe(() => this.navigateBack());
  }

  public navigateBack() {
    this.location.back();
  }

}
