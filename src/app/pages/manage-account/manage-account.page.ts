import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertController, NavController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.page.html',
  styleUrls: ['./manage-account.page.scss'],
})
export class ManageAccountPage implements OnInit {
  foo: any;
  history: any;
  segmentModel = 'registered';
  farms: any;
  farmscount: any;
  visits;
  visitlist: any;
  dat: any;
  packs: any;
  constructor(
    private router: Router,
    private loc: Location,
    private route: ActivatedRoute,
    private nav: NavController,
    private alertController: AlertController,
    private api: RestService,
    private util: UtilService

  ) {
    // this.route.queryParams.subscribe(params => {
    // if (this.router.getCurrentNavigation().extras.state) {
    //   this.foo = this.router.getCurrentNavigation().extras.state;

    //   if (!this.foo.farms) {
    //     console.log(this.foo.length);
    //     // (this.foo.length)
    //     this.farms = this.foo;
    //     this.farmscount = '0';
    //   } else {
    //     this.farms = this.foo.farms;
    //   this.farmscount = this.foo.farms.length
    //   console.log(this.foo);
    //   }

    // }
    // });
  }
  ionViewDidLeave() {
    this.nav.pop();
  }
  ionViewWillLeave() {
    this.nav.pop();
  }
  ngOnInit() {
    // this.router.getCurrentNavigation().extras.
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.foo = this.router.getCurrentNavigation().extras.state;
        console.log(this.foo);
        this.packs=this.foo.smallpack ;

        if (!this.foo.farms) {
          this.farms = this.foo;
          this.farmscount = '0';
          this.visits=0;
          this.visitlist=[];
        } else {
          this.farms = this.foo.farms;
          this.farmscount = this.foo.farms.length
          // this.api.get1('fvisits/' + this.foo.id).subscribe((res: any) => {
          //   this.visits = res.payload.length;
          //   this.visitlist = res.payload;
          //   this.util.stopload();
            // let navigationExtras: NavigationExtras = { state: res.farmers[0] };
            // this.router.navigate(['/tabs/manage-account'], navigationExtras)
            //  this.nav.navigateRoot(['/tabs/manage-account'], navigationExtras);
            // this.util.presentAlert('Success', 'Visit complete');
            //this.loc.back();



          // }, err => {
          //   this.util.stopload();
          //   this.util.error(err);
          // })
          this.visits=this.foo.visits.length;
          this.visitlist=this.foo.visits;
          console.log(this.foo.visits.length);
          console.log(this.visitlist);

        }



      }
    });
  }
  goToVisit(data) {
    console.log(data.farms.length);
    if (data.farms.length <= 0) {
      this.util.presentAlert('OOps', 'No farm found');
    } else {
      let navigationExtras: NavigationExtras = { state: data };
      this.nav.navigateRoot(['/tabs/visit'], navigationExtras)
    }

    // console.log(data);


  }
  back() {
    this.nav.pop();
    this.loc.back();
  }

  segmentChanged(event) {
    console.log(event.detail.value);
    this.segmentModel = event.detail.value;
    if (event.detail.value === 'visits') {
      this.dat = {
        farmers_id: this.foo.id
      }
      console.log(this.dat);

      // this.api.get1('fvisits/' + this.foo.id).subscribe((res: any) => {
      //   this.visits = res.payload.length;
      //   this.visitlist = res.payload;
      //   // console.log(res.farmers[0]);
      //   console.log(res);

      //   this.util.stopload();
        //let navigationExtras: NavigationExtras = { state: res.farmers[0] };
        // this.router.navigate(['/tabs/manage-account'], navigationExtras)
        // this.nav.navigateRoot(['/tabs/manage-account'], navigationExtras);
        //this.util.presentAlert('Success', 'Visit complete');
        // this.loc.back();



      // }, err => {
      //   this.util.stopload();
      //   this.util.error(err);
      // })
    }
  }


  edit(data) {
    console.log(data);

    let navigationExtras: NavigationExtras = { state: data };
    this.router.navigate(['/tabs/edit-farmer'], navigationExtras)
  }



  async issue() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // header: 'Confirm!',
      message: "Please Enter the Small Pack Code",
      inputs: [
        {
          name: 'code',
          id: 'code',
          type: 'text',
          placeholder: '333444'
        },
      ],
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // this.gotodepo();
          }
        }, {
          text: 'Okay',
          handler: (code) => {
            this.completeIssue(code)
          }
        }
      ]
    });

    await alert.present();
  }

  async completeIssue(code) {
    const phone = localStorage.getItem('phone');
    console.log(phone);

    const data = {
      vba_phone_number: phone,
      farmer_phone_number: this.foo.phone_number,
      product_code: code

    }
    this.api.postWithHeader('products/1/supply', data).subscribe((res: any) => {
      this.util.stopload();
      // this.farmers = farmers.farmers;
      console.log(res);

    }, err => {
      this.util.stopload();
      this.util.error(err);

    });
  }


  shop(foo){
    let navigationExtras: NavigationExtras = { state: foo };
    this.router.navigate(['/tabs/product-view'], navigationExtras)

  }
  async delete() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to delete <p> <b>' + this.foo.first_name + '' + this.foo.last_name + '<b></p>',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.completedelete();
          }
        }
      ]
    });

    await alert.present();
  }

  completedelete() {
    // this.api.postWithHeader('products/1/supply',data).subscribe((res: any) => {
    //   this.util.stopload();
    //   // this.farmers = farmers.farmers;
    //   console.log(res);

    // }, err => {
    //   this.util.stopload();
    //   this.util.error(err);

    // });
  }

  check(data) {
    // this.me=JSON.parse(localStorage.getItem('user'));
    // console.log(this.me.id);
    // if (data.parent.id !== this.me.id) {
    //   this.util.presentAlert('OOps','Not allowed');
    // } else {
      let navigationExtras: NavigationExtras = { state: data };
    // this.router.navigate(['/tabs/manage-account'], navigationExtras)
    this.nav.navigateRoot(['/tabs/visit-detail'], navigationExtras);
    // }


  }
}
