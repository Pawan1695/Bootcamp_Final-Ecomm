import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css'],
})
export class ShippingComponent implements OnInit {
  shippingDetails: FormGroup;

  itemChange = 1;
  

  @Output() process = new EventEmitter<number>();
  @Output() shipping = new EventEmitter<number>();
  @Output() cartPage = new EventEmitter<number>();

  constructor(private cart: CartService,private router:Router) {}



  onSubmit() {
    this.process.emit(3);
    this.cart.shippingDetails = this.shippingDetails.value;
  }


  ngOnInit(): void {
    this.shippingDetails = new FormGroup({
      first: new FormControl(null, Validators.required),
      last: new FormControl(null),
      address: new FormControl(null, Validators.required),
      address2: new FormControl(null),
      country: new FormControl('India', Validators.required),
      city: new FormControl(null, Validators.required),
      zip: new FormControl(null),
      phone: new FormControl(null),
      shipping: new FormControl('0', Validators.required),
    });
  }


  //  Back to Cart Page

  backToCart(){
    this.cartPage.emit(this.itemChange);
  }

  // free shipping

  freeshipping() {
    this.shipping.emit(this.cart.finalPrice - 20);
    console.log("free")
  }

  // paid shipping

  paidshipping() {
    this.shipping.emit(this.cart.finalPrice + 20);
  }
}
