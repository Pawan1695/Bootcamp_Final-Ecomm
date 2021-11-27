import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentDetails: FormGroup;

  constructor(private cart: CartService, private router: Router) {}


  // onSubmit
  onSubmit() {
    this.cart.paymentDetails = this.paymentDetails.value;
    this.router.navigate(['/placedOrder']);
    console.log(this.paymentDetails.value);
  }

  // Back To Home Page
  listingPage(){
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.paymentDetails = new FormGroup({
      pay: new FormControl('creditCard', Validators.required),
      cardNumber: new FormControl('', Validators.required),
      expMonth: new FormControl('', Validators.required),
      cvv: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
    });
  }
}
