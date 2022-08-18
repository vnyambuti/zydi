import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DealerPageRoutingModule } from './dealer-routing.module';

import { DealerPage } from './dealer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DealerPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DealerPage]
})
export class DealerPageModule {}
