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
import {PredefinedValidationType, ValidationType} from './ValidationType';

export default class Validator {
  static validateValue(
    valueString: string,
    validation: ValidationType,
    minValue?: number,
    maxValue?: number,
    suppliedCountryCode?: string,
    minLength?: number,
    creditCardNumber?: string
  ): boolean {
    if (minLength !== undefined && valueString.length < minLength) {
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

    return Validator.validateValueWithPredefinedValidation(
      valueString,
      validation,
      minValue,
      maxValue,
      suppliedCountryCode,
      creditCardNumber
    );
  }

  // eslint-disable-next-line consistent-return
  private static validateValueWithPredefinedValidation(
    valueString: string,
    validation: PredefinedValidationType,
    minValue?: number,
    maxValue?: number,
    suppliedCountryCode?: string,
    creditCardNumber?: string
  ): boolean {
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
        return cardsy.validate.number(valueString.replace(/\s/g, ''));

      case 'creditCardExpiration':
        return cardsy.validate.expiryString(valueString);

      case 'creditCardVerificationCode':
        return creditCardNumber
          ? cardsy.validate.cvc(valueString, cardsy.getType(creditCardNumber.replace(/\s/g, '')))
          : valueString.match(/^\d{3,4}$/) !== null;

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
        return parsePhoneNumberFromString(valueString, countryCode) !== undefined;

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
