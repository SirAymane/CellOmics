import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { User } from 'src/app/model/User';
import { Province } from 'src/app/directives/province.validator'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  informacio: string[] = ['Music', 'Accessories', 'Apparel'];
  countries: string[] = ['Spain', 'United States', 'Canada'];
  myForm!: FormGroup;
  registerUserData!: User;
  result = '';

  constructor(
    private serviceUser: UsersServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      provincia: ['', [
        Province.getProvince(),
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^[A-Za-z]+$'),
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$'),
      ]],
      confirmPassword: ['', [Validators.required]],
      correo: ['', [
        Validators.required,
        Validators.email,
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern('^(6|93)\\d{8}$'),
      ]],
      gender: ['', [Validators.required]],
      country: ['', [Validators.required]],
      interests: [['Music', 'Accessories', 'Apparel']], // Initialize as empty array
      acceptTerms: ['', [Validators.requiredTrue]],
      submit: [false] 
    });
  }

  submit(): void {
    const isFormValid = this.myForm.valid;
    const acceptTermsControl = this.myForm.get('acceptTerms');
    const isAcceptTermsChecked = acceptTermsControl ? acceptTermsControl.value : false;

    // Check for form validity and whether terms are accepted
    if (!isFormValid || !isAcceptTermsChecked) {
      return;
    }

    // Assuming 'interests' is a FormArray with boolean values.
    const interestsControl = this.myForm.get('interests') as any;
    const selectedInterests = interestsControl ? 
                              interestsControl.value.filter((value: boolean) => value) : [];

    this.registerUserData = new User(
      this.myForm.value.username ?? '',
      this.myForm.value.password ?? '',
      'Buyer',
      this.myForm.value.correo ?? '',
      'civilStatus',
      this.myForm.value.gender ?? '',
      selectedInterests,
      !!isAcceptTermsChecked
    );

    this.serviceUser.registerUser(this.registerUserData);
    this.result = 'Registered successfully';

    this.router.navigate(['/login']);
  }
}


