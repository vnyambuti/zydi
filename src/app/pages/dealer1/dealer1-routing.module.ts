import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dealer1Page } from './dealer1.page';

const routes: Routes = [
  {
    path: '',
    component: Dealer1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Dealer1PageRoutingModule {}
