import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditFarmerPageRoutingModule } from './edit-farmer-routing.module';

import { EditFarmerPage } from './edit-farmer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditFarmerPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditFarmerPage]
})
export class EditFarmerPageModule {}
