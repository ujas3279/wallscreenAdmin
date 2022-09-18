import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  popularBanners: any;
  trendingBanners: any;
  newBanners: any;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllbanners().subscribe((bannerData) => {
      this.popularBanners = bannerData.data[0].data;
      console.log("Popular Banner: ", this.popularBanners);
      this.trendingBanners = bannerData.data[1].data;
      console.log("trending banner: ", this.trendingBanners);
      this.newBanners = bannerData.data[2].data;
      console.log("New banner: ", this.newBanners);
    });
  }
}
