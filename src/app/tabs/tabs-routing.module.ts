import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../pages/search/search.module').then( m => m.SearchPageModule)
      },
      {
        path: 'manage-account',
        loadChildren: () => import('../pages/manage-account/manage-account.module').then( m => m.ManageAccountPageModule)
      },
      {
        path: 'visit',
        loadChildren: () => import('../pages/visit/visit.module').then( m => m.VisitPageModule)
      },
      {
        path: 'dealer1',
        loadChildren: () => import('../pages/dealer1/dealer1.module').then( m => m.Dealer1PageModule)
      },
      {
        path: 'valuechain',
        loadChildren: () => import('../pages/valuechain/valuechain.module').then( m => m.ValuechainPageModule)
      },
      {
        path: 'farmer',
        loadChildren: () => import('../pages/farmer/farmer.module').then( m => m.FarmerPageModule)
      },
      {
        path: 'product-view',
        loadChildren: () => import('../pages/product-view/product-view.module').then( m => m.ProductViewPageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('../pages/cart/cart.module').then( m => m.CartPageModule)
      },
      {
        path: 'make-payment',
        loadChildren: () => import('../pages/make-payment/make-payment.module').then( m => m.MakePaymentPageModule)
      },
      {
        path: 'dealer',
        loadChildren: () => import('../pages/dealer/dealer.module').then( m => m.DealerPageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('../pages/orders/orders.module').then( m => m.OrdersPageModule)
      },
      {
        path: 'farmers',
        loadChildren: () => import('../pages/farmers/farmers.module').then( m => m.FarmersPageModule)
      },
      {
        path: 'order',
        loadChildren: () => import('../pages/order/order.module').then( m => m.OrderPageModule)
      },
      {
        path: 'registration',
        loadChildren: () => import('../pages/registration/registration.module').then( m => m.RegistrationPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'edit-farmer',
        loadChildren: () => import('../pages/edit-farmer/edit-farmer.module').then( m => m.EditFarmerPageModule)
      },
      {
        path: 'visit-detail',
        loadChildren: () => import('../pages/visit-detail/visit-detail.module').then( m => m.VisitDetailPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
