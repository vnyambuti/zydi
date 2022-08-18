import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageDealerPage } from './manage-dealer.page';

const routes: Routes = [
  {
    path: '',
    component: ManageDealerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageDealerPageRoutingModule {}
