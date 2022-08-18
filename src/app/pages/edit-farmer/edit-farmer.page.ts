import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-farmer',
  templateUrl: './edit-farmer.page.html',
  styleUrls: ['./edit-farmer.page.scss'],
})
export class EditFarmerPage implements OnInit {
  foo: { [k: string]: any; };
  farmerform: any;

  constructor(
    private router: Router,
    private loc: Location,
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private nav:NavController
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.foo = this.router.getCurrentNavigation().extras.state;
        // this.farms=this.foo.farms;
        // this.farmscount=this.foo.farms.length
        console.log(this.foo);

      }
    });
  }

  ngOnInit() {

  }


  updateFrmer(){

  }

  back(){
    this.nav.navigateBack('/tabs/manage-account');
  }

}
