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
  creditCardNumber: string;
  disabled: boolean;
  errorText: string;
  errorTextPosition: 'bottom' | 'right';
  focus: boolean;
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
  hasBeenFocused: boolean;
};

export default class LineInput extends React.Component<Props, {}> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static propTypes: { [key in keyof Props]: any } = {
    allowEmptyValue: PropTypes.bool,
    className: PropTypes.string,
    countryCode: PropTypes.string,
    creditCardNumber: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    iconColor: PropTypes.string,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    errorText: PropTypes.string,
    errorTextPosition: PropTypes.oneOf(['bottom', 'right']),
    focus: PropTypes.bool,
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
    creditCardNumber: '',
    disabled: false,
    errorText: '',
    errorTextPosition: 'bottom',
    focus: false,
    icon: '',
    iconColor: undefined,
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
    hasBeenFocused: false
  };

  onInputBlur = () => {
    const {
      allowEmptyValue,
      countryCode,
      creditCardNumber,
      maxValue,
      minLength,
      minValue,
      validation,
      value
    } = this.props;

    this.setState({
      hasFocus: false
    });

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
        minLength,
        creditCardNumber
      );

      this.setState({
        hasValidValue
      });
    }
  };

  onInputFocus = () => {
    this.setState({
      hasValidValue: true,
      hasFocus: true,
      hasBeenFocused: true
    });
  };

  onInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    const { onValueChange, validation } = this.props;

    if (validation === 'creditCardNumber') {
      onValueChange(cardsy.format.number(value));
    } else if (validation === 'creditCardExpiration') {
      const expiryRegExp = /^(\d{2})\/(\d{2})$/;
      const expiryMatches = value.match(expiryRegExp);
      const expiryStr = expiryMatches ? `${expiryMatches[1]} / ${expiryMatches[2]}` : value;
      onValueChange(cardsy.format.expiryString(expiryStr));
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
    const { hasFocus, hasBeenFocused, hasValidValue } = this.state;

    if (validationErrorIcon && !hasValidValue) {
      return hasFocus ? ('' as SemanticICONS) : validationErrorIcon;
    }

    if (validationSuccessIcon && hasValidValue) {
      return hasFocus || !hasBeenFocused ? ('' as SemanticICONS) : validationSuccessIcon;
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

  hasIcon = () => {
    const { icon, validation, validationErrorIcon, validationSuccessIcon, value } = this.props;

    const hasValidationIcon = validationErrorIcon || validationSuccessIcon;
    const hasCreditCardIcon = validation === 'creditCardNumber' && value;

    return icon || hasValidationIcon || hasCreditCardIcon;
  };

  getClassName = () => {
    const { disabled, focus, iconPosition, size, validationErrorIcon, validationSuccessIcon } = this.props;

    let className = `ui input ${size}`;

    if (this.hasIcon()) {
      className = `${className} ${
        validationErrorIcon || validationSuccessIcon ? 'right' : iconPosition
      } icon`;
    }

    if (disabled) {
      className = `${className} disabled`;
    }

    if (focus) {
      className = `${className} focus`;
    }

    return className;
  };

  render(): React.ReactElement {
    const {
      allowEmptyValue,
      countryCode,
      creditCardNumber,
      disabled,
      errorText,
      errorTextPosition,
      focus,
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

    const topDivStyle =
      errorTextPosition === 'bottom'
        ? { ...styleMap.topDiv, ...styleMap.topDivWhenErrorAtBottom }
        : styleMap.topDiv;

    const inputStyle = hasValidValue ? styleMap.input : { ...styleMap.input, ...styleMap.errorInput };
    const labelStyle =
      errorTextPosition === 'bottom' ? styleMap.label : { ...styleMap.label, ...styleMap.rightLabel };
    const iconStyle = validationErrorIcon || validationSuccessIcon ? styleMap.validationIcon : {};

    // eslint-disable-next-line react/jsx-props-no-spreading
    return (
      <div style={topDivStyle} {...restOfProps}>
        <div className={this.getClassName()}>
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
          {this.hasIcon() ? (
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
