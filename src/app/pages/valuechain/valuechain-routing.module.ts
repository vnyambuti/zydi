import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValuechainPage } from './valuechain.page';

const routes: Routes = [
  {
    path: '',
    component: ValuechainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValuechainPageRoutingModule {}
