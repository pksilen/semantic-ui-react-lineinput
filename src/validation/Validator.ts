// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import is from 'is_js';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import getBrowserLocale from 'browser-locale';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import cardsy from 'cardsy';
import { parsePhoneNumberFromString } from 'libphonenumber-js/max';
import { ValidationType } from './ValidationType';

export default class Validator {
  // noinspection FunctionWithMoreThanThreeNegationsJS,OverlyComplexFunctionJS
  // eslint-disable-next-line consistent-return
  static validateValue(
    valueString: string,
    validation: ValidationType,
    minValue?: number,
    maxValue?: number,
    suppliedCountryCode?: string,
    minLength?: number
  ): boolean {
    if (minLength !== undefined && valueString.length < minLength)  {
      return false;
    }

    if (typeof validation === 'function') {
      return validation(valueString);
    }

    if (Array.isArray(validation)) {
      return validation.includes(valueString);
    }

    if (typeof validation === 'object') {
      return !!valueString.match(validation);
    }

    let valueAsNumber = 0;
    if (validation === 'number') {
      valueAsNumber = parseFloat(valueString);
    } else if (validation === 'integer') {
      if (valueString.includes('.')) {
        valueAsNumber = NaN;
      } else {
        valueAsNumber = parseInt(valueString, 10);
      }
    }

    const countryCode = suppliedCountryCode || getBrowserLocale().split('-')[1];

    switch (validation) {
      case 'url':
        return is.url(valueString);

      case 'emailAddress':
        return is.email(valueString);

      case 'creditCardNumber':
        return is.creditCard(valueString.replace(/\s/g, ''));

      case 'creditCardExpiration':
        return cardsy.validate.expiryString(valueString);

      case 'creditCardVerificationCode':
        return !!valueString.match(/^\d{3,4}$/);

      case 'number':
      case 'integer':
        return (
          !Number.isNaN(valueAsNumber) &&
          (minValue === undefined || valueAsNumber >= minValue) &&
          (maxValue === undefined || valueAsNumber <= maxValue)
        );

      case 'alphaNumeric':
        return is.alphaNumeric(valueString);

      case 'usZipCode':
        return is.usZipCode(valueString);

      case 'caPostCode':
        return is.caPostalCode(valueString);

      case 'ukPostCode':
        return is.ukPostCode(valueString);

      case 'phoneNumber':
        return !!parsePhoneNumberFromString(valueString, countryCode);

      case 'usSSN':
        return is.socialSecurityNumber(valueString);

      case 'ipAddress':
        return is.ip(valueString);

      case 'ipv4Address':
        return is.ipv4(valueString);

      case 'ipv6Address':
        return is.ipv6(valueString);

      case 'hexColor':
        return is.hexColor(valueString);

      // no default
    }
  }
}
