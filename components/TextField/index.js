import React, { useState } from 'react';
import { string, bool } from 'prop-types';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';

import { inputField } from './styles.module.scss';

// eslint-disable-next-line react/display-name
const TextField = React.forwardRef(
  (
    {
      name,
      placeholder,
      defaultVal,
      as,
      className,
      error,
      errorTxt,
      type,
      readOnly,
    },
    ref
  ) => {
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
          className={`${inputField} ${className} w-100 ${
            error && 'border-danger'
          } `}
          as={as}
          name={name}
          placeholder={placeholder}
          value={textValue}
          defaultValue={defaultVal}
          ref={ref}
          type={type}
          aria-describedby="inputGroup-sizing"
          onChange={handleOnChange}
          autoComplete="off"
          readOnly={readOnly}
        />
        {error && <Form.Text className="text-muted pt-1">{errorTxt}</Form.Text>}
      </InputGroup>
    );
  }
);

TextField.defaultProps = {
  as: 'input',
  className: '',
  defaultVal: '',
  error: false,
  errorTxt: 'Wajib diisi',
  name: '',
  placeholder: '',
  type: 'text',
  readOnly: false,
};

TextField.propTypes = {
  as: string,
  className: string,
  defaultVal: string,
  error: bool,
  errorTxt: string,
  name: string,
  placeholder: string,
  type: string,
  readOnly: bool,
};

export default TextField;
