import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductViewPageRoutingModule } from './product-view-routing.module';

import { ProductViewPage } from './product-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductViewPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProductViewPage]
})
export class ProductViewPageModule {}
