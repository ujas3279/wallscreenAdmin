import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewWallpaperComponent } from './components/add-new-wallpaper/add-new-wallpaper.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ExploreComponent } from './components/explore/explore.component';
import { HomeComponent } from './components/home/home.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

const routes: Routes = [
  { path: '', component: AdmindashboardComponent,
  children: [
    { path: 'home', component: HomeComponent},
    { path: 'explore', component: ExploreComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'add_wallpaper', component: AddNewWallpaperComponent },
    { path: 'postDetail/:id', component: PostDetailComponent },
    // if there is no route match it will redirect to admin/home
    { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WallStackRoutingModule { }
