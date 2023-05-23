import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/contact/about/about.component';
import { ContactComponent } from './component/contact/contact.component';
import { ProductsComponent } from './component/products/products.component';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { UsreLoginComponent } from './component/usre-login/usre-login.component';
import { RegisterComponent } from './component/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './service/api.service';
import { MainComponent } from './admin/main/MainComponent';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MainComponent } from './admin/main/MainComponent';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ProductsComponent,
    AdminLoginComponent,
    UsreLoginComponent,
    RegisterComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule


    


    
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
