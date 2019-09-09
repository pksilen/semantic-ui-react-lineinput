import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Icon, SemanticCOLORS, SemanticICONS } from 'semantic-ui-react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import cardsy from 'cardsy';
// eslint-disable-next-line import/no-named-default
import { default as getCreditCardType } from 'credit-card-type';
import { ValidationType } from '../validation/ValidationType';
import styleMap from '../styleMap';
import Validator from '../validation/Validator';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  allowEmptyValue: boolean;
  className?: string;
  countryCode: string;
  disabled: boolean;
  errorText: string;
  errorTextPosition: 'bottom' | 'right';
  icon: SemanticICONS;
  iconColor: SemanticCOLORS;
  iconPosition: 'left' | 'right';
  maxLength?: number;
  maxValue?: number;
  minLength?: number;
  minValue?: number;
  onValueChange: (value: string) => void;
  placeholder: string;
  size: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
  type: string;
  validation?: ValidationType;
  validationSuccessIcon: SemanticICONS;
  validationErrorIcon: SemanticICONS;
  value: string;
}

type State = {
  hasValidValue: boolean;
  hasFocus: boolean;
  hasFocused: boolean;
};

export default class LineInput extends React.Component<Props, {}> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static propTypes: { [key in keyof Props]: any } = {
    allowEmptyValue: PropTypes.bool,
    className: PropTypes.string,
    countryCode: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    iconColor: PropTypes.string,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    errorText: PropTypes.string,
    errorTextPosition: PropTypes.oneOf(['bottom', 'right']),
    maxLength: PropTypes.number,
    maxValue: PropTypes.number,
    minLength: PropTypes.number,
    minValue: PropTypes.number,
    onValueChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
    type: PropTypes.string,
    validation: PropTypes.oneOfType([
      PropTypes.oneOf([
        'url',
        'emailAddress',
        'creditCardNumber',
        'creditCardExpiration',
        'creditCardVerificationCode',
        'number',
        'integer',
        'alphaNumeric',
        'usZipCode',
        'caPostCode',
        'ukPostCode',
        'phoneNumber',
        'usSSN',
        'ipAddress',
        'ipv4Address',
        'ipv6Address',
        'hexColor'
      ]),
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.instanceOf(RegExp),
      PropTypes.func
    ]),
    validationErrorIcon: PropTypes.string,
    validationSuccessIcon: PropTypes.string,
    value: PropTypes.string.isRequired
  };

  static defaultProps = {
    allowEmptyValue: false,
    className: undefined,
    countryCode: '',
    disabled: false,
    errorText: '',
    errorTextPosition: 'bottom',
    icon: '',
    iconColor: '',
    iconPosition: 'left',
    maxLength: undefined,
    maxValue: undefined,
    minLength: undefined,
    minValue: undefined,
    placeholder: '',
    size: 'small',
    type: undefined,
    validation: undefined,
    validationErrorIcon: '',
    validationSuccessIcon: ''
  };

  state: State = {
    hasValidValue: true,
    hasFocus: false,
    hasFocused: false
  };

  onInputBlur = () => {
    const { allowEmptyValue, countryCode, maxValue, minLength, minValue, validation, value } = this.props;

    if (allowEmptyValue && !value) {
      return;
    }

    if (validation) {
      const hasValidValue = Validator.validateValue(
        value,
        validation,
        minValue,
        maxValue,
        countryCode,
        minLength
      );

      this.setState({
        hasValidValue,
        hasFocus: false
      });
    }
  };

  onInputFocus = () => {
    this.setState({
      hasValidValue: true,
      hasFocus: true,
      hasFocused: true
    });
  };

  onInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    const { onValueChange, validation } = this.props;

    if (validation === 'creditCardNumber') {
      onValueChange(cardsy.format.number(value));
    } else if (validation === 'creditCardExpiration') {
      onValueChange(cardsy.format.expiryString(value));
    } else if (validation === 'creditCardVerificationCode') {
      onValueChange(cardsy.format.cvc(value));
    } else {
      onValueChange(value);
    }
  };

  getInputType = (): string => {
    const { type, validation } = this.props;

    if (type) {
      return type;
    }

    switch (validation) {
      case 'emailAddress':
        return 'email';

      case 'phoneNumber':
        return 'tel';

      case 'url':
        return 'url';

      default:
        return 'text';
    }
  };

  // noinspection OverlyComplexFunctionJS
  getIconName = (): SemanticICONS => {
    const { icon, validation, validationErrorIcon, validationSuccessIcon, value } = this.props;
    const { hasFocus, hasFocused, hasValidValue } = this.state;

    if (validationErrorIcon && !hasValidValue) {
      return hasFocus || !hasFocused ? ('' as SemanticICONS) : validationErrorIcon;
    }

    if (validationSuccessIcon && hasValidValue) {
      return hasFocus || !hasFocused ? ('' as SemanticICONS) : validationSuccessIcon;
    }

    if (validation === 'creditCardNumber' && value) {
      const creditCardTypes = getCreditCardType(value);
      const creditCardType = creditCardTypes && creditCardTypes[0] ? creditCardTypes[0].niceType : '';

      switch (creditCardType) {
        case 'Visa':
          return 'cc visa';

        case 'Mastercard':
          return 'cc mastercard';

        case 'American Express':
          return 'cc amex';

        case 'Diners Club':
          return 'cc diners club';

        case 'Discover':
          return 'cc discover';

        case 'JCB':
          return 'cc jcb';

        default:
          return 'credit card';
      }
    }

    return icon;
  };

  getIconColor = () => {
    const { iconColor, validationErrorIcon, validationSuccessIcon } = this.props;
    const { hasFocus, hasValidValue } = this.state;

    const hasValidationIcon = !hasFocus && (validationErrorIcon || validationSuccessIcon);

    if (hasValidationIcon && hasValidValue) {
      return 'green';
    }

    if (hasValidationIcon && !hasValidValue) {
      return 'red';
    }

    return iconColor;
  };

  render(): React.ReactElement {
    const {
      allowEmptyValue,
      countryCode,
      disabled,
      errorText,
      errorTextPosition,
      icon,
      iconColor,
      iconPosition,
      minLength,
      minValue,
      maxLength,
      maxValue,
      onValueChange,
      placeholder,
      size,
      style,
      type,
      validation,
      validationErrorIcon,
      validationSuccessIcon,
      value,
      ...restOfProps
    } = this.props;

    const { hasValidValue } = this.state;
    let combinedClassName = `ui input ${size}`;

    const hasValidationIcon = validationErrorIcon || validationSuccessIcon;
    const hasCreditCardIcon = validation === 'creditCardNumber' && value;
    const hasIcon = icon || hasValidationIcon || hasCreditCardIcon;

    if (hasIcon) {
      combinedClassName = `${combinedClassName} ${hasValidationIcon ? 'right' : iconPosition} icon`;
    }

    if (disabled) {
      combinedClassName = `${combinedClassName} disabled`;
    }

    const topDivStyle =
      errorTextPosition === 'bottom'
        ? { ...styleMap.topDiv, ...styleMap.topDivWhenErrorAtBottom }
        : styleMap.topDiv;

    const inputStyle = hasValidValue ? styleMap.input : { ...styleMap.input, ...styleMap.errorInput };
    const labelStyle =
      errorTextPosition === 'bottom' ? styleMap.label : { ...styleMap.label, ...styleMap.rightLabel };
    const iconStyle = hasValidationIcon ? styleMap.validationIcon : {};

    // eslint-disable-next-line react/jsx-props-no-spreading
    return (
      <div style={topDivStyle} {...restOfProps}>
        <div className={combinedClassName}>
          <input
            maxLength={maxLength}
            type={this.getInputType()}
            onBlur={this.onInputBlur}
            onFocus={this.onInputFocus}
            onChange={this.onInputChange}
            placeholder={placeholder}
            style={inputStyle}
            value={value}
          />
          {hasIcon ? (
            <Icon color={this.getIconColor()} name={this.getIconName()} style={iconStyle} />
          ) : (
            undefined
          )}
        </div>
        {!hasValidValue && errorText ? (
          <div className={`ui label ${size}`} style={labelStyle}>
            {errorText}
          </div>
        ) : (
          undefined
        )}
      </div>
    );
  }
}
