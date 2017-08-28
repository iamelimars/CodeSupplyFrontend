import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';

import {
  MdButtonModule, 
  MdTabsModule, 
  MdToolbarModule,
  MdCardModule,
  MdGridListModule,
  MdPaginatorModule} from '@angular/material';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

import { DataService } from './services/data.service';
import { QuoteComponent } from './components/quote/quote.component';
import { PostComponent } from './components/post/post.component';
import { CategoryComponent } from './components/category/category.component';
import { NewPostComponent } from './components/dashboard/new-post/new-post.component';
import { AllPostsComponent } from './components/dashboard/all-posts/all-posts.component';

const appRoutes: Routes = [
  {
    path:'', component:HomeComponent
  },
  {
    path:'posts', component: PostsComponent
  },
  {
    path:'post/:id', component: PostComponent
  },
  {
    path:'dashboard', component: DashboardComponent,
    children: [
      {
        path: '', redirectTo: 'new', pathMatch: 'full'
      },
      {
        path: 'new', component: NewPostComponent
      },
      {
        path: 'all', component: AllPostsComponent
      }
    ]
  },
  {
    path:'category/:id', component: CategoryComponent
  },
  {
    path:'signin', component: SignInComponent
  },
  {
    path:'signup', component: SignUpComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostsComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    QuoteComponent,
    PostComponent,
    CategoryComponent,
    NewPostComponent,
    AllPostsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MdButtonModule,
    MdTabsModule, 
    MdToolbarModule,
    MdCardModule,
    MdGridListModule,
    MdPaginatorModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
