import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import { mount, shallow as renderShallow } from 'enzyme';
import LineInput from './LineInput';
import { ValidationType } from '../validation/ValidationType';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let onValueChangeMock: any;

beforeEach(() => {
  onValueChangeMock = jest.fn();
});

describe('propTypes', () => {
  it('should validate prop types', () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = LineInput;

    expect(propTypes.allowEmptyValue).toBe(PropTypes.bool);
    expect(propTypes.className).toBe(PropTypes.string);
    expect(propTypes.countryCode).toBe(PropTypes.string);
    expect(propTypes.disabled).toBe(PropTypes.bool);
    expect(propTypes.errorText).toBe(PropTypes.string);
    expect(propTypes.errorTextPosition).toBeTruthy();
    expect(propTypes.icon).toBe(PropTypes.string);
    expect(propTypes.iconColor).toBe(PropTypes.string);
    expect(propTypes.iconPosition).toBeTruthy();
    expect(propTypes.maxLength).toBe(PropTypes.number);
    expect(propTypes.maxValue).toBe(PropTypes.number);
    expect(propTypes.minLength).toBe(PropTypes.number);
    expect(propTypes.minValue).toBe(PropTypes.number);
    expect(propTypes.onValueChange).toBe(PropTypes.func.isRequired);
    expect(propTypes.placeholder).toBe(PropTypes.string);
    expect(propTypes.size).toBeTruthy();
    expect(propTypes.type).toBe(PropTypes.string);
    expect(propTypes.validation).toBeTruthy();
    expect(propTypes.validationErrorIcon).toBe(PropTypes.string);
    expect(propTypes.validationSuccessIcon).toBe(PropTypes.string);
    expect(propTypes.value).toBe(PropTypes.string.isRequired);
  });
});

describe('defaultProps', () => {
  it('should set default values for optional props', () => {
    const lineInputWrapper = mount(<LineInput onValueChange={onValueChangeMock} value="abc" />);

    expect(lineInputWrapper.props().allowEmptyValue).toBe(false);
    expect(lineInputWrapper.props().className).toBe(undefined);
    expect(lineInputWrapper.props().countryCode).toBe('');
    expect(lineInputWrapper.props().disabled).toBe(false);
    expect(lineInputWrapper.props().errorText).toBe('');
    expect(lineInputWrapper.props().errorTextPosition).toBe('bottom');
    expect(lineInputWrapper.props().icon).toBe('');
    expect(lineInputWrapper.props().iconColor).toBe(undefined);
    expect(lineInputWrapper.props().iconPosition).toBe('left');
    expect(lineInputWrapper.props().maxLength).toBe(undefined);
    expect(lineInputWrapper.props().maxValue).toBe(undefined);
    expect(lineInputWrapper.props().minLength).toBe(undefined);
    expect(lineInputWrapper.props().minValue).toBe(undefined);
    expect(lineInputWrapper.props().placeholder).toBe('');
    expect(lineInputWrapper.props().size).toBe('small');
    expect(lineInputWrapper.props().type).toBe(undefined);
    expect(lineInputWrapper.props().validation).toBe(undefined);
    expect(lineInputWrapper.props().validationErrorIcon).toBe('');
    expect(lineInputWrapper.props().validationSuccessIcon).toBe('');
  });
});

describe('state', () => {
  it('should set initial state', () => {
    const lineInputWrapper = mount(<LineInput onValueChange={onValueChangeMock} value="abc" />);

    expect(lineInputWrapper.state('hasValidValue')).toBe(true);
    expect(lineInputWrapper.state('hasFocus')).toBe(false);
    expect(lineInputWrapper.state('hasBeenFocused')).toBe(false);
  });
});

describe('onInputBlur', () => {
  it('it should set hasValidValue in state to true, if no validation is provided', () => {
    const lineInputWrapper = mount(<LineInput onValueChange={onValueChangeMock} value="abc" />);
    const inputWrapper = lineInputWrapper.find('input');

    inputWrapper.simulate('focus');
    inputWrapper.simulate('blur');

    expect(lineInputWrapper.state('hasValidValue')).toBe(true);
  });

  it('it should set hasValidValue in state to true, if validation is successful', () => {
    const lineInputWrapper = mount(
      <LineInput onValueChange={onValueChangeMock} validation="number" value="123" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    inputWrapper.simulate('focus');
    inputWrapper.simulate('blur');

    expect(lineInputWrapper.state('hasValidValue')).toBe(true);
  });

  it('it should not validate, if value is empty and allowEmptyValue is true', () => {
    const lineInputWrapper = mount(
      <LineInput allowEmptyValue onValueChange={onValueChangeMock} validation="number" value="" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    inputWrapper.simulate('focus');
    inputWrapper.simulate('blur');

    expect(lineInputWrapper.state('hasValidValue')).toBe(true);
  });

  it('it should set hasValidValue in state to false and show error in input, if validation fails', () => {
    const lineInputWrapper = mount(
      <LineInput onValueChange={onValueChangeMock} validation="number" value="abc" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    inputWrapper.simulate('focus');
    inputWrapper.simulate('blur');
    lineInputWrapper.update();
    const newInputWrapper = lineInputWrapper.find('input');

    expect(lineInputWrapper.state('hasValidValue')).toBe(false);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(newInputWrapper.props().style.borderBottomColor).toBe('red');
  });

  it('it should show errorText, if validation fails', () => {
    const lineInputWrapper = mount(
      <LineInput errorText="errorText" onValueChange={onValueChangeMock} validation="number" value="abc" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    inputWrapper.simulate('focus');
    inputWrapper.simulate('blur');
    lineInputWrapper.update();

    const labelWrapper = lineInputWrapper.find('div.label');
    expect(labelWrapper).toBeTruthy();
  });

  it('it should show errorText, if validation fails', () => {
    const lineInputWrapper = mount(
      <LineInput errorText="errorText" onValueChange={onValueChangeMock} validation="number" value="abc" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    inputWrapper.simulate('focus');
    inputWrapper.simulate('blur');
    lineInputWrapper.update();

    const divWrapper = lineInputWrapper.find('div').first();
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(divWrapper.props().style.flexDirection).toBe('column');
    const labelWrapper = lineInputWrapper.find('div.label');
    expect(labelWrapper).toBeTruthy();
  });
});

describe('onInputFocus', () => {
  it('should modify state correctly', () => {
    const lineInputWrapper = mount(
      <LineInput onValueChange={onValueChangeMock} validation="number" value="abc" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    lineInputWrapper.setState({ hasValidValue: false });
    inputWrapper.simulate('focus');

    expect(lineInputWrapper.state('hasValidValue')).toBe(true);
    expect(lineInputWrapper.state('hasFocus')).toBe(true);
    expect(lineInputWrapper.state('hasBeenFocused')).toBe(true);
  });
});

describe('onInputChange', () => {
  it('should call onValueChange', () => {
    const lineInputWrapper = mount(
      <LineInput onValueChange={onValueChangeMock} validation="number" value="abc" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    inputWrapper.simulate('change', { target: { value: 'def' } });

    expect(onValueChangeMock).toHaveBeenCalledWith('def');
  });

  it('should format a credit card number', () => {
    const lineInputWrapper = mount(
      <LineInput onValueChange={onValueChangeMock} validation="creditCardNumber" value="" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    inputWrapper.simulate('change', { target: { value: '5345123455557777' } });

    expect(onValueChangeMock).toHaveBeenCalledWith('5345 1234 5555 7777');
  });

  it('should format a partial credit card number when only first group of digits', () => {
    const lineInputWrapper = mount(
      <LineInput onValueChange={onValueChangeMock} validation="creditCardNumber" value="" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    inputWrapper.simulate('change', { target: { value: '534' } });

    expect(onValueChangeMock).toHaveBeenCalledWith('534');
  });

  it('should format a partial credit card number when second group of digits', () => {
    const lineInputWrapper = mount(
      <LineInput onValueChange={onValueChangeMock} validation="creditCardNumber" value="" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    inputWrapper.simulate('change', { target: { value: '534567' } });

    expect(onValueChangeMock).toHaveBeenCalledWith('5345 67');
  });

  it('should format a partial credit card number when third group of digits', () => {
    const lineInputWrapper = mount(
      <LineInput onValueChange={onValueChangeMock} validation="creditCardNumber" value="" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    inputWrapper.simulate('change', { target: { value: '534567771' } });

    expect(onValueChangeMock).toHaveBeenCalledWith('5345 6777 1');
  });

  it('should format a partial credit card number when fourth group of digits', () => {
    const lineInputWrapper = mount(
      <LineInput onValueChange={onValueChangeMock} validation="creditCardNumber" value="" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    inputWrapper.simulate('change', { target: { value: '534567771111223' } });

    expect(onValueChangeMock).toHaveBeenCalledWith('5345 6777 1111 223');
  });

  it('should format a partial credit card expiry', () => {
    const lineInputWrapper = mount(
      <LineInput onValueChange={onValueChangeMock} validation="creditCardExpiration" value="" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    inputWrapper.simulate('change', { target: { value: '11' } });

    expect(onValueChangeMock).toHaveBeenCalledWith('11 / ');
  });

  it('should format a credit card verification code', () => {
    const lineInputWrapper = mount(
      <LineInput onValueChange={onValueChangeMock} validation="creditCardVerificationCode" value="" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    inputWrapper.simulate('change', { target: { value: '34k' } });

    expect(onValueChangeMock).toHaveBeenCalledWith('34');
  });
});

describe('getInputType()', () => {
  it('should return type, if type prop is specified', () => {
    const lineInputWrapper = renderShallow(
      <LineInput onValueChange={onValueChangeMock} type="password" value="abc" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    expect(inputWrapper.props().type).toBe('password');
  });

  test.each([['emailAddress', 'email'], ['phoneNumber', 'tel'], ['url', 'url']])(
    'it should return HTML input type according to specified validation type when type is not defined',
    (validation, htmlInputType) => {
      const lineInputWrapper = renderShallow(
        <LineInput onValueChange={onValueChangeMock} validation={validation as ValidationType} value="abc" />
      );
      const inputWrapper = lineInputWrapper.find('input');

      expect(inputWrapper.props().type).toBe(htmlInputType);
    }
  );

  it('should return "text", if any other validation type is specified', () => {
    const lineInputWrapper = renderShallow(
      <LineInput onValueChange={onValueChangeMock} validation="usSSN" value="abc" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    expect(inputWrapper.props().type).toBe('text');
  });
});

describe('getIconName()', () => {
  it('should not show validationErrorIcon nor validationSuccessIcon when input has not been focused', () => {
    const lineInputWrapper = mount(
      <LineInput
        onValueChange={onValueChangeMock}
        validation="number"
        validationErrorIcon="exclamation"
        validationSuccessIcon="check"
        value=""
      />
    );

    const iconWrapper = lineInputWrapper.find(Icon);
    expect(iconWrapper.props().name).toBe('');
  });

  test.each([['', 'exclamation', 'red'], ['xx', 'exclamation', 'red'], ['123', 'check', 'green']])(
    'it should show validationErrorIcon or validationSuccessIcon depending on entered value on input blur',
    (value, iconName, color) => {
      const lineInputWrapper = mount(
        <LineInput
          onValueChange={onValueChangeMock}
          validation="number"
          validationErrorIcon="exclamation"
          validationSuccessIcon="check"
          value={value}
        />
      );
      const inputWrapper = lineInputWrapper.find('input');

      inputWrapper.simulate('focus');
      inputWrapper.simulate('blur');
      lineInputWrapper.update();

      const iconWrapper = lineInputWrapper.find(Icon);
      expect(iconWrapper.props().name).toBe(iconName);
      expect(iconWrapper.props().color).toBe(color);
    }
  );

  it('should not show credit card icon when validation is "creditCardNumber" and input is empty', () => {
    const lineInputWrapper = mount(
      <LineInput onValueChange={onValueChangeMock} validation="creditCardNumber" value="" />
    );

    expect(lineInputWrapper.exists(Icon)).toBe(false);
  });

  test.each([
    ['4444', 'cc visa'],
    ['5444', 'cc mastercard'],
    ['3434', 'cc amex'],
    ['3600', 'cc diners club'],
    ['6011', 'cc discover'],
    ['3528', 'cc jcb'],
    ['9999', 'credit card']
  ])(
    'it should show credit card icon depending on entered value on input blur when validation is "creditCardNumber" ',
    (value, iconName) => {
      const lineInputWrapper = mount(
        <LineInput
          onValueChange={onValueChangeMock}
          validation="creditCardNumber"
          value={value}
        />
      );
      const inputWrapper = lineInputWrapper.find('input');

      inputWrapper.simulate('focus');
      inputWrapper.simulate('blur');
      lineInputWrapper.update();

      const iconWrapper = lineInputWrapper.find(Icon);
      expect(iconWrapper.props().name).toBe(iconName);
    }
  );

  it('should show icon specified in icon prop', () => {
    const lineInputWrapper = mount(
      <LineInput
        icon="search"
        onValueChange={onValueChangeMock}
        value="text"
      />
    );

    const iconWrapper = lineInputWrapper.find(Icon);
    expect(iconWrapper.props().name).toBe('search');
  })
});

describe('render()', () => {
  it('should render component correctly', () => {
    const lineInputWrapper = renderShallow(<LineInput onValueChange={onValueChangeMock} value="abc" />);

    expect(lineInputWrapper).toMatchSnapshot();
  });

  it('should render disabled component correctly', () => {
    const lineInputWrapper = renderShallow(
      <LineInput disabled onValueChange={onValueChangeMock} value="abc" />
    );

    expect(lineInputWrapper).toMatchSnapshot();
  });

  it('should render component with errorTextPosition "right" correctly', () => {
    const lineInputWrapper = renderShallow(
      <LineInput errorTextPosition="right" onValueChange={onValueChangeMock} value="abc" />
    );

    expect(lineInputWrapper).toMatchSnapshot();
  });

  it('should render validationErrorIcon correctly on right side', () => {
    const lineInputWrapper = renderShallow(
      <LineInput onValueChange={onValueChangeMock} validationErrorIcon="exclamation" value="abc" />
    );

    expect(lineInputWrapper).toMatchSnapshot();
  });

  it('should render validationSuccessIcon correctly on right side', () => {
    const lineInputWrapper = renderShallow(
      <LineInput onValueChange={onValueChangeMock} validationErrorIcon="exclamation" value="abc" />
    );

    expect(lineInputWrapper).toMatchSnapshot();
  });

  it('should render icon correctly depending on iconPosition and iconColor', () => {
    const lineInputWrapper = renderShallow(
      <LineInput icon="search" iconColor="blue" iconPosition="right" onValueChange={onValueChangeMock} value="abc" />
    );

    expect(lineInputWrapper).toMatchSnapshot();
  });

  it('should render component with additional HTML attributes correctly', () => {
    const lineInputWrapper = renderShallow(
      <LineInput
        className="test"
        id="test1"
        onValueChange={onValueChangeMock}
        style={{ visibility: 'hidden' }}
        value="abc"
      />
    );

    expect(lineInputWrapper).toMatchSnapshot();
  });
});
