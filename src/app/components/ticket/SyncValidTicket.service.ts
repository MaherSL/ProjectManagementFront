export class SyncValidTicket {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
      let config = {
        'required': 'Required',
        'invalidCreditCard': 'Is invalid credit card number',
        'invalidEmailAddress': 'Invalid email address',
        'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
        'minlength': `Minimum length ${validatorValue.requiredLength}`,
        'ticketTaken':'😢 Oh noes, ce de ticket existe déja!'
      };
  
      return config[validatorName];
    }
  
    static ValueValidator(control) {
      // RFC 2822 compliant regex
      console.log(control.value);
      if(control.value=="false"){
      return { 'ticketValueError': true };
      }
      return null;
      /*if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        return null;
      } else {
        return { 'invalidEmailAddress': true };
      }*/
    }
  }
  