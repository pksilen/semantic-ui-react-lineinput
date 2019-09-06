import * as React from 'react';
import * as PropTypes from 'prop-types';
import { mount, shallow as renderShallow } from 'enzyme';
import LineInput from './LineInput';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let onValueChangeMock: any;

beforeEach(() => {
  onValueChangeMock = jest.fn();
});

describe('propTypes', () => {
  it('should validate prop types', () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = LineInput;

    expect(propTypes.className).toBe(PropTypes.string);
    expect(propTypes.countryCode).toBe(PropTypes.string);
    expect(propTypes.disabled).toBe(PropTypes.bool);
    expect(propTypes.errorText).toBe(PropTypes.string);
    expect(propTypes.errorTextPosition).toBeTruthy();
    expect(propTypes.maxLength).toBe(PropTypes.number);
    expect(propTypes.maxValue).toBe(PropTypes.number);
    expect(propTypes.minValue).toBe(PropTypes.number);
    expect(propTypes.onValueChange).toBe(PropTypes.func.isRequired);
    expect(propTypes.placeholder).toBe(PropTypes.string);
    expect(propTypes.size).toBeTruthy();
    expect(propTypes.type).toBe(PropTypes.string);
    expect(propTypes.validation).toBeTruthy();
    expect(propTypes.value).toBe(PropTypes.string.isRequired);
  });
});

describe('defaultProps', () => {
  it('should set default values for optional props', () => {
    const lineInputWrapper = mount(<LineInput onValueChange={onValueChangeMock} value="abc" />);

    expect(lineInputWrapper.props().className).toBe(undefined);
    expect(lineInputWrapper.props().countryCode).toBe('');
    expect(lineInputWrapper.props().disabled).toBe(false);
    expect(lineInputWrapper.props().errorText).toBe('');
    expect(lineInputWrapper.props().errorTextPosition).toBe('bottom');
    expect(lineInputWrapper.props().maxLength).toBe(undefined);
    expect(lineInputWrapper.props().maxValue).toBe(undefined);
    expect(lineInputWrapper.props().minValue).toBe(undefined);
    expect(lineInputWrapper.props().placeholder).toBe('');
    expect(lineInputWrapper.props().size).toBe('small');
    expect(lineInputWrapper.props().type).toBe('text');
    expect(lineInputWrapper.props().validation).toBe(undefined);
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
  it('should set hasValidValue in state to true', () => {
    const lineInputWrapper = mount(
      <LineInput onValueChange={onValueChangeMock} validation="number" value="abc" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    lineInputWrapper.setState({ hasValidValue: false });
    inputWrapper.simulate('focus');

    expect(lineInputWrapper.state('hasValidValue')).toBe(true);
  });
});

describe('onInputChange', () => {
  it('should call onValueChange', () => {
    const lineInputWrapper = mount(
      <LineInput onValueChange={onValueChangeMock} validation="number" value="abc" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    inputWrapper.simulate('change', { target: { value: 'def'}});

    expect(onValueChangeMock).toHaveBeenCalledWith('def');
  })

  it('should format a credit card number', () => {
    const lineInputWrapper = mount(
      <LineInput onValueChange={onValueChangeMock} validation="creditCardNumber" value="" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    inputWrapper.simulate('change', { target: { value: '5345123455557777'}});

    expect(onValueChangeMock).toHaveBeenCalledWith('5345 1234 5555 7777');
  });

  it('should format a partial credit card number when only first group of digits', () => {
    const lineInputWrapper = mount(
      <LineInput onValueChange={onValueChangeMock} validation="creditCardNumber" value="" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    inputWrapper.simulate('change', { target: { value: '534'}});

    expect(onValueChangeMock).toHaveBeenCalledWith('534');
  });

  it('should format a partial credit card number when second group of digits', () => {
    const lineInputWrapper = mount(
      <LineInput onValueChange={onValueChangeMock} validation="creditCardNumber" value="" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    inputWrapper.simulate('change', { target: { value: '534567'}});

    expect(onValueChangeMock).toHaveBeenCalledWith('5345 67');
  });

  it('should format a partial credit card number when third group of digits', () => {
    const lineInputWrapper = mount(
      <LineInput onValueChange={onValueChangeMock} validation="creditCardNumber" value="" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    inputWrapper.simulate('change', { target: { value: '534567771'}});

    expect(onValueChangeMock).toHaveBeenCalledWith('5345 6777 1');
  });

  it('should format a partial credit card number when fourth group of digits', () => {
    const lineInputWrapper = mount(
      <LineInput onValueChange={onValueChangeMock} validation="creditCardNumber" value="" />
    );
    const inputWrapper = lineInputWrapper.find('input');

    inputWrapper.simulate('change', { target: { value: '534567771111223'}});

    expect(onValueChangeMock).toHaveBeenCalledWith('5345 6777 1111 223');
  });
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

  it('should render component with additional class names correctly', () => {
    const lineInputWrapper = renderShallow(
      <LineInput className="test" onValueChange={onValueChangeMock} value="abc" />
    );

    expect(lineInputWrapper).toMatchSnapshot();
  });

  it('should render component with additional styles correctly', () => {
    const lineInputWrapper = renderShallow(
      <LineInput onValueChange={onValueChangeMock} style={{ visibility: 'hidden' }} value="abc" />
    );

    expect(lineInputWrapper).toMatchSnapshot();
  });

  it('should render component with additional HTML attributes correctly', () => {
    const lineInputWrapper = renderShallow(
      <LineInput id="test1" onValueChange={onValueChangeMock} value="abc" />
    );

    expect(lineInputWrapper).toMatchSnapshot();
  });
});
