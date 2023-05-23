import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/contact/about/about.component';
import { ContactComponent } from './component/contact/contact.component';
import { ProductsComponent } from './component/products/products.component';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { UsreLoginComponent } from './component/usre-login/usre-login.component';
import { RegisterComponent } from './component/register/register.component';

const routes: Routes = [
  { path:"",component:HomeComponent },
  { path:"home",component:HomeComponent },
  {path:'about',component:AboutComponent},
  {path:"contact",component:ContactComponent},
  {path:"products",component:ProductsComponent},
  {path:"admin/login",component:AdminLoginComponent},
  {path:"user/login",component:UsreLoginComponent},
  {path:"register",component:RegisterComponent},


{path:'admin',loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule )}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
