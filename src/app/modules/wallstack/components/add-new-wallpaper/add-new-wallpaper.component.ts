import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  isPremium?: boolean;

  uploadFileWallpaper: boolean = true;
  uploadFileBanner: boolean = true;
  uploadFilecategory: boolean = true;

  allcategories: any;
  errMsg: any
  errMsgToggle: boolean = true;
  isUploading: boolean = false;

  // wallpaper
  displayName?: string;
  category?: string;
  downloads?: number;
  views?: number;

  // banner
  type?: string;

  // category
  categoryName?: string;

  constructor(public _router: Router, public _location: Location, private postService: PostService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.postService.getAllCategories().subscribe((retrievedData) => {
      this.allcategories = retrievedData.data;
      this.category = this.allcategories[0]._id;
      this.isPremium = false;
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
    this.isUploading = true;
    let categorySearch = "";
    let user = this.allcategories.find((user: { _id: any; }) => user._id === form.value.category);
    categorySearch = user.categoryName;
    const formData = new FormData();
    formData.set('photo', this.fileToUploadWallPaper);
    formData.set('displayName', form.value.displayName);
    formData.set('category', form.value.category);
    formData.set('isPremium', form.value.isPremium);
    formData.set('downloads', form.value.downloads);
    formData.set('views', form.value.views);
    formData.set('categorySearch',categorySearch);
    this.postService.addWallpaper(formData).subscribe((resWallpaperData) => {
      if (resWallpaperData.success == true) {
        this.uploadFileWallpaper = true;
        this.postService.getitemData().subscribe();
        this.toastr.success(resWallpaperData.message, 'SUCCESS', {
          timeOut: 2000,
          positionClass: 'toast-bottom-center'
        })
        this._router.navigate(['admin/add_wallpaper']);
        this.wallPaperForm.reset();
        this.isUploading = false;
        this.ngOnInit();
      }
      else {
        this.toastr.error('Something Went Wrong', 'Error', {
          timeOut: 2000,
          positionClass: 'toast-bottom-center'
        })
        this.isUploading = false;
      }
    });
  }

  onSubmitbanner(formBanner: any) {
    this.isUploading = true;
    const formData = new FormData();
    formData.set('photo', this.fileToUploadBanner);
    formData.set('type', this.bannerteams.nativeElement.value);
    formData.set('category', formBanner.value.category);
    this.postService.addbanner(formData).subscribe((resBannerData) => {
      if (resBannerData.success == true) {
          this.uploadFileBanner = true;
          this.postService.getAllbanners().subscribe();
          this.toastr.success(resBannerData.message, 'SUCCESS', {
            timeOut: 3000,
            positionClass: 'toast-bottom-center'
          })
          this._router.navigate(['admin/add_wallpaper']);
          this.bannerForm.reset();
          this.isUploading = false;
      }
      else {
        this.toastr.error(resBannerData.message, 'Error', {
          timeOut: 4000,
          positionClass: 'toast-bottom-center'
        })
        this.isUploading = false;
      }
    });
  }

  onSubmitCategory(formCategory: any) {
    this.isUploading = true;
    const formData = new FormData();
    formData.set('photo', this.filetoUploadCategory);
    formData.set('categoryName', formCategory.value.categoryName);
    this.postService.addcategory(formData).subscribe((resCategoryData) => {
      if (resCategoryData.success == true) {
        this.uploadFilecategory = true;
        this.postService.getAllCategories().subscribe();
        this.ngOnInit();
        this.toastr.success(resCategoryData.message, 'SUCCESS', {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        })
        this._router.navigate(['admin/add_wallpaper']);
        this.categoryForm.reset();
        this.isUploading = false;
      }
      else {
        this.toastr.error(resCategoryData.message, 'Error', {
          timeOut: 4000,
          positionClass: 'toast-bottom-center'
        })
        this.isUploading = false;
      }
    });
  }
}
