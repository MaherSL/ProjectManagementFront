import { AbstractControl } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Tproduct } from '../entity/Tproduct';

export class ValidateNameProductNotTaken {
  static createValidator(productService: ProductService) {
    return (control: AbstractControl) => {
      let product: Tproduct;
      let success: boolean = false;
      productService.getByName(control.value).subscribe(
        data => {
          product = data;
          if (product == null) return null;
          else
            return { productTaken: true };
        },
        error => {
          //this.alertService.error(JSON.stringify(error));
          //this.loading = false;

        });
    };
  }
}
