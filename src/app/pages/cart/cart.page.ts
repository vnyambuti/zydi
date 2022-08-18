import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { RestService } from "src/app/services/rest.service";
//import { AddAddressPage } from "src/app/modals/add-address/add-address.page";
//import { CalendarPage } from "src/app/modals/calendar/calendar.page";
import { UtilService } from "src/app/services/util.service";

import { LoginPage } from "../login/login.page";
//import { ManageAddressPage } from "../manage-address/manage-address.page";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.page.html",
  styleUrls: ["./cart.page.scss"],
})
export class CartPage implements OnInit {
  address: any = "";
  date: any;
  totalBill = 0;
  currency: any;
  payment: number;
  addressDiv: any = [];
  qty: string;
  total: any;
  quantity: string;
  constructor(
    private modal: ModalController,
    private util: UtilService,
    private api: RestService,
    private nav:NavController
  ) {}

  ngOnInit() {}

  public backIcon = "../../../assets/icon/login.svg";

  // async manageAddress() {
  //   localStorage.setItem('isFrom','cart')
  //   const modal = await this.modal.create({
  //     component: ManageAddressPage,
  //   });
  //   modal.onDidDismiss().then((res) => {
  //     localStorage.setItem("address-id", res.data.id);
  //     this.address = res.data.addr1;
  //     localStorage.removeItem('isFrom')
  //   });
  //   return await modal.present();
  // }

  makePay() {
    // if (this.totalBill == 0) {
    // }  else if (this.address == "") {
    //   this.util.presentToast("Address are Required");
    // } else {
      this.nav.navigateForward("tabs/make-payment");
    // }
  }
  // async presentModal() {
  //   const modal = await this.modal.create({
  //     component: CalendarPage,
  //     cssClass: "calendar",
  //   });
  //   modal.onDidDismiss().then((res) => {
  //     this.date = this.api.date;
  //     localStorage.setItem("date", this.api.date);
  //   });
  //   return await modal.present();
  // }

  cartDataDisplay: any = [];
  service: any = [];
  tot = 0;
  ionViewWillEnter() {
    this.cartDataDisplay = JSON.parse(localStorage.getItem("cart-data"));
    this.cartDataDisplay.forEach((element) => {
      element.total = element.service.quantity * element.service.cost;
      this.totalBill += element.total;
      localStorage.setItem("totalQty", this.quantity);
      this.service = element.service;
      this.service.forEach((element) => {
        let cost = JSON.parse(element.cost) * element.quantity;
        this.tot += element.total;
        this.total = this.tot;
        this.quantity += element.quantity;
        localStorage.setItem("totalAmount", this.total);
      });
    });

    this.util.startLoad();
    setTimeout(async () => {
      this.currency = localStorage.getItem("currency_symbol");
      let token = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "";
      if (token == "") {
        localStorage.setItem("previous-request", "true");
        localStorage.setItem("previous-request-page", "tabs/home/cart");
        const modal = await this.modal.create({
          component: LoginPage,
        });
        modal.present();
        modal.onDidDismiss().then(() => {
          // this.util.startLoad();
          // this.api.getDataWithToken("all_address").subscribe(
          //   (success: any) => {
          //     if (success.success) {
          //       this.addressDiv = success.data;
          //       this.util.stopload();
          //     }
          //   },
          //   (err) => {}
          // );
        });
      }
      // let hasPre = localStorage.getItem("previous-request")
      //   ? localStorage.getItem("previous-request")
      //   : false;
      // let prePage = localStorage.getItem("previous-request-page")
      //   ? localStorage.getItem("previous-request-page")
      //   : "";
      // if (hasPre == "true" && prePage == "cart") {
      //   localStorage.setItem("previous-request", "true");
      //   this.util.setNewLogin(true);
      // }

      this.util.stopload();
    }, 1000);

    //this.util.startLoad();
    // this.api.getDataWithToken("all_address").subscribe(
    //   (success: any) => {
    //     if (success.success) {
    //       this.addressDiv = success.data;
    //       this.util.stopload();
    //     }
    //   },
    //   (err) => {}
    // );
  }

  // async addresss() {

  //   const modal = await this.modal.create({
  //     component: AddAddressPage,
  //     cssClass: "manage-address",
  //   });
  //   modal.onDidDismiss().then((res) => {
  //     this.address = res.data.addr1;
  //     localStorage.setItem("address-id", res.data.id);
  //     localStorage.removeItem('marketLat');
  //     localStorage.removeItem('marketLng')
  //   });
  //   return await modal.present();
  // }
}
