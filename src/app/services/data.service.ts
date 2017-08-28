import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Post } from '../interfaces/post.interface';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {

  constructor(public http:Http) {
    
   }

   addPost(data): Observable<any> {
     const body = JSON.stringify(data);
     console.log(data);
     console.log(body);
     
     
     const headers = new Headers({'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'});
     let options = new RequestOptions({headers});
     return this.http.post('http://localhost:3000/api/post/', data)
      .map(res => res.json());

   }

  getPosts() {
    return this.http.get('http://localhost:3000/api/posts')
      .map(res => res.json());

  }

  getCategory(id) {
    return this.http.get('http://localhost:3000/api/category/' + id)
      .map(res => res.json());

  }

  getSinglePost(id) {
    return this.http.get('http://localhost:3000/api/post/' + id)
      .map(res => res.json());
  }

    


}
