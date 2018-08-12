import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  { path: 'bill-create', loadChildren: './pages/bill-create/bill-create.module#BillCreatePageModule' },
  { path: 'bill-detail', loadChildren: './pages/bill-detail/bill-detail.module#BillDetailPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'reset-password', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
