import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditFarmerPage } from './edit-farmer.page';

const routes: Routes = [
  {
    path: '',
    component: EditFarmerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFarmerPageRoutingModule {}
