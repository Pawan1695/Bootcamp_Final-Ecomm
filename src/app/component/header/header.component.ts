import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  totalItem: number = 0;
  constructor(private cart:CartService) { }

  ngOnInit(): void {
      setInterval(() =>
      {
        this.totalItem = this.cart.cartLength;
      },500)
      
    
  }

}
