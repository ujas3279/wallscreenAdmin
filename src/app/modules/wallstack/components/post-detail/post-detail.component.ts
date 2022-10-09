import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  selectedPostData: any;
  route_id: any
  retrievedPostData: any;

  displayName?: string;
  id?: number;
  author?: string;
  category?: string;
  views?: number;
  downloads?: number;
  resolution?: string;
  size?: string;
  url?: string;
  isPremium? : boolean;
  collection?: string;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;

  editbuttonclicked: boolean = true;
  deleteButtonClicked: boolean = true;

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.route.params.subscribe((parameters) => this.postService.selectedWallpaperData(parameters['id'])
    .subscribe((res) => {
      this.displayName = res.data.displayName;
      this.category = res.data.category.categoryName;
      this.views = res.data.views;
      this.downloads = res.data.downloads;
      this.resolution = res.data.resolution;
      this.size = res.data.size;
      this.url = res.data.rawUrl;
      this.isPremium = res.data.isPremium;
      // collection = NONE
      this.createdAt = res.data.createdAt;
      this.updatedAt = res.data.updatedAt;
      this._id = res.data._id;
      this.route_id = res.data._id;
    }))
  }

  onSubmit(updateWallpaperFrom: any) {
    const formData = new FormData();
    formData.set('_id', this.route_id);
    formData.set('displayName', updateWallpaperFrom.value.displayName);
    formData.set('views', updateWallpaperFrom.value.views);
    formData.set('downloads', updateWallpaperFrom.value.downloads);
    formData.set('isPremium', updateWallpaperFrom.value.isPremium);
    this.postService.updateWallpaperPost(formData).subscribe((resUpdatedData) => {
      if (resUpdatedData.success == true) {
        this.editbuttonclicked = true;
        this.postService.getitemData().subscribe();
        this.toastr.success(resUpdatedData.message, 'SUCCESS', {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        })
      }
      else {
        this.toastr.error(resUpdatedData.message, 'Error', {
          timeOut: 4000,
          positionClass: 'toast-bottom-center'
        })
      }
    });
  }

  editButton() {
    this.editbuttonclicked = false;
  }

  onDelete(id: any) {
    this.postService.deleteWallpaper(id).subscribe((resDeleteData) => {
      if (resDeleteData.success == true) {
        this.postService.getitemData().subscribe();
        this.router.navigate(['/']);
        this.toastr.success(resDeleteData.message, 'SUCCESS', {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        })
      }
      else {
        this.toastr.error(resDeleteData.message, 'Error', {
          timeOut: 4000,
          positionClass: 'toast-bottom-center'
        })
      }
    });
  }

  cancel() {
    this.editbuttonclicked = true;
  }
}
