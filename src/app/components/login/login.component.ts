import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name?: string
  password?: string

  constructor(private auth: AuthService, private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['admin'])
    }
  }

  onSubmit(form: any) {
    // check if form is valid or not
    if (form.valid) {
      // if form is valid, then we will submit form value inside login method of auth service,
      this.auth.login(form.value).subscribe(
        (result) => {
          this.router.navigate(['admin']);
          this.toastr.success("Login Successfull", 'SUCCESS', {
            timeOut: 2000,
            positionClass: 'toast-bottom-center'
          })
        },
        (err: Error) => {
          this.toastr.error('Incorrect Username or Password', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-bottom-center'
          })
        }
      )
    }
  }
}
