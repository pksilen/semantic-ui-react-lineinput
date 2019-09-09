import { CSSProperties } from 'react';


const styleMap: { [key: string]: CSSProperties } = {
  topDiv: {
    display: 'inline-flex'
  },
  topDivWhenErrorAtBottom: {
    flexDirection: 'column'
  },
  input: {
    borderLeft: 'none',
    borderRadius: 0,
    borderRight: 'none',
    borderTop: 'none',
    paddingLeft: '0.5em',
    paddingRight: '0.5em'
  },
  errorInput:  {
    borderBottomColor: 'red'
  },
  validationIcon: {
    opacity: 1
  },
  label: {
    background: 'none',
    color: 'red',
    fontWeight: 400,
    padding: 0,
    textAlign: 'left'
  },
  rightLabel: {
    alignSelf: 'center'
  }
};

export default styleMap;
