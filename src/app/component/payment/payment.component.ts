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
      cardNumber: new FormControl('',[Validators.required, Validators.minLength(16), Validators.min(1111111111111111), Validators.max(9999999999999999)]),
      expMonth: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.min(1), Validators.max(12)]),
      expYear : new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.min(1111), Validators.max(9999)]),
      cvv: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.min(111), Validators.max(999)]),
      username: new FormControl('', Validators.required),
    });
  }
}
