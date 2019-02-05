import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from '@angular/forms';
import { catchError, map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Injectable({ providedIn: 'root' })
export class UniqueNameproductValidator implements AsyncValidator {
  constructor(private productService: ProductService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.productService.getByName(ctrl.value).pipe(
      map(result => (result ? { uniqueProduct: true } : null)),
      catchError(() => null)
    );
  }
}

@Directive({
  selector: '[appUniqueNameproduct]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueNameproductValidator),
      multi: true
    }
  ]
})
export class UniqueNameproductValidatorDirective {
  constructor(private validator: UniqueNameproductValidator) {}

  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
