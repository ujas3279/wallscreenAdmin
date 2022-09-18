import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/post.service';
// import { Posts } from '../mock-posts';

@Component({
  selector: 'app-wall-paper-posts',
  templateUrl: './wall-paper-posts.component.html',
  styleUrls: ['./wall-paper-posts.component.css']
})
export class WallPaperPostsComponent implements OnInit {

  posts: any;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    // this.postService.getPosts().subscribe((retrievedData) => {
    //     this.posts = retrievedData;
    //     console.log("retrievedData: ", this.posts);
    // });

    this.postService.getitemData().subscribe((retrievedData) => {
      this.posts = retrievedData['data']['data'];
      // console.log("retrievedAllData: ", retrievedData['data']['data']);
      // console.log("retrievedAllData: ", retrievedData['data']['data'][0]);
    })
  }

}
