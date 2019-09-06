type PredefinedValidationType =
  | 'url'
  | 'emailAddress'
  | 'creditCardNumber'
  | 'creditCardExpiration'
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

export type ValidationType = PredefinedValidationType | RegExp | ValidationFunction;
