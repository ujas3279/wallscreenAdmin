import { Location } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-add-new-wallpaper',
  templateUrl: './add-new-wallpaper.component.html',
  styleUrls: ['./add-new-wallpaper.component.css']
})
export class AddNewWallpaperComponent implements OnInit {

  @ViewChild('teams') teams!: ElementRef;
  @ViewChild('bannerteams') bannerteams!: ElementRef;

  // reset form
  @ViewChild('wallPaperForm') wallPaperForm!: NgForm;
  @ViewChild('bannerForm') bannerForm!: NgForm;
  @ViewChild('categoryForm') categoryForm!: NgForm;

  selectedItem = '';
  selectType = 0;

  isPremium: any

  uploadFileWallpaper: boolean = true;
  uploadFileBanner: boolean = true;
  uploadFilecategory: boolean = true;

  allcategories: any;

  // wallpaper
  displayName?: string;
  category?: string;
  downloads?: number;
  views?: number;

  // banner
  type?: string;

  // category
  categoryName?: string;

  constructor(public _router: Router, public _location: Location, private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllCategories().subscribe((retrievedData) => {
      this.allcategories = retrievedData.data;
    })
  }

  onSelected() {
    this.selectedItem = this.teams.nativeElement.value;
    if (this.selectedItem == "Wallpaper") {
      this.selectType = 0;
    }
    if (this.selectedItem == "Banner") {
      this.selectType = 1;
    }
    if (this.selectedItem == "Category") {
      this.selectType = 2;
    }
  }

  onBannerSelected() {
    this.type = this.bannerteams.nativeElement.value;
  }

  wallpaperUrl = "";
  fileToUploadWallPaper: any;
  onSelectWallpaperFile(e: any) {
    this.fileToUploadWallPaper = e.target.files[0];
    this.uploadFileWallpaper = false;
    if (e.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.wallpaperUrl=event.target.result;
      }
    }
  }

  bannerUrl = "";
  fileToUploadBanner: any;
  onSelectBannerFile(e: any) {
    this.fileToUploadBanner = e.target.files[0];
    this.uploadFileBanner = false;
    if (e.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.bannerUrl=event.target.result;
      }
    }
  }

  categoryUrl = "";
  filetoUploadCategory: any;
  onSelectCategoryFile(e: any) {
    this.filetoUploadCategory = e.target.files[0];
    this.uploadFilecategory = false;
    if (e.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.categoryUrl=event.target.result;
      }
    }
  }

  resetImgCardWallpaper() {
    this.wallpaperUrl = "";
    this.uploadFileWallpaper = true;
  }

  resetImgCardBanner() {
    this.bannerUrl = "";
    this.uploadFileBanner = true;
  }

  resetImgCardcategory() {
    this.categoryUrl = "";
    this.uploadFilecategory = true;
  }

  onSubmitWallpaper(form: any) {
    const formData = new FormData();
    formData.set('photo', this.fileToUploadWallPaper);
    formData.set('displayName', form.value.displayName);
    formData.set('category', form.value.category);
    formData.set('isPremium', form.value.isPremium);
    formData.set('downloads', form.value.downloads);
    formData.set('views', form.value.views);
    this.uploadFileWallpaper = true;
    this.postService.addWallpaper(formData).subscribe();
    this.postService.getitemData().subscribe();
    this._router.navigate(['admin']);
    this.wallPaperForm.reset();
  }

  onSubmitbanner(formBanner: any) {
    const formData = new FormData();
    formData.set('photo', this.fileToUploadBanner);
    formData.set('type', this.bannerteams.nativeElement.value);
    formData.set('category', formBanner.value.category);
    this.postService.addbanner(formData).subscribe();
    this.postService.getAllbanners().subscribe();
    this._router.navigate(['admin']);
    this.bannerForm.reset();
  }

  onSubmitCategory(formCategory: any) {
    const formData = new FormData();
    formData.set('photo', this.filetoUploadCategory);
    formData.set('categoryName', formCategory.value.categoryName);
    this.postService.addcategory(formData).subscribe();
    this.postService.getAllCategories().subscribe();
    this._router.navigate(['admin']);
    this.categoryForm.reset();
  }
}
