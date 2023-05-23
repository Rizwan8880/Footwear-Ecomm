import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit  {
 
 categories:any;
 ngOnInit(): void {
  this.api.getCategories().subscribe((res:any)=>{
this.categories = res.data

  })
   }
  constructor( private api:ApiService ){
  }

  
  

}
