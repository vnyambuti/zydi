import { Component, OnInit } from '@angular/core';
// import { FormGroup } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { URL } from 'src/environments/environment';
import { RestService } from 'src/app/services/rest.service';
import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-dealer1',
  templateUrl: './dealer1.page.html',
  styleUrls: ['./dealer1.page.scss'],
})
export class Dealer1Page implements OnInit {
  dealer1form: FormGroup;
  products: any;
  constructor(
    private fb: FormBuilder,
    private loc: Location,
    private router: Router,
    private http: HTTP,
    private api: RestService,
    private utill: UtilService
  ) { }

  ngOnInit() {
    this.dealer1form = this.fb.group({
      shop: ['', Validators.required],
      location: ['', Validators.required],
      geo: [''],
      sfname: ['', Validators.required],
      ssname: ['', Validators.required],
      idno: ['', Validators.required],
      yob: [''],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      vchain: ['', Validators.required]
    });
    this.dealer1form.reset();
    this.products = this.api.getProducts();
    // console.log(this.products.products);

  }
  back() {
    this.loc.back();
  }

  tryReg(e) {
    this.utill.startLoad();
    const dealer = {
      "first_name": this.dealer1form.value.sfname,
      // "middle_name": thi,
      "last_name": this.dealer1form.value.ssname,
      // "email": ,
      "phone_number": this.dealer1form.value.phone,
      "national_id": this.dealer1form.value.idno,
      "shop_name": this.dealer1form.value.shop,
      "shop_location": this.dealer1form.value.location,
      "product_types": JSON.stringify(this.dealer1form.value.vchain)
    }
    console.log(dealer);
    //   this.http.post(URL.live + 'dealers',
    //   dealer, {
    //   'Authorization': 'Bearer ' + this.api.getToken().trim(),
    //   'content-type': 'application/json',
    //   'Accept': 'application/json'
    // })
    //   .then((data: any) => {

    //     let res = JSON.parse(data.data);
    //     console.log(res.dealer);


    //     if (!res.farmer) {

    //       //this.api.doErrors(data).then(r)
    //       this.utill.stopload();
    //       this.utill.presentAlert('Error!!','Failed')
    //     } else {
    //       this.utill.stopload();
    //       this.utill.presentAlert('Success','Dealer  ' + res.farmer.sfname + res.farmer.ssname + '  Added');
    //       this.dealer1form.reset();


    //     }
    //   })
    //   .catch((err: any) => {
    //     this.utill.stopload();
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

    this.api.postWithHeader('dealers', dealer).subscribe((res: any) => {
      console.log(res);

      if (!res.Agrodealer) {

        //this.api.doErrors(data).then(r)
        this.utill.stopload();
        this.utill.presentAlert('Error!!','Failed')
      } else {
        this.utill.stopload();
        this.utill.presentAlert('Success','Dealer  ' + res.Agrodealer.first_name +' '+ res.Agrodealer.last_name + '  Added');
        this.dealer1form.reset();


      }

    }, err => {
      this.utill.stopload();
      this.utill.error(err);
    })
  }


}
