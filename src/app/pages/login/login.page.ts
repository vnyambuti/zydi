import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, LoadingController, MenuController } from "@ionic/angular";
import { RestService } from "../../services/rest.service";
import { UtilService } from "../../services/util.service";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { countryCode } from 'src/environments/environment';
import { HTTP } from '@ionic-native/http/ngx';
import { URL } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validationsform: FormGroup;
  phone: any;


  constructor(
    // private authService: AuthService,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private router: Router,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    public loadingController: LoadingController,
    public utill: UtilService,
    public api: RestService,
    private http: HTTP,
    private HTTP: HttpClient
  ) { }
  code = "+254";
  cCode: any = countryCode;
  // tslint:disable-next-line: variable-name

  ngOnInit() {
    this.validationsform = this.formBuilder.group({
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      // code: ['', Validators.required]
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  async presentAlert(value) {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 2000,
      message: value,
      mode: 'ios'
    });
    await loading.present();
  }

  tryLogin(value) {


    this.utill.startLoad();
    let d = new FormData();
    d.append('phone_number', this.validationsform.value.code + this.validationsform.value.email);
    d.append('password', this.validationsform.value.password);
    console.log(d);
    console.log(this.validationsform);
    const useer = {
      "phone_number": this.validationsform.value.phone,
      "password": this.validationsform.value.password
    }
    console.log(useer);

    this.phone = this.validationsform.value.phone;
    this.api.post('auth/login', useer).subscribe((res: any) => {
      this.utill.stopload();
      const tok = JSON.stringify(res.access_token)
      localStorage.setItem('phone', this.phone)
      localStorage.setItem('token', tok);
      this.utill.navCtrl().navigateRoot("/tabs/tab1");
      console.log(res);
      this.getvba(this.phone);
    }, err => {
      this.utill.stopload();
      this.utill.error(err);
    }
    )

    // this.http.post(URL.live + 'auth/login',
    //   useer, {})
    //   .then((data: any) => {

    //     let res = JSON.parse(data.data);
    //     console.log(res.access_token);


    //     if (!res.access_token) {

    //       //this.api.doErrors(data).then(r)
    //       this.utill.stopload();
    //       this.utill.presentAlert('Error','Invalid Credentials')
    //     } else {
    //       this.utill.stopload();
    //       // this.api.message('Farmer Added');
    //       this.validationsform.reset();
    //       const tok = JSON.stringify(res.access_token)
    //       localStorage.setItem('phone', this.phone)
    //       localStorage.setItem('token', tok);
    //       this.utill.navCtrl().navigateRoot("/tabs/tab1");

    //     }
    //   })
    //   .catch((err: any) => {

    //     this.utill.stopload();
    //     console.log(err.error);
    //     console.log(err.status);
    //     this.utill.error(err);
    //     // return err;
    //     //  if (err.status === 422) {
    //     // this.respon = JSON.parse(err.error);
    //     // console.log(this.respon.message);
    //     // this.respon.errors.forEach(element => {
    //     //   this.errorMessage.push(element)
    //     // });
    //     // this.errorMessage.push(this.respon.errors);
    //     // this.loader.dismiss();
    //     // this.presentAlert(this.respon.message);
    //     // } else {
    //     //   this.loader.dismiss();
    //     // this.presentAlert('Something went wrong please try again');
    //     // }

    //     // let res = this.api.doErrors(err);
    //     // if (res) {
    //     //   this.loader.dismiss();
    //     // }


    //   });



  }

  // async goRestPassPage() {
  //   this.modalCtrl.dismiss();
  //   const modal = await this.modalCtrl.create({
  //     component: ForgotpassPage,
  //   });

  //   modal.present();

  // }

  goClosePage() {
    this.modalCtrl.dismiss();
  }
  // async goToOtpPage() {
  //   this.modalCtrl.dismiss();
  //   const modal = await this.modalCtrl.create({
  //     component: OTPPage,
  //   });

  //   modal.present();

  // }

  getvba(phone) {
    this.api.getWithHeader('vbas/' + phone).subscribe((details: any) => {
      this.utill.stopload();
      // this.profile = orders.orders.reverse();
      // this.profile=details.vba
      localStorage.setItem('user', JSON.stringify(details.vba));
      console.log(details.vba);

    }, err => {
      this.utill.stopload();
      this.utill.error(err);

    });
  }
}
