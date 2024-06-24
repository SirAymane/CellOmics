import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ValidateRepPassDirective } from './directives/validate-rep-pass.directive';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { CartComponent } from './components/cart/cart.component'; 
import { CartService } from './services/cart.service'; // Adjust the path as necessary
import { HttpClientModule } from '@angular/common/http';



// CookieService docs: 
// https://www.npmjs.com/package/ngx-cookie-service
import { CookieService } from 'ngx-cookie-service';

/* Cookies are great storage, but they require user comformity
We have been using them alternatively, for learning purposes
For the implementation, we will proceed with localStorage */ 

// Pagination docs :
// https://github.com/michaelbromley/ngx-pagination/blob/master/README.md
import {NgxPaginationModule} from 'ngx-pagination'; 
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { ContactFormComponent } from './components/contact-form.component';



@NgModule({
  declarations: [
    AppComponent,
    CartSummaryComponent,
    RegistrationComponent,
    LoginComponent,
    PageNotFoundComponent,
    ValidateRepPassDirective,
    ListProductsComponent,
    CartComponent,
    CartSummaryComponent,
    ContactFormComponent
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }