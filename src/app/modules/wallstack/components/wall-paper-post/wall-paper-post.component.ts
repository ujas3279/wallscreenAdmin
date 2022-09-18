import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-wall-paper-post',
  templateUrl: './wall-paper-post.component.html',
  styleUrls: ['./wall-paper-post.component.css']
})
export class WallPaperPostComponent implements OnInit {

  // @Input() post1: any;
  posts: any;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getitemData().subscribe((retrievedData) => {
      this.posts = retrievedData['data']['data'];
      // console.log("retrievedAllData: ", retrievedData['data']['data']);
      // console.log("retrievedAllData: ", retrievedData['data']['data'][0]);
    })
  }
}
