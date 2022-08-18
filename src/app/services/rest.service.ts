
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { LoadingController, NavController } from '@ionic/angular';
import { URL } from '../../environments/environment';
import { UtilService } from './util.service';
import { HTTP } from '@ionic-native/http/ngx';


let urlType: any = URL.enable;
var base_url = urlType == 1 ? URL.local : URL.live;
@Injectable({
  providedIn: 'root'
})
export class RestService {

  public user = new BehaviorSubject({});
  userId: any = localStorage.getItem('isUser');
  tok: string;
  res: any;
  service_name: string;

  constructor(public http: HttpClient, public HTTP: HTTP, public loadingController: LoadingController, private nav: NavController, private utill: UtilService) { }

  get(url) {
    return this.http.get(base_url + url);
  }
  get1(url) {
    return this.http.get('https://zydivisits.herokuapp.com/api/' + url);
  }
  getWithHeader(url) {
    let tok = 'Bearer ' + JSON.parse(localStorage.getItem('token'));
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', tok);
    return this.http.get(base_url + url, { headers: headers });
  }

  fbUser(token) {
    return this.http.get("https://graph.facebook.com/v2.5/me?fields=email,name,picture&access_token=" + token);
  }

  google(lat, lng) {
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=" + 'AIzaSyCb9lhLYxUnRjSp1oIGl6aAsXLODc3o-f4' + "");
  }

  postWithHeader(url, data) {
    let tok = 'Bearer ' + JSON.parse(localStorage.getItem('token'));
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', tok);
    headers = headers.set('Accept', 'application/json');
    return this.http.post(base_url + url, data, { headers: headers });
  }
  post(url, data) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    return this.http.post(base_url + url, data, { headers: headers });
  }

  post1(url, data) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    return this.http.post('https://sibadmin.wigopay.com/api/' + url, data, { headers: headers });
  }

  register(url, data) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    return this.http.post(base_url + url, data, { headers: headers });
  }

  authUserId() {
    return this.userId;
  }

  ifUserLogin(url) {
    if (localStorage.getItem('token')) {
      return this.getWithHeader('user/' + url);
    } else {
      return this.get(url);
    }
  }

  getAccount() {
    this.getWithHeader('manager/collection/all').subscribe((res: any) => {
      console.log(res);


      if (res.success) {

        this.utill.success(res.message);
        this.utill.stopload();
        return res


      } else {
        this.utill.success(res.message);
        this.utill.stopload();

      }
    }, err => {
      this.utill.error(err);
      this.utill.stopload();
    })
  }

  getbasePrice() {
    return this.http.get("http://data.fixer.io/api/latest?access_key=ee27cee86092261e0007e11a387e481d");
  }

  convertPrice() {
    return this.http.get("http://data.fixer.io/api/convert?access_key=ee27cee86092261e0007e11a387e481d&from=GBP&from=GBP&amount=25");
  }

  nativepost(url, data) {
    // console.log(URL.live + u);

  }

  nativeget() {

  }
  getToken() {
    this.tok = localStorage.getItem('token');
    return JSON.parse(this.tok);
  }

  apiresponse(err) {
    if (err.status === 401) {
      localStorage.clear();
      this.nav.navigateRoot(['login']);
    } else {
      this.utill.presentAlert('Error', err);
    }
  }


  getProduct() {
    this.HTTP.get(URL.live + 'products?type=seed',
      {}, {
      'Authorization': 'Bearer ' + this.getToken().trim(),
      'content-type': 'application/json',
      'Accept': 'application/json'
    })
      .then((data: any) => {

        let res = JSON.parse(data.data);
        console.log(res);
        this.res = res.products;
        if (!res.products) {

          //this.api.doErrors(data).then(r)
          this.utill.stopload();
          this.utill.presentAlert('Error!!', 'Failed')
        } else {
          this.utill.stopload();
          return res.products;
          // this.utill.presentAlert('Success','Farmer  ' + res.farmer.first_name +'  '+ res.farmer.middle_name +'  '+ res.farmer.last_name + '  Added');
          // this.searchform.reset();


        }
      })
      .catch((err: any) => {
        this.utill.stopload();
        this.utill.error(err);



      });
  }

  getOrders() {
    this.utill.startLoad();
    this.getWithHeader('orders').subscribe((orders: any) => {
      this.utill.stopload();
      // console.log(orders.orders);
      let data = orders.orders;
      return data;




    }, err => {
      this.utill.stopload();
      this.utill.error(err);

    });
  }

  getProducts() {
    this.getWithHeader('products').subscribe((res: any) => {
      console.log(res);

    }, err => {
      this.utill.stopload();
      this.utill.error(err)
    })
  }
}
