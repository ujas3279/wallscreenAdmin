import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "forgot-password", component: ForgotpasswordComponent },
  // if no route is present then redirect to login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // adding lazy load module - if user is going to visit this route then only we are going to load this module
  { path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/wallstack/wallstack.module').then((m) =>  m.WallstackModule),
  },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
