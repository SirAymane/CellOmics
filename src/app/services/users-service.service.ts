import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersServiceService {
  usersArray: User[] = [];
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private cookieService: CookieService, private router: Router) {
    this.getUsers(); // Call getUsers() to create random users
  }

  // These arrays are required to save the different options
  roles = ['Buyer', 'Admin', 'Staff'];
  civilstatus = ['Single', 'Married', 'Divorced'];
  gender = ['Male', 'Female', 'Other'];
  newsletter = ['', '', 'Accessories', 'Music'];

  getUsers() {
    // Add a known user for testing
    let knownUser: User = new User(
      'testUser',
      'testPassword',
      'Buyer',
      'testUser@mail.com',
      'Single',
      'Male',
      ['Music'],
      true
    );
    this.usersArray.push(knownUser);
    for (let i = 0; i < 49; i++) {

      let user: User = new User(
        'user' + (i + 1),
        'pass' + (i + 1),
        this.roles[Math.floor(Math.random() * this.roles.length)],
        'user' + (i + 1) + '@mail.com',
        this.civilstatus[Math.floor(Math.random() * this.civilstatus.length)],
        this.gender[Math.floor(Math.random() * this.gender.length)],
        [this.newsletter[Math.floor(Math.random() * this.newsletter.length)]],
        true
      );
      this.usersArray.push(user);
    }
  }

  // Validates username and password to return role.
  validateUser(usern: any, pass: any): boolean {
    let userExists = this.usersArray.find(user => user.username === usern && user.password === pass);
    if (userExists) {
      this.cookieService.set('username', userExists.username);
      this.cookieService.set('role', userExists.role);
      localStorage.setItem('myrole', userExists.role);
      this.currentUserSubject.next(userExists); // set the current user when login is successful
      return true;
    }
    this.currentUserSubject.next(null); // set null when login is unsuccessful
    return false;
  }

  doLogout() {
    this.currentUserSubject.next(null);
    localStorage.clear();
    this.cookieService.delete('username'); // clear username from cookie
    this.cookieService.delete('role'); // clear role from cookie
    this.router.navigate(['/home']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  registerUser(user2reg: User): any {
    this.usersArray.push(user2reg); // Then it is added to the array.
  }

  checkLocalStorage(): boolean {
    return localStorage.getItem('myrole') === null;
  }
}
