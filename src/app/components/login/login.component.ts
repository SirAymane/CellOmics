import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  name = '';
  role = '';
  result = '';

  constructor(
    private serviceUser: UsersServiceService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  myForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  submit(): void {
    const flag = this.serviceUser.validateUser(
      this.myForm.value.username,
      this.myForm.value.password
    );

    if (flag) {
      // Set cookie with welcome message and expiration date
      const welcomeMessage = `Welcome, ${this.myForm.value.username}!`;
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 5); // 5 days from now
      this.cookieService.set('welcomeMessage', welcomeMessage, expirationDate);
      
      // Redirect to list-products route
      this.router.navigate(['/list-products']);
    } else {
      this.result = 'Incorrect credentials';
    }
  }

  checkLoginStatus(): void {
    if (this.cookieService.check('welcomeMessage')) {
      const welcomeMessage = this.cookieService.get('welcomeMessage');
      console.log(welcomeMessage); // Display the welcome message
    }
  }
}
