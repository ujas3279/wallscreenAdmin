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
    this.postService.getitemData().subscribe((retrievedData) => {
      this.posts = retrievedData['data']['data'];
    })
  }

}
