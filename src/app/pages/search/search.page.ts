import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import { RestService } from 'src/app/services/rest.service';
import { NavigationExtras, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HTTP } from '@ionic-native/http/ngx';
import { URL } from 'src/environments/environment';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchform: FormGroup
  results: any;
  res: any;
  constructor(
    private fb: FormBuilder,
    private util: UtilService,
    private router: Router,
    private loc: Location,
    private http: HTTP,
    private utill: UtilService,
    private api: RestService,
    private nav:NavController
  ) { }

  ngOnInit() {
    this.searchform = this.fb.group({
      term: ['']
    })
  }

  findAccount(e) {
    this.util.startLoad();
    // console.log(e);
    // this.http.get(URL.live + 'farmers/' + e,
    //   {}, {
    //   'Authorization': 'Bearer ' + this.api.getToken().trim(),
    //   'content-type': 'application/json',
    //   'Accept': 'application/json'
    // })
    //   .then((data: any) => {

    //     let res = JSON.parse(data.data);
    //     console.log(res);
    //     this.res = res.farmers;
    //     if (!res.farmer) {
    //this.api.doErrors(data).then(r)
    //       this.utill.stopload();
    //       this.utill.presentAlert('Error!!', 'Failed')
    //     } else {
    //       this.utill.stopload();
    // this.utill.presentAlert('Success','Farmer  ' + res.farmer.first_name +'  '+ res.farmer.middle_name +'  '+ res.farmer.last_name + '  Added');
    //       this.searchform.reset();
    //     }
    //   })
    //   .catch((err: any) => {
    //     this.utill.stopload();
    //     this.utill.error(err);
    //   });


    this.api.getWithHeader('search?search=' + e.term).subscribe((res: any) => {
      console.log(res);

      this.results = res.users;
      this.util.stopload();


    }, err => {
      this.utill.stopload();
      this.utill.error(err);
    })
  }
  check(data) {
    let navigationExtras: NavigationExtras = { state: data };
    // this.router.navigateRoot(['/tabs/manage-account'], navigationExtras);
    this.nav.navigateRoot(['/tabs/manage-account'], navigationExtras);
  }
  goToAddDealer() {
    this.router.navigate(['/tabs/dealer1'])
  }
  goToAddFarmert() {
    this.router.navigate(['/tabs/farmer'])
  }


  back() {
    this.loc.back()
  }
}
