import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitPageRoutingModule } from './visit-routing.module';

import { VisitPage } from './visit.page';
import { NgSelectModule } from '@ng-select/ng-select';
import { Camera } from '@ionic-native/camera/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitPageRoutingModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers:[Camera,Geolocation],
  declarations: [VisitPage]
})
export class VisitPageModule {}
