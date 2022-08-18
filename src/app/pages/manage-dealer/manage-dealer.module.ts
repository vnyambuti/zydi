import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageDealerPageRoutingModule } from './manage-dealer-routing.module';

import { ManageDealerPage } from './manage-dealer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageDealerPageRoutingModule
  ],
  declarations: [ManageDealerPage]
})
export class ManageDealerPageModule {}
