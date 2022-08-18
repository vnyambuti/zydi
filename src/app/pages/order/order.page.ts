import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  foo: { [k: string]: any; };
  total: any;
  product: any;

  constructor(
    private router:Router,
    private loc:Location,
    private route: ActivatedRoute,
    private nav:NavController,

  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.foo= this.router.getCurrentNavigation().extras.state;
        console.log(this.foo.product);
        this.product=this.foo.product;
        this.total=this.foo.product.cost * this.foo.quantity;
      }
    });
   }

   ionViewWillEnter(){

   }

  ngOnInit() {
  }

  back(){
    this.nav.pop();
   this.loc.back();
  }
}
