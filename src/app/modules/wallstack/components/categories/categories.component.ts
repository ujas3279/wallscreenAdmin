import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  allcategories: any;

  clickcategoryId?: string;
  editCategoryName?: string;
  editcategory_Id?: string;

  _id?: string;

  categoryName?: string;

  constructor(private postService: PostService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.postService.getAllCategories().subscribe((retrievedData) => {
      this.allcategories = retrievedData.data;
      // this._id = this.allcategories._id;
    })
  }

  onSubmitUpdateCategory(form: any) {
    const updatedPost = {
      categoryName: form.value.editCategoryName
    }
    this.postService.updateCategoryName(this.editcategory_Id, updatedPost).subscribe((resUpdateCategoryData) => {
      if (resUpdateCategoryData.success == true) {
        this.ngOnInit();
        this.toastr.success(resUpdateCategoryData.message, 'SUCCESS', {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        })
      }
      else {
        this.toastr.error(resUpdateCategoryData.message, 'ERROR', {
          timeOut: 4000,
          positionClass: 'toast-bottom-center'
        })
      }
    })
  }

  categoryId(category_Id: any) {
    this.clickcategoryId = category_Id;
  }

  editcategoryId(post: any) {
    this.editCategoryName = post.categoryName;
    this.editcategory_Id = post._id;
  }

  onDelete(id: any) {
    this.postService.deleteCategory(id).subscribe((resCategoryData) => {
      if (resCategoryData.success == true) {
        this.allcategories = this.allcategories.filter(
          (p: any) => p._id != id
        )
        this.toastr.success(resCategoryData.message, 'SUCCESS', {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        })
      }
      else {
        this.toastr.error(resCategoryData.message, 'ERROR', {
          timeOut: 4000,
          positionClass: 'toast-bottom-center'
        })
      }
    })
  }
}
