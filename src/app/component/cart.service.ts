import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  taxPrice: number = 13;
  subTotal: number;
  finalPrice: number;
  cartLength = 0;
  shippingPrice: number = 20;


  // Billing Details
  shippingDetails;
  paymentDetails;

  colors: any;

  data: any;
  public cartItemList = [];
  public productList = new BehaviorSubject<any>([]);
  public productDetails = new BehaviorSubject<any>([]);

  constructor() {}



  // product detail

  getData() {
    return this.productDetails.asObservable();
  }



  getProductDetail1(data: any) {
    this.data = data;
    this.productDetails.next(this.data);
  }



  // Add to cart

  cartItems() {
    return this.productList.asObservable();
  }

  addtoCart(product: any) {
    let productExist = this.cartItemList.find(
      (el: any) => el.productId === product.id
    );
    if (productExist) {
      let index = this.cartItemList.indexOf(productExist);
      this.cartItemList[index].productQty += 1;
      this.cartItemList[index].product_Total =
        this.cartItemList[index].productQty *
        this.cartItemList[index].productPrice;
    } else {
      this.cartItemList.push({
        productId: product.id,
        productTitle: product.title,
        productPrice: product.price,
        productImage: product.image,
        productQty: 1,
        productTotal: 0,
        color:this.colors,
        productDesc: product.description,
      });
      this.cartLength =  this.cartItemList.length;
      this.productList.next(this.cartItemList);
    }

  }

  
}
