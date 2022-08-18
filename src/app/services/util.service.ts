
import { LoadingController, NavController, ModalController, AlertController, ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UtilService {
  isLoading: any;
  dataTrasfer: any = {};
  viewAllData: any = {};
  deviceToken: any = '';
  bookingData: any = {
    services: [],
    ids: {}
  };
  appSettings: any = '';
  curranySymbol: any = "KES";
  curranyCode: any = "KSH";
  navigator: any = '';
  // Behaviour Subject //
  public language = new BehaviorSubject({});
  public user = new BehaviorSubject({});
  public ticket = new BehaviorSubject({});
  public settings = new BehaviorSubject({});
  public authGuard = new BehaviorSubject(localStorage.getItem('isUser') ? true : false);
  public userCurrentLocation: any = {};
  public allToast: any = {
    signInSuccess: 'Login Successfully...',
    logoutSuccess: 'Logout Successfully...',
    signupSuccess: 'Registered Successfully...'
  }
  constructor(
    private loadingController: LoadingController,
    private nav: NavController,
    private http: HttpClient,
    // private alert: alert,
    private router:Router,
    private mctrl:ModalController,
    private alert:AlertController,
    private toast:ToastController
    // public localNotifications: LocalNotifications
  ) { }

  async startLoad() {
    this.isLoading = true;
    return await this.loadingController.create({
      duration: 9000,
      cssClass: 'custom-loader',
    //   message: `<div class="sk-chase">
    //   <div class="sk-chase-dot"></div>
    //   <div class="sk-chase-dot"></div>
    //   <div class="sk-chase-dot"></div>
    //   <div class="sk-chase-dot"></div>
    //   <div class="sk-chase-dot"></div>
    //   <div class="sk-chase-dot"></div>
    // </div>`,
      spinner: "bubbles"
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => { });
        }
      });
    });
  }

  async stopload() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => { });
  }

  // googleMapAddScript(key:any) {
  //   console.log('key: ', key);
  //   const script = document.createElement('script');
  //   script.src = 'https://maps.googleapis.com/maps/api/js?key='+key+'&libraries=places';
  //   document.head.appendChild(script);
  // }

  // getGoogleMap(centerPoint, nativeElement) {
  //   let mapoption = {
  //     center: new google.maps.LatLng(centerPoint.lat, centerPoint.lng),
  //     zoom: 15,
  //     streetViewControl: false,
  //     disableDefaultUI: true,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   };
  //   return new google.maps.Map(nativeElement, mapoption);
  // }

  // addMarkerToMap(centerPoint, map) {
  //   new google.maps.Marker({
  //     position: new google.maps.LatLng(centerPoint.lat, centerPoint.lng),
  //     map: map
  //   });
  // }

  google(lat, lng) {
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=" + 'AIzaSyCb9lhLYxUnRjSp1oIGl6aAsXLODc3o-f4' + "");
  }

  navCtrl() {
    return this.nav;
  }

  // distance(lat1, lon1, lat2, lon2, unit) {
  //   if ((lat1 == lat2) && (lon1 == lon2)) {
  //     return 0;
  //   }
  //   else {
  //     let radlat1 = Math.PI * lat1 / 180;
  //     let radlat2 = Math.PI * lat2 / 180;
  //     let theta = lon1 - lon2;
  //     let radtheta = Math.PI * theta / 180;
  //     let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  //     if (dist > 1) {
  //       dist = 1;
  //     }
  //     dist = Math.acos(dist);
  //     dist = dist * 180 / Math.PI;
  //     dist = dist * 60 * 1.1515;
  //     if (unit == "K") { dist = dist * 1.609344 }
  //     if (unit == "N") { dist = dist * 0.8684 }
  //     return dist;
  //   }
  // }

  // date formate in yyyy-mm-dd
  formatDate = (date: Date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  getAppSettings() {
    return this.appSettings;
  }

  async success(msg) {
    const toast = await this.alert.create({
      message: msg,

      mode: "ios",
      buttons: ['OK']
    });
    toast.present();
  }



  async error(msg) {
    console.log(msg.status === 422);

    if (msg.status === 500) {
      console.log(msg.error);

      const toast = await this.alert.create({
        message: "We are experiencing technical difficulties kindly try later",
        mode: "ios",
      buttons: ['OK']
      });
      toast.present();
    } else if (msg.status === 422) {
      console.log(msg);
      const toast = await this.alert.create({
        message: JSON.stringify(msg.error),

        mode: "ios",
         buttons: ['OK']
      });
      toast.present();

    } else if (msg.status === 400) {
      console.log(msg);
      const toast = await this.alert.create({
        message: JSON.stringify(msg.error),

        mode: "ios",
         buttons: ['OK']
      });
      toast.present();
    } else if (msg.status === 401) {
      localStorage.clear();
      console.log(msg);
      const toast = await this.alert.create({
        message: 'Session Expired',

        mode: "ios",
         buttons: ['OK']
      });
      toast.present();
      this.mctrl.dismiss();
      this.nav.navigateRoot(["/login"]);
    }

    else {
      console.log(msg);

      const toast = await this.alert.create({
        message: JSON.stringify(msg.error),

        mode: "ios",
         buttons: ['OK']
      });
      toast.present();
    }


  }

  convertJSDateToTimestamp(date) {
    let myDate: any = date;
    myDate = myDate.split("-");
    let newDate = myDate[1] + "/" + myDate[2] + "/" + myDate[0];
    return new Date(newDate).getTime();
  }

  async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      mode: "ios"
    });
    toast.present();
  }
  async presentAlert(type,value) {
    const loading = await this.alert.create({
     header:type,

      message: value,
      mode: 'ios',
      buttons: ['OK']
    });
    await loading.present();
  }


}
