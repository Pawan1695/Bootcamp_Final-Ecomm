import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
 
  cartDetails: FormGroup;

  totalPrice: number = 0;
  subTotal: number = 0;
  taxPrice: number = 13;
  coupon: any;
  shipping =  'Free';
  process: any = 1;
  public product: any = [];
  value: string;

  constructor(private api: ApiService, private cart: CartService,private router:Router) {}

  // form submit

  onSubmit(): void {
    this.process = this.process + 1;
    console.log(this.cart.cartItemList);
  }

  // back to home /listing page
  homePage(){
    this.product = [];
    this.router.navigate(['/']);
  }


  // change page from shipping to payment
  onShipping(process: number) {
    this.process = process;
  }

  // Back To Cart Page
  BackToCart(itemChange:number){
  this.process = itemChange;
  }

  ngOnInit(): void {
    this.cartDetails = new FormGroup({});

    this.product = this.cart.cartItemList;
    this.product.map((res) => {
      res.productTotal = res.productPrice * res.productQty;
    });

    if (this.product){
       this.getTotal();
      }
  }

  // Calculate Price on quantity Change
  productTotal(val: any, price: any, id: any) {
    let product = this.cart.cartItemList.find((el: any) => el.productId === id);
    price = val * price;
    product.productTotal = price;
    this.getTotal();
  }

  // Total price of Products
  getTotal() {
    const result = this.cart.cartItemList.reduce(
      (sum, { productTotal }) => sum + productTotal,0);
    this.subTotal = Math.round(result);

    this.cart.subTotal = this.subTotal;

    this.totalPrice = Math.round(this.subTotal + this.taxPrice);

    this.cart.finalPrice = this.totalPrice;
  }


  // Shipping Charges
  onPaidShipping(shipPrice: number) {
    this.totalPrice =  shipPrice;
    this.cart.finalPrice = this.totalPrice;
    
  }

  // Coupon Code
  couponCode() {
    if (this.coupon === 'BOOTCAMP2021') {
      let couponPrice = (this.totalPrice * 10) / 100;
      this.totalPrice = Math.round(this.totalPrice - couponPrice);
      this.value = "Your Coupon is applied";
    } else {
      this.value = 'Your Coupon code is not valid';
    }
  }
}
