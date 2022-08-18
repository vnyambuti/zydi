import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: any;

  constructor(
    private router: Router,
    private api: RestService,
    private util: UtilService,
    private alertController: AlertController,
    private nav: NavController,
    private loc: Location
  ) { }


  ionViewWillEnter(){
   const  phone= localStorage.getItem('phone');
   console.log(phone);

    this.util.startLoad();
    this.api.getWithHeader('vbas/'+ phone).subscribe((details: any) => {
      this.util.stopload();
      // this.profile = orders.orders.reverse();
      this.profile=details.vba
      console.log(details.vba);

    }, err => {
      this.util.stopload();
      this.util.error(err);

    });
  }

  ngOnInit() {
  }
  logout() {
    this.nav.navigateRoot("login");
    localStorage.clear();
  }

  public image: any = "../../assets/images/avatar.jfif";
}
