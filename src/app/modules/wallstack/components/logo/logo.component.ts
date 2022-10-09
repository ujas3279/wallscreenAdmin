import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import Swal from 'sweetalert2';
import { PostService } from 'src/app/services/post.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  constructor(private auth: AuthService, private toastr: ToastrService, private postService: PostService) { }

  banner?: string;
  fullBanner?: string;
  getCreateData: any;

  ngOnInit(): void {
    this.postService.getKeyData().subscribe((retreivedKeyData) => {
      this.getCreateData = retreivedKeyData;
      this.banner = retreivedKeyData.banner;
      this.fullBanner = retreivedKeyData.fullBanner;
    })
  }

  onSubmitGetCreateKey(form: any) {
    const updatedGetCreateKey = {
      banner: form.value.banner,
      fullBanner: form.value.fullBanner
    }
    this.postService.postKeyData(updatedGetCreateKey).subscribe((resUpdateKeyData) => {
      if (resUpdateKeyData.success == true) {
        this.toastr.success(resUpdateKeyData.message, 'SUCCESS', {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        })
      }
      else {
        this.toastr.error("Something Went Wrong", 'ERROR', {
          timeOut: 4000,
          positionClass: 'toast-bottom-center'
        })
      }
    })
  }

  async logout() {
    const willDelete = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure that you want to Logout?",
      icon: "warning",
      showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes,Logout'
    }).then((result=>{

    if (result.isConfirmed) {
        this.auth.logout();
        Swal.fire({title:"Success", text: "Logout Successfull", icon:"success",timer:2000,showConfirmButton: false,});
      }
    }))
  }
}
