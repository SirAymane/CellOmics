import { Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appValidateRepPass]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidateRepPassDirective, multi: true}]
})
export class ValidateRepPassDirective {

  @Input() params: any;
  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {

    if (control && control.value!= this.params) {
      return {
        'samePass': true
      }  
    }else{
      return null
    }
  }
}
