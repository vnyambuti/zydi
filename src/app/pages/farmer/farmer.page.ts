import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HTTP } from '@ionic-native/http/ngx';
import { UtilService } from 'src/app/services/util.service';
import { URL } from 'src/environments/environment';
import { RestService } from 'src/app/services/rest.service';


@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.page.html',
  styleUrls: ['./farmer.page.scss'],
})
export class FarmerPage implements OnInit {

  farmerform: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loc: Location,
    private router: Router,
    private http: HTTP,
    private utill: UtilService,
    private api: RestService
  ) { }

  ngOnInit() {
    this.farmerform = this.fb.group({

      fname: ['', Validators.required],
      sname: ['', Validators.required],
      mname: ['', Validators.required],
      idno: ['', Validators.required],
      yob: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      vchain: ['', Validators.required]
    });
    // this.farmerform.reset();
  }
  back() {
    this.loc.back();
  }

  tryReg(e) {
    console.log(e);

    const farmer = {

      "first_name": this.farmerform.value.fname,
      "middle_name": this.farmerform.value.mname,
      "last_name": this.farmerform.value.sname,
      "email": "info@ldri.com",
      "phone_number": this.farmerform.value.phone,
      "vba_phone_number": localStorage.getItem('phone'),
      "gender": this.farmerform.value.gender,
      "county": 'test',
      "sub_county": 'test',
      "ward": 'test',
      "village": 'test',
      "password": 'test',
      "is_over_35": '0',
      "crop_name": JSON.stringify(this.farmerform.value.vchain),
      "crop_variety": 'test',
      "small_pack_code": 'test',
      "quantity_planted": 'test',
      "quantity_harvested": 'test'
    }
    console.log(farmer);

    this.utill.startLoad();
    // this.http.post(URL.live + 'farmers',
    //   farmer, {
    //   'Authorization': 'Bearer ' + this.api.getToken().trim(),
    //   'content-type': 'application/json',
    //   'Accept': 'application/json'
    // })
    //   .then((data: any) => {

    //     let res = JSON.parse(data.data);
    //     console.log(res.farmer);


    //     if (!res.farmer) {

    //       //this.api.doErrors(data).then(r)
    //       this.utill.stopload();
    //       this.utill.presentAlert('Error!!','Failed')
    //     } else {
    //       this.utill.stopload();
    //       this.utill.presentAlert('Success','Farmer  ' + res.farmer.first_name +'  '+ res.farmer.middle_name +'  '+ res.farmer.last_name + '  Added');
    //       this.farmerform.reset();


    //     }
    //   })
    //   .catch((err: any) => {
    //     this.utill.stopload();
    //     this.utill.error(err);



    //   });

    this.api.postWithHeader('farmers', farmer).subscribe((res: any) => {
           if (!res.farmer) {

          //this.api.doErrors(data).then(r)
          this.utill.stopload();
          this.utill.presentAlert('Error!!','Failed')
        } else {
          this.utill.stopload();
          this.utill.presentAlert('Success','Farmer  ' + res.farmer.first_name +'  '+ res.farmer.middle_name +'  '+ res.farmer.last_name + '  Added');
          this.farmerform.reset();


        }

    }, err => {
      this.utill.stopload();
      this.utill.error(err);
    }
    )
  }
}
