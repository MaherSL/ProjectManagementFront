import { Directive, forwardRef, Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs';
import { ViewService } from './services/view.service';
import { catchError, map } from 'rxjs/operators';

@Directive({
  selector: '[uniqueNameview]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UniqueNameviewValidatorDirective, multi: true }]
})
@Injectable({ providedIn: 'root' })
export class UniqueNameviewValidatorDirective implements AsyncValidator {

  constructor(private viewService: ViewService) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    return this.viewService.getViewByName(c.value).pipe(
      map(viewlist => {
        return viewlist ? { 'uniqueNameview': true } : null;
      })
    );



  }

}
