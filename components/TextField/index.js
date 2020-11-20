import { useEffect, useState } from 'react';
import { func, string } from 'prop-types';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import useDebounce from 'hooks/useDebounce';

import { inputField } from './styles.module.scss';

const TextField = ({ placeholder, defaultVal, onEmit, as, className }) => {
  const [textValue, setTextValue] = useState(defaultVal);

  const debouncedTextValue = useDebounce(textValue, 200);

  const handleOnChange = (e) => {
    const {
      target: { value },
    } = e;
    setTextValue(value);
  };

  useEffect(() => onEmit(debouncedTextValue), [debouncedTextValue, onEmit]);

  return (
    <InputGroup>
      <FormControl
        className={`${inputField} ${className}`}
        as={as}
        placeholder={placeholder}
        value={textValue}
        aria-describedby="inputGroup-sizing"
        onChange={handleOnChange}
      />
    </InputGroup>
  );
};

TextField.defaultProps = {
  as: 'input',
  className: '',
  defaultVal: '',
  placeholder: '',
  onEmit: () => {},
};

TextField.propTypes = {
  as: string,
  className: string,
  defaultVal: string,
  placeholder: string,
  onEmit: func,
};

export default TextField;
