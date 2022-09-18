import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WallPaperPost } from '../wallpaperPost';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = "http://localhost:3000/posts";
  private wallpaperapiUrl = "http://52.204.16.111:5000/api/wallpapers";
  private wallPaperById = "http://52.204.16.111:5000/api/wallpaper";
  private updateWallpaper = "http://52.204.16.111:5000/api/wallpaper";
  private categoryUrl = "http://52.204.16.111:5000/api/categories";
  private bannerUrl = "http://52.204.16.111:5000/api/banners";
  private createWallpaperUrl = "http://52.204.16.111:5000/api/wallpaper/create";
  private createbannerUrl = "http://52.204.16.111:5000/api/banner/create";
  private createCategoryUrl = "http://52.204.16.111:5000/api/category/create"
  private deleteWallpaperUrl = "http://52.204.16.111:5000/api//wallpaper"

  constructor(private http: HttpClient) { }

  // getPosts(): Observable<WallPaperPost[]> {
  //   return this.http.get<WallPaperPost[]>(this.apiUrl)
  // }

  getitemData(): Observable<any> {
    return this.http.get(this.wallpaperapiUrl);
  }

  getAllCategories(): Observable<any> {
    return this.http.get(this.categoryUrl);
  }

  getAllbanners(): Observable<any> {
    return this.http.get(this.bannerUrl);
  }

  selectedPostDetail(id: number): Observable<WallPaperPost> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<WallPaperPost>(url);
  }

  selectedWallpaperData(id: number): Observable<any> {
    const url = `${this.wallPaperById}/${id}`;
    return this.http.get(url);
  }

  // adding new Wallpaper
  addWallpaper(post: any): Observable<any> {
    return this.http.post(this.createWallpaperUrl, post);
  }

  // add banner
  addbanner(post: any): Observable<any> {
    return this.http.post(this.createbannerUrl, post);
  }

  // add category
  addcategory(post: any): Observable<any> {
    return this.http.post(this.createCategoryUrl, post);
  }

  // deletePost(id: number): Observable<WallPaperPost[]> {
  //   console.log("id service: ", id);
  //   // using ES6 template literals
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.delete<WallPaperPost[]>(url);
  // }

  // deleteWallpaper
  deleteWallpaper(id: string): Observable<any> {
    const url = `${this.deleteWallpaperUrl}/${id}`;
    return this.http.delete(url);
  }

  // editPost(post: any): Observable<WallPaperPost> {
  //   console.log("post service: ", post);
  //   const url = `${this.apiUrl}/${post.id}`;
  //   return this.http.put<WallPaperPost>(url, post);
  // }

  updateWallpaperPost(post: any): Observable<any> {
    const _id = post.get('_id');
    const url = `${this.updateWallpaper}/${_id}`;
    return this.http.put(url, post);
  }
}
