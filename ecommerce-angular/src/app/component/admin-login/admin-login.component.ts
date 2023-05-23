import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
formData:any
 public message: string =""
  constructor(private api:ApiService){

  }
  ngOnInit(): void {
    window.scroll(0,0)
   this.formData =new FormGroup({
    username: new FormControl("",Validators.required),
    password: new FormControl("",Validators.required)
   })
  }
  onClickSubmit(data:any){ 
this.api.adminLogin(data).subscribe((res:any)=>{
 if(res.data.status=="success"){
  localStorage.setItem("usertype",'admin') 
  window.location.replace("/admin/dashboard");
 }
 else
 {
  this.message = "userName or password is wrong."
 }
  
},(err)=>{
  console.log(err,"error");
  
})
  }
}
