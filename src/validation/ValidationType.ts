type PredefinedValidationType =
  | 'url'
  | 'emailAddress'
  | 'creditCardNumber'
  | 'creditCardExpiration'
  | 'creditCardVerificationCode'
  | 'number'
  | 'integer'
  | 'alphaNumeric'
  | 'usZipCode'
  | 'caPostCode'
  | 'ukPostCode'
  | 'phoneNumber'
  | 'usSSN'
  | 'ipAddress'
  | 'ipv4Address'
  | 'ipv6Address'
  | 'hexColor';

type ValidationFunction = (inputString: string) => boolean;

export type ValidationType = PredefinedValidationType | string[] | RegExp | ValidationFunction;
