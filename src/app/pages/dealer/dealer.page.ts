import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.page.html',
  styleUrls: ['./dealer.page.scss'],
})
export class DealerPage implements OnInit {
  searchform: FormGroup
  dealers: any;
  reversed: any;
  constructor(

    private fb: FormBuilder,
    private util: UtilService,
    private router: Router,
    private loc: Location,
    private utill: UtilService,
    private api: RestService,
    private nav:NavController
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
  check(data) {
    console.log(data);

    let navigationExtras: NavigationExtras = { state: data };
    this.nav.navigateRoot(['/tabs/manage-account'], navigationExtras)
  }

  goToAddDealer() {
    this.router.navigate(['/tabs/dealer1'])
  }

  back() {
    this.loc.back();
  }
}
