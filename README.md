# semantic-ui-react-lineinput

Line input control with validation support for [Semantic UI React]

[![version][version-badge]][package]
[![build][build]][circleci]
[![coverage][coverage]][codecov]
[![MIT License][license-badge]][license]

![Example image of LineInput](https://raw.githubusercontent.com/pksilen/semantic-ui-react-lineinput/master/example/example1.png)

   
![Example image of LineInput](https://raw.githubusercontent.com/pksilen/semantic-ui-react-lineinput/master/example/example2.png)

    
![Example image of LineInput](https://raw.githubusercontent.com/pksilen/semantic-ui-react-lineinput/master/example/example3.png)

## Prerequisites
    "react": "^16.0.0",
    "react-dom": "^16.0.0",
    "semantic-ui-react": "^0.87.0"

## Installation
    npm install --save semantic-ui-react-lineinput
    
## Demo
   LineInput [demo] 
   
## Example usage
    import React from 'react';
    import { LineInput } from 'semantic-ui-react-lineinput';
    
    class LineInputExample extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                value: ""
            };
        }
        
        changeValue = (newValue) => {
            this.setState({ value: newValue });
        }
       
        render() => {(
            <LineInput value={this.state.value} onValueChange={this.changeValue} />
        )};
    }
    
   LineInput with validations
    
    <LineInput errorText="value must be an integer" validation="integer" value={this.state.value} onValueChange={this.changeValue} />             
    <LineInput errorText="Invalid e-mail address" validation="emailAddress" value={this.state.value} onValueChange={this.changeValue} />
   
## Mandatory properties      
    value: string, 
    onValueChange: (newValue: string) => void,
         
## Optional properties
| property                  | description                                                                                                                    |
| --------------------------| -------------------------------------------------------------------------------------------------------------------------------|
| className                 | class names for outer div                                                                                                      |
| countryCode               | Default country code ISO 3166-1 Alpha-2 code for phone number validation, if not supplied, browser's country code is used      |
| disabled                  | Specified if input is enabled or disabled                                                                                      |
| errorText                 | Text shown if validation fails                                                                                                 |
| errorTextPosition         | Position where error text is shown                                                                                             |
| maxLength                 | Maximum number of characters allowed for input control                                                                         |
| maxValue                  | Maximum allowed value when validation is 'number' or 'integer'                                                                 |
| minValue                  | Minimum allowed value when validation is 'number' or 'interger'                                                                | 
| placeholder               | Placeholder value for input control                                                                                            |
| size                      | Size of control                                                                                                                |
| type                      | HTML input type                                                                                                                |
| validation                | Validation keyword, a regular expression or a validation function                                                              |


    
## Optional property types
    className: string,  
    countryCode: string,
    disabled: boolean,
    errorText: string,
    errorTextPosition: 'bottom' | 'right',
    maxLength: number,
    maxValue: number,
    minValue: number,
    placeholder: string,
    size: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive',
    type: string,
    validation: RegExp | (inputString: string) => boolean | 'url' | 'emailAddress' | 'creditCardNumber' | 'creditCardExpiration' | 'number' | 'integer' | 'alphaNumeric' | 'usZipCode' | 'caPostCode' | 'ukPostCode' | 'phoneNumber' | 'usSSN' | 'ipAddress' | 'ipv4Address' | 'ipv6Address' | 'hexColor'
        
## Default values for optional properties
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
    
## License
MIT License

[license-badge]: https://img.shields.io/badge/license-MIT-green
[license]: https://github.com/pksilen/semantic-ui-react-lineinput/blob/master/LICENSE
[version-badge]: https://img.shields.io/npm/v/semantic-ui-react-lineinput.svg?style=flat-square
[package]: https://www.npmjs.com/package/semantic-ui-react-lineinput
[build]: https://img.shields.io/circleci/project/github/pksilen/semantic-ui-react-lineinput/master.svg?style=flat-square
[circleci]: https://circleci.com/gh/pksilen/semantic-ui-react-lineinput/tree/master
[coverage]: https://img.shields.io/codecov/c/github/pksilen/semantic-ui-react-lineinput/master.svg?style=flat-square
[codecov]: https://codecov.io/gh/pksilen/semantic-ui-react-lineinput
[demo]: https://pksilen.github.io/semantic-ui-react-lineinput/
[Semantic UI React]: https://react.semantic-ui.com/

