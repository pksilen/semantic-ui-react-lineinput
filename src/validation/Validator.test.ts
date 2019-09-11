import Validator from './Validator';
import { ValidationType } from './ValidationType';

describe('validateValue()', () => {
  it('should validate minLength', () => {
    const isValidValue = Validator.validateValue('123', () => true, undefined, undefined, undefined, 4);

    expect(isValidValue).toBe(false);
  });

  it('should validate using a validation function', () => {
    const isValidValue = Validator.validateValue('123', () => true);

    expect(isValidValue).toBe(true);
  });

  it('should validate using a string array', () => {
    const isValidValue = Validator.validateValue('XYZ', ['ABC', 'XYZ']);

    expect(isValidValue).toBe(true);
  });

  it('should validate using a regular expression', () => {
    const isValidValue = Validator.validateValue('123', /^\d{3}$/);

    expect(isValidValue).toBe(true);
  });

  it('should validate a credit card verification code with credit card number', () => {
    const isValidValue = Validator.validateValue(
      '223',
      'creditCardVerificationCode',
      undefined,
      undefined,
      undefined,
      undefined,
      '5252 4158 2380 3345'
    );

    expect(isValidValue).toBe(true);
  });

  it('should not validate a number less than minValue', () => {
    const isValidValue = Validator.validateValue('22.55', 'number', 30);

    expect(isValidValue).toBe(false);
  });

  it('should not validate a number greater than maxValue', () => {
    const isValidValue = Validator.validateValue('22.55', 'number', 10, 20);

    expect(isValidValue).toBe(false);
  });

  it('should validate a number between minValue and maxValue', () => {
    const isValidValue = Validator.validateValue('15.5', 'number', 10, 20);

    expect(isValidValue).toBe(true);
  });

  it('should not validate a decimal number as integer', () => {
    const isValidValue = Validator.validateValue('22.55', 'integer');

    expect(isValidValue).toBe(false);
  });

  it('should validate a phone number', () => {
    const isValidValue = Validator.validateValue('050-1234567', 'phoneNumber', undefined, undefined, 'FI');

    expect(isValidValue).toBe(true);
  });

  test.each([
    ['https://test.com', 'url'],
    ['test@test.com', 'emailAddress'],
    ['5252 4158 2380 3345', 'creditCardNumber'],
    ['01 / 22', 'creditCardExpiration'],
    ['223', 'creditCardVerificationCode'],
    ['22.55', 'number'],
    ['22', 'integer'],
    ['abc123', 'alphaNumeric'],
    ['03217', 'usZipCode'],
    ['K8N 5W6', 'caPostCode'],
    ['EC1A 1BB', 'ukPostCode'],
    ['017-90-7890', 'usSSN'],
    ['198.156.23.5', 'ipAddress'],
    ['198.156.23.5', 'ipv4Address'],
    ['2001:DB8:0:0:1::1', 'ipv6Address'],
    ['#e5e5e5', 'hexColor']
  ])('it should validate successfully using a predefined validator', (valueString, validation) => {
    const isValidValue = Validator.validateValue(valueString, validation as ValidationType);

    expect(isValidValue).toBe(true);
  });
});
