import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
// import { type } from 'jquery';
import { RestService } from 'src/app/services/rest.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders: any;

  constructor(
    private router: Router,
    private api: RestService,
    private util: UtilService,
    private alertController: AlertController,
    private nav: NavController,
    private loc: Location
  ) {
    this.util.startLoad();
    this.api.getWithHeader('orders').subscribe((orders: any) => {
      this.util.stopload();
      this.orders = orders.orders;
      console.log(orders.orders);

    }, err => {
      this.util.stopload();
      this.util.error(err);

    });
  }

  ngOnInit() {
  }

  check(data) {
    console.log(data);

    let navigationExtras: NavigationExtras = { state: data };
    this.router.navigate(['/tabs/order'], navigationExtras)
  }

  back() {
    this.nav.pop();
    this.loc.back();
  }

}
