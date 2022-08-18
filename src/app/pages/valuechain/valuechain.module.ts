import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValuechainPageRoutingModule } from './valuechain-routing.module';

import { ValuechainPage } from './valuechain.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValuechainPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ValuechainPage]
})
export class ValuechainPageModule {}
