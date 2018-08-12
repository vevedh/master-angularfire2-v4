import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard],
  },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  {
    path: 'bill-create',
    loadChildren: './pages/bill-create/bill-create.module#BillCreatePageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'bill-detail/:id',
    loadChildren: './pages/bill-detail/bill-detail.module#BillDetailPageModule',
    canActivate: [AuthGuard],
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'reset-password',
    loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule',
  },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
