import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { ApiService } from '../api.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productId: any;
  public product: any = [];

  model: FormGroup;

  

  color = ["Red", "Green", "Blue", "White"];

  constructor(
    private route: ActivatedRoute,
    private cart: CartService
  ) {}

  ngOnInit(): void {

    this.model = new FormGroup({

    })

    this.cart.getData().subscribe((res) => {
      this.product = res;
    });

    this.route.params.subscribe((params: Params) => {
      this.productId = params.id;
    });
  }


// Choose Color 

  changeModel(event:any,id:any){
    let product = this.cart.cartItemList.find((el) => el.productId === id);
    product.color = event.target.value;
  }


  // Add to cart

  addtoCart(item: any) {
    this.cart.addtoCart(item);
  }

}
