import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  popularBanners: any;
  trendingBanners: any;
  newBanners: any;

  clickPopularBannerId?: string;
  clickTrendingBannerId?: string;
  clickNewBannerId?: string;

  constructor(private postService: PostService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.postService.getAllbanners().subscribe((bannerData) => {
      this.popularBanners = bannerData.data[0].data;
      this.trendingBanners = bannerData.data[1].data;
      this.newBanners = bannerData.data[2].data;
    });
  }

 async popularBannerId(popularBanner_id: any) {
    const willDelete = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this file?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result=>{

    if (result.isConfirmed) {
      this.postService.deleteBanner(popularBanner_id).subscribe(async (resTrendingData) => {
      if(resTrendingData.success){
        Swal.fire({title:"Deleted!", text:"Banner Deleted Successfully!", icon:"success",timer:1500,showConfirmButton: false});
        this.popularBanners = this.popularBanners.filter(
          (p: any) => p._id != popularBanner_id
        )
      }
      else{
        Swal.fire("ERROR", resTrendingData.message , "error");
      }
    })
    }
  }));
  }

  async trendingBannerId(trendingBanner_id: any) {
    const willDelete = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this file?",
      icon: "warning",
      showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
    }).then((result=>{

    if (result.isConfirmed) {
      this.postService.deleteBanner(trendingBanner_id).subscribe((resTrendingData) => {
      if(resTrendingData.success){
        Swal.fire({title:"Deleted!", text:"Banner Deleted Successfully!", icon:"success",timer:1500,showConfirmButton: false});
        this.trendingBanners = this.trendingBanners.filter(
          (p: any) => p._id != trendingBanner_id
        )
      }
      else{
        Swal.fire("ERROR", resTrendingData.message , "error");
      }
    })
    }
  }));
  }

  async newBannerId(newBanner_id: any) {
    const willDelete = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this file?",
      icon: "warning",
      showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
    }).then((result=>{

    if (result.isConfirmed) {
      this.postService.deleteBanner(newBanner_id).subscribe((resTrendingData) => {
      if(resTrendingData.success){
        Swal.fire({title:"Deleted!", text:"Banner Deleted Successfully!", icon:"success",timer:1500,showConfirmButton: false});
        this.newBanners = this.newBanners.filter(
          (p: any) => p._id != newBanner_id
        )
      }
      else{
        Swal.fire("ERROR", resTrendingData.message , "error");
      }
    })
    }
  }));
  }

}
