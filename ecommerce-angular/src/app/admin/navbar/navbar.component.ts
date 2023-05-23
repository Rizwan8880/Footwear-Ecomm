import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  logout(){

   if(confirm("Sure to Logout?")){ localStorage.clear();
    window.location.replace('/')
  }}
}
