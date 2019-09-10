import * as React from 'react';
import { render } from 'react-dom';
import LineInput from '../src/lineinput/LineInput';

interface State {
  values: string[];
}

class DemoApp extends React.Component<{}, State> {
  // noinspection MagicNumberJS
  state: State = {
    values: Array(26).fill('')
  };

  changeValue = (newValue: string, componentIndex: number) => {
    this.setState(
      (prevState: State): State => {
        const { values } = prevState;
        values[componentIndex] = newValue;

        return {
          values
        };
      }
    );
  };

  render(): React.ReactElement {
    const { values } = this.state;

    // noinspection MagicNumberJS
    return (
      <div style={{ marginLeft: '5px' }}>
        <h1>Demo</h1>
        <h2>LineInput</h2>
        LineInput without validation
        <LineInput
          placeholder="Enter value..."
          value={values[0]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 0)}
        />
        <br />
        LineInput with URL validation
        <LineInput
          placeholder="Enter URL..."
          errorText="Must be a valid URL"
          validation="url"
          value={values[1]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 1)}
        />
        <br />
        LineInput with e-mail address validation
        <LineInput
          placeholder="Enter e-mail address..."
          errorText="Must be a valid e-mail address"
          validation="emailAddress"
          value={values[2]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 2)}
        />
        <br />
        LineInput with credit card number validation
        <LineInput
          placeholder="Enter credit card number..."
          errorText="Must be a valid credit card number"
          validation="creditCardNumber"
          value={values[3]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 3)}
        />
        <br />
        LineInput with credit card expiration validation
        <LineInput
          placeholder="Enter credit card expiration..."
          errorText="Must be a valid credit card expiration"
          validation="creditCardExpiration"
          value={values[4]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 4)}
        />
        <br />
        LineInput with credit card verification code validation
        <LineInput
          placeholder="Enter CVC..."
          errorText="Must be a valid CVC"
          validation="creditCardVerificationCode"
          value={values[5]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 5)}
        />
        <br />
        LineInput with number validation
        <LineInput
          placeholder="Enter a number..."
          errorText="Must be a number"
          validation="number"
          value={values[6]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 6)}
        />
        <br />
        LineInput with integer validation
        <LineInput
          placeholder="Enter an integer..."
          errorText="Must be an integer"
          validation="integer"
          value={values[7]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 7)}
        />
        <br />
        LineInput with alphaNumeric validation
        <LineInput
          placeholder="Enter alpha numeric value..."
          errorText="Must be alphanumeric"
          validation="alphaNumeric"
          value={values[8]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 8)}
        />
        <br />
        LineInput with US ZIP code validation
        <LineInput
          placeholder="Enter US ZIP code..."
          errorText="Must be a US ZIP code"
          validation="usZipCode"
          value={values[9]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 9)}
        />
        <br />
        LineInput with Canadian postal code validation
        <LineInput
          placeholder="Enter CA postal code..."
          errorText="Must be a CA postal code"
          validation="caPostCode"
          value={values[10]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 10)}
        />
        <br />
        LineInput with UK postal code validation
        <LineInput
          placeholder="Enter UK postal code..."
          errorText="Must be a UK postal code"
          validation="ukPostCode"
          value={values[11]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 11)}
        />
        <br />
        LineInput with phone number validation
        <LineInput
          placeholder="Enter a phone number..."
          errorText="Must be a phone number"
          validation="phoneNumber"
          value={values[12]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 12)}
        />
        <br />
        LineInput with US social security number validation
        <LineInput
          placeholder="Enter US SSN..."
          errorText="Must be a US SSN"
          validation="usSSN"
          value={values[13]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 13)}
        />
        <br />
        LineInput with IP address validation
        <LineInput
          placeholder="Enter IP address..."
          errorText="Must be an IP address"
          validation="ipAddress"
          value={values[14]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 14)}
        />
        <br />
        LineInput with IPv4 address validation
        <LineInput
          placeholder="Enter an IPv4 address..."
          errorText="Must be an IPv4 address"
          validation="ipv4Address"
          value={values[15]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 15)}
        />
        <br />
        LineInput with IPv6 address validation
        <LineInput
          placeholder="Enter an IPv6 address..."
          errorText="Must be an IPv6 address"
          validation="ipv6Address"
          value={values[16]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 16)}
        />
        <br />
        LineInput with hex color validation
        <LineInput
          placeholder="Enter a hex color..."
          errorText="Must be a hex color"
          validation="hexColor"
          value={values[17]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 17)}
        />
        <br />
        LineInput with icon
        <LineInput
          placeholder="Search..."
          icon="search"
          value={values[18]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 18)}
        />
        <br />
        LineInput with validation icons
        <LineInput
          placeholder="Enter number..."
          validation="number"
          validationErrorIcon="exclamation"
          validationSuccessIcon="check"
          errorText="Must be a number"
          errorTextPosition="bottom"
          value={values[19]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 19)}
        />
        <br />
        <br />
        <h2>Sizes</h2>
        Mini
        <LineInput
          placeholder="Enter a value..."
          size="mini"
          value={values[20]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 20)}
        />
        <br />
        Small
        <LineInput
          placeholder="Enter a value..."
          size="small"
          value={values[21]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 21)}
        />
        <br />
        Large
        <LineInput
          placeholder="Enter a value..."
          size="large"
          value={values[22]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 22)}
        />
        <br />
        Big
        <LineInput
          placeholder="Enter a value..."
          size="big"
          value={values[23]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 23)}
        />
        <br />
        Huge
        <LineInput
          placeholder="Enter a value..."
          size="huge"
          value={values[24]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 24)}
        />
        <br />
        Massive
        <LineInput
          placeholder="Enter a value..."
          size="massive"
          value={values[25]}
          onValueChange={(newValue: string) => this.changeValue(newValue, 25)}
        />
        <p>
          <br />
        </p>
        <a href="https://github.com/pksilen/semantic-ui-react-lineinput">
          View semantic-ui-react-lineinput on GitHub
        </a>
      </div>
    );
  }
}

const rootElement = document.getElementById('app-root');

if (rootElement) {
  render(<DemoApp />, rootElement);
}
