import {AbstractControl} from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class EnabledProdValidator {

  static validate(maxNumber: number) {
    return (control: AbstractControl): { [key: string]: boolean } => {
      if (!control.value || 0 === control.value.length) {
        return null;
      }

      if (control.value <= maxNumber) {
        return null;
      }
      return {'notEnabledValue': true};
    };
  }

}