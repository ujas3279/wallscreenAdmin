import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) { }

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
    this.postService.updateWallpaperPost(formData).subscribe();
    this.postService.getitemData();
  }

  editButton() {
    this.editbuttonclicked = false;
  }

  onDelete(id: any) {
    this.postService.deleteWallpaper(id).subscribe();
    this.postService.getitemData().subscribe();
  }

  cancel() {
    this.editbuttonclicked = true;
  }
}
