import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-placed-order',
  templateUrl: './placed-order.component.html',
  styleUrls: ['./placed-order.component.css'],
})
export class PlacedOrderComponent implements OnInit {
  constructor(private cart: CartService) {}

  productList: any;
  shippingDetails: any;
  paymentDetails: any;
  taxPrice: any;
  subTotal: any;
  finalPrice: any;

  ngOnInit(): void {
    this.productList = this.cart.cartItemList;
    this.shippingDetails = this.cart.shippingDetails;
    this.paymentDetails = this.cart.paymentDetails;
    this.taxPrice = this.cart.taxPrice;
    this.subTotal = this.cart.subTotal;
    this.finalPrice = this.cart.finalPrice;

  }

  // Cart Length Change
  changeCart(){
    this.cart.cartLength = 0;
    this.cart.cartItemList = [];
  }

 
}
