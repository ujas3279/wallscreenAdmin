import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewWallpaperComponent } from './components/add-new-wallpaper/add-new-wallpaper.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ExploreComponent } from './components/explore/explore.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LogoComponent } from './components/logo/logo.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { WallPaperPostComponent } from './components/wall-paper-post/wall-paper-post.component';
import { WallPaperPostsComponent } from './components/wall-paper-posts/wall-paper-posts.component';
import { WallStackRoutingModule } from './wallstack-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';



@NgModule({
  declarations: [
    HomeComponent,
    ExploreComponent,
    CategoriesComponent,
    HeaderComponent,
    WallPaperPostComponent,
    WallPaperPostsComponent,
    PostDetailComponent,
    AddNewWallpaperComponent,
    LogoComponent,
    AdmindashboardComponent
  ],
  imports: [
    CommonModule, WallStackRoutingModule, HttpClientModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class WallstackModule { }
