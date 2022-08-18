import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  dealers: any;
  reversed: any;
  searchform: any;

  constructor(
    private fb: FormBuilder,
    private util: UtilService,
    private router: Router,
    private loc: Location,
    private utill: UtilService,
    private api: RestService,
    private alertController:AlertController
  ) {
    this.util.startLoad();
    this.api.getWithHeader('dealers').subscribe((dealers: any) => {
      this.util.stopload()
      this.dealers = dealers.agro_dealers;
      let dealer = dealers.agro_dealers;
      this.reversed = dealers.agro_dealers.reverse();
      console.log(this.reversed);


    }, err => {
      this.util.stopload();
      this.util.error(err);

    });
  }

  ngOnInit() {
    this.searchform = this.fb.group({
      term: ['']
    })
  }

  back() {
    this.loc.back();
  }

  async chooseAdd() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      mode:"ios",
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

}
