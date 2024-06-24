import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { CartComponent } from './components/cart/cart.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component'; // Import the ContactFormComponent

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'list-products',
    component: ListProductsComponent,
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'contact-form', // Ensure that the path is correctly defined
    component: ContactFormComponent // Ensure that the ContactFormComponent is correctly mapped
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
