import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  allcategories: any;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllCategories().subscribe((retrievedData) => {
      this.allcategories = retrievedData.data;
    })
  }

}
