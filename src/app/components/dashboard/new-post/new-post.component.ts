import { Component, ElementRef, OnInit, ViewChild, Input, AfterViewInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { Post } from '../../../interfaces/post.interface';
import { User } from '../../../interfaces/user.interface';
import {Router} from '@angular/router';

declare var tinymce: any;


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit, AfterViewInit, OnDestroy {
  
  newPost: Post;
  allCategories = [
    new Category(1, 'Frontend'),
    new Category(2, 'Backend'),
    new Category(3, 'Fullstack')
  ]
  editor;

  @ViewChild('fileInput') inputEl: ElementRef;
  // @Input() body: String;
  @Output() onEditorKeyup = new EventEmitter<any>();

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    tinymce.init({
      selector: '#body',
      plugins: ['link', 'paste', 'table', 'codesample, code'],
      toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | codesample",
      skin_url: '../../../../assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          console.log(content);
          
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  onSubmit(form: NgForm) {

    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    let fileCount: number = inputEl.files.length;
    let selectedCat: Category = form.controls['category'].value;
    let formData:FormData = new FormData();
    console.log();
    
    formData.append('title', form.value.title);
    formData.append('body', this.editor.getContent());
    formData.append('category_id', selectedCat.catId.toString());
    formData.append('image', inputEl.files.item(0));
  
    if (fileCount > 0) {

      let newFormData = [{
          'title':form.value.title,
          'body': form.value.body,
          'category_id': selectedCat.catId,
          'image': inputEl.files.item(0)
        }];
        if (!formData) {
          console.log('No form data');
          
        }
        console.log(formData);

      this.dataService.addPost(formData).subscribe((response) => {
        console.log(response.post.id);
        let postId = response.post.id;
        // this.router = Router;
        // this.router.navigateByUrl('/post', postId);
        this.router.navigate(['/post', postId]);
        
      });
      
    }   

    // let selectedCat: Category = form.controls['category'].value;
    // let formJson = JSON.stringify({'title':form.value.title,
    //                                 'body': form.value.body,
    //                                 'category_id': selectedCat.catId,
    //                               'image': inputEl.files.item(0)});

    // 
    // console.log(form.value);
    // console.log(formJson);
    
    
  }

  ngOnDestroy(){

  }

}
class Category {
  constructor (public catId:number, public catName: string){

  }
}

class SinglePost {
  constructor (
    public id:number,
    public author: string,
    public title:string,
    public body:string,
    public category_id:number,
    public image_url:string,
    public created_at:string,
    public updated_at:string

  ) { }
}

