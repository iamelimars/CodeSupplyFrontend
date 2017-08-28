import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  id: number;
  private sub: any;
  posts: Post[];
  cat_title: string;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.dataService.getCategory(this.id).subscribe((posts) => {
        console.log(posts.category_title);
        this.posts = posts.posts.data;
        this.cat_title = posts.category_title;
      });

      
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
