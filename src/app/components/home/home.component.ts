import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material';
import { DataService } from '../../services/data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // MdPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  posts:Post[];
  prev_url:string;
  next_url:string;

  // MdPaginator Output
  pageEvent: PageEvent;

  constructor(private dataService:DataService) {
    
   }

  ngOnInit() {    
    this.dataService.getPosts().subscribe((posts) => {
      console.log(posts);
      this.posts = posts.posts.data;
      
    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onFrontendPaginateChange(event){
    console.log(JSON.stringify("Front End page index: " + event.pageIndex));
    
  }
  onAllPaginateChange(event){
    console.log(JSON.stringify("All page index: " + event.pageIndex));
    
  }
  onBackendPaginateChange(event){
    console.log(JSON.stringify("Backend page index: " + event.pageIndex));
    
  }
  onFullstackPaginateChange(event){
    console.log(JSON.stringify("Fullstack page index: " + event.pageIndex));
    
  }

  valueChanged() {
    console.log('on all clicked');
  }

}

interface Post {
  id:number;
  author: string;
  title:string;
  body:string;
  category_id:number;
  image_url:string;
  created_at:string;
  updated_at:string;
}
