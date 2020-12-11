import React, { useState } from 'react';
import { string } from 'prop-types';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import { inputField } from './styles.module.scss';

// eslint-disable-next-line react/display-name
const TextField = React.forwardRef(
  ({ name, placeholder, defaultVal, as, className }, ref) => {
    const [textValue, setTextValue] = useState(defaultVal);

    const handleOnChange = (e) => {
      const {
        target: { value },
      } = e;
      setTextValue(value);
    };

    return (
      <InputGroup>
        <FormControl
          className={`${inputField} ${className}`}
          as={as}
          name={name}
          placeholder={placeholder}
          value={textValue}
          ref={ref}
          aria-describedby="inputGroup-sizing"
          onChange={handleOnChange}
        />
      </InputGroup>
    );
  }
);

TextField.defaultProps = {
  as: 'input',
  className: '',
  defaultVal: '',
  name: '',
  placeholder: '',
};

TextField.propTypes = {
  as: string,
  className: string,
  defaultVal: string,
  name: string,
  placeholder: string,
};

export default TextField;
