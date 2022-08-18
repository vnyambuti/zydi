import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitDetailPageRoutingModule } from './visit-detail-routing.module';

import { VisitDetailPage } from './visit-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitDetailPageRoutingModule
  ],
  declarations: [VisitDetailPage]
})
export class VisitDetailPageModule {}
