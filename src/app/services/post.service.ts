import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private api = environment.API;
  private wallpaperapiUrl = this.api + "/wallpapers";
  private wallPaperById = this.api + "/wallpaper";
  private updateWallpaper = this.api + "/wallpaper";
  private updateCategory = this.api + "/category"
  private categoryUrl = this.api + "/categories";
  private bannerUrl = this.api + "/banners";
  private createWallpaperUrl = this.api + "/wallpaper/create";
  private createbannerUrl = this.api + "/banner/create";
  private createCategoryUrl = this.api + "/category/create"
  private deleteWallpaperUrl = this.api + "/wallpaper";
  private deleteCategoryUrl = this.api + "/category";
  private deleteBannerUrl = this.api + "/banner";
  private getKey = this.api + "/key/634178edc361c4d45b46b434";
  private createKey = this.api + "/key/create/634178edc361c4d45b46b434"

  constructor(private http: HttpClient) { }

  getKeyData(): Observable<any> {
    return this.http.get(this.getKey);
  }

  postKeyData(post: any): Observable<any> {
    return this.http.post(this.createKey, post);
  }

  getitemData(): Observable<any> {
    return this.http.get(this.wallpaperapiUrl);
  }

  getAllCategories(): Observable<any> {
    return this.http.get(this.categoryUrl);
  }

  getAllbanners(): Observable<any> {
    return this.http.get(this.bannerUrl);
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

  // deleteWallpaper
  deleteWallpaper(id: string): Observable<any> {
    const url = `${this.deleteWallpaperUrl}/${id}`;
    return this.http.delete(url);
  }

  deleteCategory(id: string): Observable<any> {
    const url = `${this.deleteCategoryUrl}/${id}`;
    return this.http.delete(url);
  }

  deleteBanner(id: string): Observable<any> {
    const url = `${this.deleteBannerUrl}/${id}`;
    return this.http.delete(url);
  }

  updateWallpaperPost(post: any): Observable<any> {
    const _id = post.get('_id');
    const url = `${this.updateWallpaper}/${_id}`;
    return this.http.put(url, post);
  }

  updateCategoryName(_id: any, post: any): Observable<any> {
    const url = `${this.updateCategory}/${_id}`;
    return this.http.put(url, post);
  }
}
