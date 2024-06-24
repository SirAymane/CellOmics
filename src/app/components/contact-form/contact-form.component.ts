import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


// Custom validator function for "Província" field
function provinciaValidator(control: AbstractControl): ValidationErrors | null {
  const provincies = ['Barcelona', 'Tarragona', 'Girona'];
  return provincies.includes(control.value) ? null : { provincia: true };
}


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup = new FormGroup({});

  // Define the options for the "Tipus consulta" select field
  tipusConsultes = ['Info', 'Comprar', 'Devolució'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // Initialize the form with form controls and validators
    this.contactForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(6)]],
      tipusConsulta: ['', Validators.required],
      provincia: ['', [Validators.required, provinciaValidator]],
      acceptarPolitiques: [false, Validators.requiredTrue]
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.contactForm.controls; }

  onSubmit() {
    // Display form values on submission (for testing purposes)
    console.log(this.contactForm.value);
  }
}
