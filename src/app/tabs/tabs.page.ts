import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RestService } from '../services/rest.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  ordersCount: any;

  constructor(

    private fb: FormBuilder,
    private util: UtilService,
    private router: Router,
    private loc: Location,
    private utill: UtilService,
    private api: RestService,
    private alertController: AlertController
  ) { }


  ngOnInit() {


  }
  ionViewWillEnter() {
    this.api.getWithHeader('orders').subscribe((orders: any) => {
      this.util.stopload();
      // console.log( orders.orders.reverse()[0]);
      // let data = orders.orders;
      // return data
      this.ordersCount = orders.orders.length

    }, err => {
      this.util.stopload();
      this.util.error(err);

    });
  }
  getOrders() {
    this.router.navigate(['/tabs/orders'])
  }

  async chooseAdd() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      mode: "ios",
      message: 'Select who you would like to add',
      buttons: [
        {
          text: 'Farmer',
          // role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['/tabs/farmer'])
          }
        }, {
          text: 'Dealer',
          cssClass: 'danger',
          handler: () => {
            this.router.navigate(['/tabs/dealer1'])
          }
        }
      ]
    });

    await alert.present();
  }


  getToProfile() {
    this.router.navigate(['/tabs/profile'])
  }
}
