import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  
  
  products = [];
  res = [];
  item = [];
  searchValue:string = '';
  results = new BehaviorSubject<any>([]);
  
  constructor(private api: ApiService, private cart: CartService, private router: Router) {}

  ngOnInit(): void {
    
    this.productListing();
    this.debouncingSearch()
  
  }

// product listing / home page
   productListing(){
    this.api.getProduct().subscribe((res) => {
      this.item = res;
    })
  }

  // Debouncing search
  debouncingSearch(){
    this.results.pipe(debounceTime(1000)).subscribe(() => {
      this.res =  this.products.filter(el => el.title.toLowerCase().includes(this.searchValue));
      if(this.searchValue !== ''){
        this.products = this.res
      }else{
        this.products = this.item;
      }
    
     })
  }


  // add to cart
  addtoCart(item: any) {
    this.cart.addtoCart(item);
  }

  // product-details
  onSelect(product: any) {
    this.cart.getProductDetail1(product);
    this.router.navigate(['/home', product.id]);
  }

// Debouncing 
  search(event:any){
     this.searchValue = event.target.value;
    this.results.next(this.searchValue);
    console.log(this.searchValue);
  }
}
