import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-farmers',
  templateUrl: './farmers.page.html',
  styleUrls: ['./farmers.page.scss'],
})
export class FarmersPage implements OnInit {
  farmers: any;
  searchform:FormGroup;
  results: any;
  me: any;
  constructor(
    private router: Router,
    private api: RestService,
    private util: UtilService,
    private alertController: AlertController,
    private nav: NavController,
    private fb:FormBuilder,
    private loc:Location,
    private utill:UtilService,
  ) { }

  ngOnInit() {
    this.searchform=this.fb.group({
      term:['']
    })
  }
  ionViewWillEnter() {
    this.util.startLoad();
    this.api.getWithHeader('farmers?limit=200').subscribe((farmers: any) => {
      this.util.stopload();
      this.farmers = farmers.farmers;
      console.log(farmers);

    }, err => {
      this.util.stopload();
      this.util.error(err);

    });
  }
  check(data) {
    this.me=JSON.parse(localStorage.getItem('user'));
    console.log(this.me.id);
    // if (data.parent.id !== this.me.id) {
    //   this.util.presentAlert('OOps','Not allowed');
    // } else {
      let navigationExtras: NavigationExtras = { state: data };
    // this.router.navigate(['/tabs/manage-account'], navigationExtras)
    this.nav.navigateRoot(['/tabs/manage-account'], navigationExtras);
    // }


  }
  goToAddFarmer(){
    this.router.navigate(['/tabs/farmer'])
  }

  back() {
    this.loc.back();
  }
  findAccount(e) {
    this.util.startLoad();
    this.api.getWithHeader('farmers/' + e.term).subscribe((res: any) => {
      console.log(res);

      this.farmers = res.farmers;
      this.util.stopload();


    }, err => {
      this.utill.stopload();
      this.utill.error(err);
    })
  }
}
