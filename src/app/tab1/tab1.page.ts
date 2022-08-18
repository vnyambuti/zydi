import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { RestService } from '../services/rest.service';
import { UtilService } from '../services/util.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  balance: any;
  cartData: [];
  dealers: any;
  orders: [];
  reversed: void;
  recent: any;
  order_ref_1: any;
  order_ref_2: any;
  order_created_1: any;
  order_creates_2: any;
  order_created_2: any;
  order_status_1: any;
  order_status_2: any;
  order_vba_1: any;
  order_vba_2: any;
  order_id_1: any;
  order_id_2: any;
  firstname: any;
  lastname: any;
  created: any;
  phone: any;
  id: any;
  firstname1: any;
  lastname1: any;
  created1: any;
  id1: any;
  phone1: any;
  countdealers: any;
  productsCount: any;
  dealer0: any;
  dealer1: any;
  order1: any;
  order2: any;

  constructor(
    private router: Router,
    private api: RestService,
    private util: UtilService,
    private alertController: AlertController,
    private nav: NavController
  ) {
    this.api.getWithHeader('orders').subscribe((orders: any) => {
      this.util.stopload();
      console.log(orders.orders.reverse()[0]);
      // let data = orders.orders;
      // return data
      this.order1 = orders.orders.reverse()[0];

      this.order2 = orders.orders[1];
      this.order_ref_1 = orders.orders[0].order_ref;
      this.order_ref_2 = orders.orders[1].order_ref;
      this.order_created_1 = orders.orders[0].created_at;
      this.order_created_2 = orders.orders[1].created_at;
      this.order_status_1 = orders.orders[0].status;
      this.order_status_2 = orders.orders[1].status;
      this.order_vba_1 = orders.orders[0].vba_id;
      this.order_vba_2 = orders.orders[1].vba_id;
      this.order_id_1 = orders.orders[0].id;
      this.order_id_2 = orders.orders[1].id;
      console.log(this.orders = orders.orders[0]);

    }, err => {
      this.util.stopload();
      this.util.error(err);

    });

  }


  ngOnInit() {
    this.getwallet();
    this.cartData = JSON.parse(localStorage.getItem("cart-data"))
      ? JSON.parse(localStorage.getItem("cart-data"))
      : [];


    this.getAgrodealers();
   // this.getFarmers();
    this.getCatalogue();
  }
  ngAfterContentInit() {
    // this.getOrders();
  }
  ionViewDidEnter() {
    this.cartData = JSON.parse(localStorage.getItem("cart-data"))
      ? JSON.parse(localStorage.getItem("cart-data"))
      : [];
    // console.log(this.cartData);
    //this.getAgrodealers();
    // this.getFarmers();
  }
  c
  goToSearch() {
    this.router.navigate(['/tabs/search'])
  }

  getvba() {
    const phone = localStorage.getItem('phone');

  }
  goToFarmers() {
    this.router.navigate(['/tabs/farmers']);
  }

  goToCatalogue() {
    this.router.navigate(['/tabs/product-view']);
  }
  goToDealer() {
    this.router.navigate(['/tabs/dealer']);
  }
  goToOrders() {
    this.router.navigate(['/tabs/orders']);
  }
  goToRegistrations() {
    this.router.navigate(['/tabs/registration']);
  }
  getwallet() {
    this.util.startLoad();
    this.api.getWithHeader('wallets?pin=0000').subscribe((res: any) => {
      console.log(res.wallet.balance);
      if (!res.wallet) {
        this.util.stopload();
        this.presentAlert();
      } else {
        this.util.stopload()
        this.balance = res.wallet.balance;
      }


    }, err => {
      this.util.stopload();
      this.util.error(err);

    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'OOps!',
      message: 'Provide wallet pin',
      buttons: ['OK']
    });

    await alert.present();
  }

  goToCart() {
    this.cartData = JSON.parse(localStorage.getItem("cart-data"))
      ? JSON.parse(localStorage.getItem("cart-data"))
      : [];
    if (this.cartData.length < 1) {
      this.util.presentAlert('OOps!', 'cart is empty');
    } else {
      this.nav.navigateForward("tabs/cart");
    }
  }




  getFarmers() {
    this.util.startLoad();
    this.api.getWithHeader('farmers').subscribe((farmers: any) => {
      this.util.stopload();

      console.log(farmers.length);

    }, err => {
      this.util.stopload();
      this.util.error(err);

    });
  }

  getAgrodealers() {
    this.util.startLoad();
    this.api.getWithHeader('dealers').subscribe((dealers: any) => {
      this.util.stopload()

      this.countdealers = dealers.agro_dealers.length;
      this.dealers = dealers.agro_dealers;
      let dealer = dealers.agro_dealers;
      this.reversed = dealers.agro_dealers.reverse();
      this.dealer0 = this.reversed[0];
      this.dealer1 = this.reversed[1];
      console.log(this.reversed[0]);

      this.firstname = this.reversed[0].first_name;
      this.lastname = this.reversed[0].last_name;
      this.created = this.reversed[0].created_at;
      this.id = this.reversed[0].id;
      this.phone = this.reversed[0].phone_number;
      this.firstname1 = this.reversed[1].first_name;
      this.lastname1 = this.reversed[1].last_name;
      this.created1 = this.reversed[1].created_at;
      this.id1 = this.reversed[1].id;
      this.phone1 = this.reversed[1].phone_number;
      console.log(this.reversed[1]);

    }, err => {
      this.util.stopload();
      this.util.error(err);

    });
  }

  getCatalogue() {
    this.api.getWithHeader("products").subscribe(
      (success: any) => {
        console.log(success);

        this.productsCount = success.products.length;

        // this.products.forEach((element) => {
        //   element.quantity = this.quantityGet(element.id);
        // });
        this.util.stopload();
      },
      (err) => {
        this.util.error(err);
        this.util.stopload();
      }
    );

  }
  check(data) {
    console.log(data);

    let navigationExtras: NavigationExtras = { state: data };
    this.router.navigate(['/tabs/order'], navigationExtras)
  }
  check1(data) {
    console.log(data);

    let navigationExtras: NavigationExtras = { state: data };
    this.router.navigate(['/tabs/manage-account'], navigationExtras)
  }
}
