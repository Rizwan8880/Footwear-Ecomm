import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
  if( localStorage.getItem("usertype"  )=== "admin"){
    this.adminlogin =true
  }

  }
  adminlogin =false
}
