import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./main/MainComponent";
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {path:"",component:MainComponent,
  children:[ {path:'dashboard',component:DashboardComponent},
  {path:'categories',component:CategoriesComponent},
  {path:'products',component:ProductsComponent},
  {path:'product',component:ProductComponent},
  {path:'product/:id',component:ProductComponent},
  {path:'orders',component:OrdersComponent}
  
  ]
}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
