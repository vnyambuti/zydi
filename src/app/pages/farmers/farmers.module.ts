import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmersPageRoutingModule } from './farmers-routing.module';

import { FarmersPage } from './farmers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmersPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FarmersPage]
})
export class FarmersPageModule {}
