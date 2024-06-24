import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersServiceService } from './services/users-service.service'; // Assuming that this is the correct path to the UsersServiceService
import { CookieService } from 'ngx-cookie-service'; // Import CookieService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  welcomeMessage: string = 'Welcome!'; 
  isCartVisible: boolean = false;
  isCartDropdownVisible: boolean = false;


  constructor(private router: Router, private userService: UsersServiceService, private cookieService: CookieService) { }

  get userRole() {
    return localStorage.getItem('myrole');
  }

  ngOnInit() {
    this.userService.currentUser$.subscribe(user => {
      if (user) {
        localStorage.setItem('myrole', user.role);
      } else {
        localStorage.removeItem('myrole');
      }
    });
        // Check if the welcomeMessage cookie exists
        if (this.cookieService.check('welcomeMessage')) {
          this.welcomeMessage = this.cookieService.get('welcomeMessage');
        }
  }

  // Function for logout
  doLogout(){
    this.userService.doLogout();
  }  

  toggleCart(): void {
    this.isCartVisible = !this.isCartVisible;
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']); // Navigate to the full cart view
  }

  toggleCartDropdown(): void {
    this.isCartDropdownVisible = !this.isCartDropdownVisible;
  }
}

