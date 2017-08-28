import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Post } from '../../../interfaces/post.interface';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  posts: Post[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPosts().subscribe((posts) => {
      console.log(posts);
      this.posts = posts.posts.data;
      
    });
  }

}
