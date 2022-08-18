import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';


@Component({
  selector: 'app-visit-detail',
  templateUrl: './visit-detail.page.html',
  styleUrls: ['./visit-detail.page.scss'],
})
export class VisitDetailPage implements OnInit {
  foo: any;
  spot: any;
  locale: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private nativeGeocoder: NativeGeocoder,
    private loc: Location
  ) {


  }

  ngOnInit() {


    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.foo = this.router.getCurrentNavigation().extras.state;
        console.log(this.foo);




      }
    });
    const spot = JSON.parse(this.foo.location);
    // console.log(locate.latitude);

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(spot.latitude, spot.longitude, options)
    .then((result: NativeGeocoderResult[]) => {
      console.log(result[0])
      this.locale = result[0];
    }

    )
    .catch((error: any) => console.log(error));
  }

  // reverseGeocode(lat: number, lng: number): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.nativeGeocoder.reverseGeocode(lat, lng)
  //       .then((result: any) => {
  //         let str: string = `The visit address is ${result.street} in ${result.countryCode}`;
  //        // console.log(result[0]);
  //         resolve(result[0]);
  //       })
  //       .catch((error: any) => {
  //         console.log(error);
  //         reject(error);
  //       });
  //   });
  // }
  back() {
    this.loc.back();
  }
}
