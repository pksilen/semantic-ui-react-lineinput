import Validator from './Validator';

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

  it('should validate an url', () => {
    const isValidValue = Validator.validateValue('https://test.com', 'url');

    expect(isValidValue).toBe(true);
  });

  it('should validate an email address', () => {
    const isValidValue = Validator.validateValue('test@test.com', 'emailAddress');

    expect(isValidValue).toBe(true);
  });

  it('should validate a credit card number', () => {
    const isValidValue = Validator.validateValue('5252 4158 2380 3345', 'creditCardNumber');

    expect(isValidValue).toBe(true);
  });

  it('should validate a credit card expiration', () => {
    const isValidValue = Validator.validateValue('01 / 22', 'creditCardExpiration');

    expect(isValidValue).toBe(true);
  });

  it('should validate a credit card verification code without credit card number', () => {
    const isValidValue = Validator.validateValue('223', 'creditCardVerificationCode');

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

  it('should validate a number', () => {
    const isValidValue = Validator.validateValue('22.55', 'number');

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

  it('should validate an integer', () => {
    const isValidValue = Validator.validateValue('22', 'integer');

    expect(isValidValue).toBe(true);
  });

  it('should not validate a decimal number as integer', () => {
    const isValidValue = Validator.validateValue('22.55', 'integer');

    expect(isValidValue).toBe(false);
  });

  it('should validate an alphanumeric value', () => {
    const isValidValue = Validator.validateValue('abc123', 'alphaNumeric');

    expect(isValidValue).toBe(true);
  });

  it('should validate a US ZIP code', () => {
    const isValidValue = Validator.validateValue('03217', 'usZipCode');

    expect(isValidValue).toBe(true);
  });

  it('should validate a Canadian postal code', () => {
    const isValidValue = Validator.validateValue('K8N 5W6', 'caPostCode');

    expect(isValidValue).toBe(true);
  });

  it('should validate a UK post code', () => {
    const isValidValue = Validator.validateValue('EC1A 1BB', 'ukPostCode');

    expect(isValidValue).toBe(true);
  });

  it('should validate a phone number', () => {
    const isValidValue = Validator.validateValue('050-1234567', 'phoneNumber', undefined, undefined, 'FI');

    expect(isValidValue).toBe(true);
  });

  it('should validate a US Social Security Number', () => {
    const isValidValue = Validator.validateValue('017-90-7890', 'usSSN');

    expect(isValidValue).toBe(true);
  });

  it('should validate an IP address', () => {
    const isValidValue = Validator.validateValue('198.156.23.5', 'ipAddress');

    expect(isValidValue).toBe(true);
  });

  it('should validate an IPv4 address', () => {
    const isValidValue = Validator.validateValue('198.156.23.5', 'ipv4Address');

    expect(isValidValue).toBe(true);
  });

  it('should validate an IPv6 address', () => {
    const isValidValue = Validator.validateValue('2001:DB8:0:0:1::1', 'ipv6Address');

    expect(isValidValue).toBe(true);
  });

  it('should validate a hex color', () => {
    const isValidValue = Validator.validateValue('#e5e5e5', 'hexColor');

    expect(isValidValue).toBe(true);
  });
});
