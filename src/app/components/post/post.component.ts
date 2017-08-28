import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Post } from '../../interfaces/post.interface';
import { User } from '../../interfaces/user.interface';

declare var Prism;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  id: number;
  private sub: any;
  post: Post;
  user: User;
  // cat_title: string;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.dataService.getSinglePost(this.id).subscribe((post) => {
        this.post = post.post;
        this.user = post.user;
        console.log(this.user);
        
        // this.cat_title = posts.category_title;
      });

      
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
