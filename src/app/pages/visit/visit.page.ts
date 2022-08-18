import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UtilService } from 'src/app/services/util.service';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { JsonpClientBackend } from '@angular/common/http';
@Component({
  selector: 'app-visit',
  templateUrl: './visit.page.html',
  styleUrls: ['./visit.page.scss'],
})

export class VisitPage implements OnInit {
  types: any;
  visitform: FormGroup;
  typesbackup: { name: string; }[];
  vchain = true;
  disease = true;
  hidden=true;
  vchains: any;
  nilissue: [{
    name: "Charcoalrot Macrophomina phaseolina",
  }]
  issues: any;
  diseases: any;
  foo1: { [k: string]: any; };
  farms: any;
  image: string;
  newimage:string;
  imagePreview: any;
  isImgChange: boolean;
  location: any;
  pin:any;
  vchainid: any;
  newvchain: any;
  constructor(
    private router: Router,
    private api: RestService,
    private util: UtilService,
    private alertController: AlertController,
    private nav: NavController,
    private fb: FormBuilder,
    private loc: Location,
    private utill: UtilService,
    private route: ActivatedRoute,
    private camera: Camera,
    private sheetCtrl: ActionSheetController,
    private geolocation: Geolocation
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.foo1 = this.router.getCurrentNavigation().extras.state;
        // this.farms=this.foo.farms;
        // this.farmscount=this.foo.farms.length
        console.log(this.foo1);
        this.farms = this.foo1.farms;
        console.log(this.farms);


      }
    });
  }

  ngOnInit() {
    this.visitform = this.fb.group({
      visit: ['', Validators.required],
      farm: ['', Validators.required],
      observation: ['', Validators.required],
      recomendation: ['', Validators.required],
      disease: ['', Validators.required],
      valuechain: ['', Validators.required],
      type: [],
      category: [''],
      newissue: [''],

    });
    this.visitform.reset();

    // this.geolocation.getCurrentPosition().then((resp) => {

    //   // this.locationTraces.push({
    //   //   latitude:resp.coords.latitude,
    //   //   longitude:resp.coords.latitude,
    //   //   accuracy:resp.coords.accuracy,
    //   //   timestamp:resp.timestamp
    //   // });
    //   console.log(resp.coords.latitude);
    //   this.location = resp;
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });
  }

  back() {
    this.loc.back();
  }

  // changevchain(){

  // }

  ionViewWillEnter() {
    this.initializeItems();
    this.util.startLoad();
    this.api.getWithHeader('valuechains?limit=100').subscribe((farmers: any) => {
      this.util.stopload();
      this.vchains = farmers.value_chains;
      console.log(farmers.value_chains);

    }, err => {
      this.util.stopload();
      this.util.error(err);

    });
    this.geolocation.getCurrentPosition().then((resp) => {

      // this.locationTraces.push({
      //   latitude:resp.coords.latitude,
      //   longitude:resp.coords.latitude,
      //   accuracy:resp.coords.accuracy,
      //   timestamp:resp.timestamp
      // });
      console.log(resp);
      this.location = resp;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  getDiseases() {

  }
  async initializeItems(): Promise<any> {

    this.typesbackup = this.types;
    return this.types;
  }

  async filterList(evt) {
    this.types = this.typesbackup;
    const searchTerm = evt.detail.data;

    if (!searchTerm) {
      return;
    }

    this.types = this.types.filter(currentFood => {
      if (currentFood.name && searchTerm) {
        console.log(currentFood.name);

        return (currentFood.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }
  addAVisit() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.id);

    console.log(this.visitform.value);
    this.pin={
       "latitude":JSON.stringify(this.location.coords.latitude),
       "longitude": JSON.stringify(this.location.coords.longitude)
    }
    const data = {
      farmers_id:this.foo1.id,
      farm_id: this.visitform.value.farm,
      user_id: user.id,
      location:this.pin,
      image:this.newimage,
      farm_issue_id: this.visitform.value.disease,
      reason: this.visitform.value.observation,
      recommendation: this.visitform.value.recomendation
    }
    console.log(data);

    this.api.postWithHeader('farmvisits', data).subscribe((farmers: any) => {
      this.util.stopload();


      console.log(farmers);
      this.visitform.reset();
      this.util.startLoad();
      this.api.getWithHeader('farmers/'+this.foo1.phone_number).subscribe((res: any) => {
        console.log(res.farmers[0]);
        this.util.stopload();
        let navigationExtras: NavigationExtras = { state: res.farmers[0] };
        // this.router.navigate(['/tabs/manage-account'], navigationExtras)
        this.nav.navigateRoot(['/tabs/manage-account'], navigationExtras);
        this.util.presentAlert('Success', 'Visit complete');
        // this.loc.back();



      }, err => {
        this.utill.stopload();
        this.utill.error(err);
      })

      // if (farmers.farm_issues.length <= 0) {
      //   console.log(this.nilissue);

      //   this.issues = this.nilissue;
      // } else {
      //   this.issues = farmers.farm_issues;
      // }

    }, err => {
      this.util.stopload();
      this.util.error(err);

    });
    //   this.api.post1('visits', data).subscribe((farmers: any) => {
    //   this.util.stopload();


    //   console.log(farmers);
    //   this.visitform.reset();
    //   this.util.startLoad();
    //   this.loc.back();


    // }, err => {
    //   this.util.stopload();
    //   this.util.error(err);

    // });
  }
  checkdisease(event) {
    console.log(event);

    if (event === 'other') {
      this.disease = false;
    } else {
      this.disease = true;
    }
  }

  getissues(event) {
    // console.log(event);

    if (event === 'other') {
      this.vchain = false;
    } else {
      this.api.getWithHeader('farmissues?limit=300&offset=2&value_chain=' + event).subscribe((farmers: any) => {
        this.util.stopload();


        console.log(farmers.farm_issues.length);
        if (farmers.farm_issues.length <= 0) {
          console.log(this.nilissue);

          this.issues = this.nilissue;
        } else {
          this.issues = farmers.farm_issues;
        }

      }, err => {
        this.util.stopload();
        this.util.error(err);

      });
    }


  }

  async newDisease(event) {
    console.log(this.visitform.value.visit);


    if (event === 'other') {
      const alert = await this.alertController.create({
        header: 'New Farm Issue',
        // message: 'This is an alert message.',
        // mode: 'ios',
        inputs: [
          {
            name: 'title',
            id: 'title',

            placeholder: 'Name'
          },
          {
            name: 'description',
            id: 'description',
            type: 'textarea',
            placeholder: 'Description'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              // this.gotodepo();
            }
          }, {
            text: 'Add',
            handler: data => {
              this.addNewDisease(data)
            }
          }
        ]
      });

      await alert.present();
    } else {

    }

  }
  addNewDisease(data) {
    console.log(data);
    if (this.visitform.value.valuechain === "other") {
      const dat={
        "name" :data.title,
        "description":data.description,
        "type" : this.visitform.value.visit,
        "value_chain_id": this.newvchain

    }
    console.log(dat);
    } else {
      const dat={
        "name" :data.title,
        "description":data.description,
        "type" : this.visitform.value.visit,
        "value_chain_id": this.visitform.value.valuechain

    }
    console.log(dat);
    }



    // this.util.startLoad();
    // this.api.postWithHeader('farmissues?limit=300&offset=2&value_chain=').subscribe((farmers: any) => {
    //   this.util.stopload();


    //   console.log(farmers.farm_issues.length);
    //   if (farmers.farm_issues.length <= 0) {
    //     console.log(this.nilissue);

    //     this.issues = this.nilissue;
    //   } else {
    //     this.issues = farmers.farm_issues;
    //   }

    // }, err => {
    //   this.util.stopload();
    //   this.util.error(err);

    // });
  }
  newissue(event) {
    const data = {
      name: this.visitform.value.newissue,
      category: this.visitform.value.category
    }
    console.log(data);

    this.api.postWithHeader('valuechains', data).subscribe((success: any) => {
      console.log(success);
      this.vchainid = success.value_chains.category;
      this.visitform.value.valuechain=success.value_chains.category;
      this.newvchain=success.value_chains.id
      // if (success.success) {
      //   this.util.presentToast('Image has successfuly Changed')
      // }
    }, err => {
      this.util.presentToast('Something Went Wrong' + err);
    })
  }
  getdiseases() {

    this.util.startLoad();
    // console.log(this.visitform.value.visit);
    if (this.visitform.value.valuechain === 'other') {
      this.api.getWithHeader('farmissues?limit=300&offset=2&value_chain=' + this.vchainid + '&type=' + this.visitform.value.visit).subscribe((farmers: any) => {
        this.util.stopload();


        console.log(farmers);
        this.diseases = farmers.farm_issues;
        console.log(this.diseases);

        // if (farmers.farm_issues.length <= 0) {
        //   console.log(this.nilissue);

        //   this.issues=this.nilissue;
        // } else {
        //   this.issues =farmers.farm_issues;
        // }

      }, err => {
        this.util.stopload();
        this.util.error(err);

      });
    } else {
      this.api.getWithHeader('farmissues?limit=300&offset=2&value_chain=' + this.visitform.value.valuechain + '&type=' + this.visitform.value.visit).subscribe((farmers: any) => {
        this.util.stopload();


        console.log(farmers);
        this.diseases = farmers.farm_issues;
        console.log(this.diseases);

        // if (farmers.farm_issues.length <= 0) {
        //   console.log(this.nilissue);

        //   this.issues=this.nilissue;
        // } else {
        //   this.issues =farmers.farm_issues;
        // }

      }, err => {
        this.util.stopload();
        this.util.error(err);

      });
    }

  }
  // changeProfile(){
  //   this.util.startLoad();
  //   let data = {
  //     code:this.code,
  //     email:this.email,
  //     phone:this.phone,
  //     name:this.name
  //   }
  //   this.api.postDataWithToken('profile_edit',data).subscribe((success:any) => {
  //     if(success.success){
  //       this.util.presentToast('profile has successfully changed');
  //       this.util.navCtrl.navigateForward('tabs/profile');
  //       this.util.setNewLogin(true);
  //       this.util.newLogin.next(true);
  //       this.util.setNewprofile(true);
  //       this.util.dismissLoader();
  //     }
  //   }, err =>{
  //     this.util.dismissLoader();
  //   })
  // }
  // back(){
  //   this.util.navCtrl.back();
  // }

  async albumSheet() {
    // this.geolocation.getCurrentPosition().then((resp) => {

    //   // this.locationTraces.push({
    //   //   latitude:resp.coords.latitude,
    //   //   longitude:resp.coords.latitude,
    //   //   accuracy:resp.coords.accuracy,
    //   //   timestamp:resp.timestamp
    //   // });
    //   console.log(resp);
    //   this.location = resp;
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });
    const actionSheet = await this.sheetCtrl.create({
      header: 'Albums',
      mode: 'ios',
      cssClass: 'image-picker',
      buttons: [{
        text: 'Gallery',
        icon: 'images-sharp',
        handler: () => {
          this.getGallery();
        }
      }, {
        text: 'Camera',
        icon: 'camera-sharp',
        handler: () => {
          this.getCamera();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }


  public getCamera(): any {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    }).then(file_uri => {
      this.utill.startLoad();
      this.image = "data:image/jpg;base64," + file_uri;
      console.log(this.image);

      this.imagePreview = file_uri
      this.isImgChange = true;
      let data = {
        image: this.imagePreview,
        location: this.location
      }
      console.log(data);

      this.api.post1('image', data).subscribe((success: any) => {
        console.log(success);

        if (success.success) {
          this.utill.stopload();
          this.newimage=success.image;
          this.util.presentToast('Upload successfully')
        }
      }, err => {
        this.utill.stopload();
        this.util.presentToast('Something Went Wrong');
      })
    });
  }

  public getGallery(): any {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
    }).then(file_uri => {
      this.utill.startLoad();
      this.image = "data:image/jpg;base64," + file_uri;
      this.isImgChange = true;
      this.imagePreview = file_uri
      let data = {
        image: this.imagePreview
      }
      this.api.post1('image', data).subscribe((success: any) => {
         this.utill.stopload()
        if (success.success) {
          this.newimage=success.image;
          this.util.presentToast('Upload successfull')
        }
      }, err => {
        this.utill.stopload();
        this.util.presentToast('Something went wrong');
      })
    });
  }
}
