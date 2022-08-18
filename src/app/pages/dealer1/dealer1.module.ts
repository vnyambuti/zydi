import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Dealer1PageRoutingModule } from './dealer1-routing.module';

import { Dealer1Page } from './dealer1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Dealer1PageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [Dealer1Page]
})
export class Dealer1PageModule {}
