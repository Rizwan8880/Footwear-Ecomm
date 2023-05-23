import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 

  baseUrl = "http://localhost:9000/"
  constructor(private http :HttpClient) { }


  // post (path:string ,data:any){
  //   const headers ={ 'content-type': 'apllication/json'}
  //   const body =JSON.stringify(data)
  //   return this.http.post(this.baseUrl+path,body,{'headers' :headers})
  // }

  adminLogin(data:any){
return this.http.post("http://localhost:9000/admin/login",data);
  }
  getCategories() {
    return this.http.get("http://localhost:9000/productcategory/list");
  }
}
