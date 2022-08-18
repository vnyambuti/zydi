import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UtilService } from './services/util.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  token: string;
  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,

    public utill:UtilService,
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then( async () => {
      const helper = new JwtHelperService();
      this.router.navigate(['/']);
      // this.token=localStorage.getItem('token');
      // console.log(this.token);
      
      // const isExpired = helper.isTokenExpired(this.token);
      // if (this.token && !isExpired) {
      //   this.statusBar.styleLightContent();
      //   this.splashScreen.hide();
      //   this.router.navigate(['/tabs/home']);
      // } else {
      //   this.statusBar.styleLightContent();
      //   this.splashScreen.hide();
      //  this.utill.error('Not Logged In')
      //  this.router.navigate(['/login']);
      //   return false;
      // }
      // await this.afAuth.user.subscribe(user => {
      //   if (user) {
      //     
      //   } else {
      //     
      //   }
      // }, err => {
      //   this.router.navigate(['/loader']);
      // }, () => {
      //   this.splashScreen.hide();
      // });
    
    });
  }

  logout() {
    localStorage.clear();
  }

}
