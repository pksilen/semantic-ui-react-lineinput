import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ValidationType } from '../validation/ValidationType';
import styleMap from '../styleMap';
import Validator from '../validation/Validator';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  countryCode: string;
  disabled: boolean;
  errorText: string;
  errorTextPosition: 'bottom' | 'right';
  maxLength?: number;
  maxValue?: number;
  minValue?: number;
  onValueChange: (value: string) => void;
  placeholder: string;
  size: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
  type: string;
  validation: ValidationType;
  value: string;
}

type State = {
  hasValidValue: boolean;
};

export default class LineInput extends React.Component<Props, {}> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static propTypes: { [key in keyof Props]: any } = {
    className: PropTypes.string,
    countryCode: PropTypes.string,
    disabled: PropTypes.bool,
    errorText: PropTypes.string,
    errorTextPosition: PropTypes.oneOf(['bottom', 'right']),
    maxLength: PropTypes.number,
    maxValue: PropTypes.number,
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
      PropTypes.instanceOf(RegExp),
      PropTypes.func
    ]),
    value: PropTypes.string.isRequired
  };

  static defaultProps = {
    className: undefined,
    countryCode: '',
    disabled: false,
    errorText: '',
    errorTextPosition: 'bottom',
    maxLength: undefined,
    maxValue: undefined,
    minValue: undefined,
    placeholder: '',
    size: 'small',
    type: 'text',
    validation: undefined
  };

  state: State = {
    hasValidValue: true
  };

  onInputBlur = () => {
    const { maxValue, minValue, validation, value } = this.props;

    if (validation) {
      const hasValidValue = Validator.validateValue(value, validation, minValue, maxValue);

      this.setState({
        hasValidValue
      });
    }
  };

  onInputFocus = () => {
    this.setState({
      hasValidValue: true
    });
  };

  onInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    const { onValueChange, validation } = this.props;

    if (validation === 'creditCardNumber') {
      const firstCreditCardNumberGroup = value.slice(0, 4);
      const secondCreditCardNumberGroup = ` ${value.slice(4, 8)}`;
      // noinspection MagicNumberJS
      const thirdCreditCardNumberGroup = ` ${value.slice(8, 12)}`;
      // noinspection MagicNumberJS
      const fourthCreditCardNumberGroup = ` ${value.slice(12, 16)}`;

      onValueChange(
        `${firstCreditCardNumberGroup}${
          secondCreditCardNumberGroup === ' ' ? '' : secondCreditCardNumberGroup
        }${thirdCreditCardNumberGroup === ' ' ? '' : thirdCreditCardNumberGroup}${
          fourthCreditCardNumberGroup === ' ' ? '' : fourthCreditCardNumberGroup
        }`
      );
    } else {
      onValueChange(value);
    }
  };

  render(): React.ReactElement {
    const {
      className,
      countryCode,
      disabled,
      errorText,
      errorTextPosition,
      minValue,
      maxLength,
      maxValue,
      onValueChange,
      placeholder,
      size,
      style,
      type,
      validation,
      value,
      ...restOfProps
    } = this.props;

    const { hasValidValue } = this.state;

    let combinedClassName = `ui input ${size}`;

    if (className) {
      combinedClassName = `${combinedClassName} ${className}`;
    }

    if (disabled) {
      combinedClassName = `${combinedClassName} disabled`;
    }

    let divStyle = errorTextPosition === 'bottom' ? styleMap.errorBottomDiv : {};

    if (style) {
      divStyle = {
        ...divStyle,
        ...style
      };
    }

    const inputStyle = hasValidValue ? styleMap.input : { ...styleMap.input, ...styleMap.errorInput };
    const labelStyle =
      errorTextPosition === 'bottom' ? styleMap.label : { ...styleMap.label, ...styleMap.rightLabel };

    // eslint-disable-next-line react/jsx-props-no-spreading
    return (
      <div className={combinedClassName} style={divStyle} {...restOfProps}>
        <input
          maxLength={maxLength}
          type={type}
          onBlur={this.onInputBlur}
          onFocus={this.onInputFocus}
          onChange={this.onInputChange}
          placeholder={placeholder}
          style={inputStyle}
          value={value}
        />
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
