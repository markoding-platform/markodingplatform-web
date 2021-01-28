import React, { useState, memo } from 'react';
import { string, bool, func } from 'prop-types';
import Flatpickr from 'react-flatpickr';
import dayjs from 'dayjs';

import 'flatpickr/dist/themes/airbnb.css';

import FormGroup from 'react-bootstrap/FormGroup';
import Form from 'react-bootstrap/Form';
import { datepicker } from './styles.module.scss';

dayjs.locale('id');
// eslint-disable-next-line react/display-name
const DatePickerComponent = React.forwardRef(
  ({ name, defaultVal, className, error, errorTxt, onSelectDate }, ref) => {
    const [value, setValue] = useState(defaultVal && new Date(defaultVal));

    const handleOnChange = (val) => {
      setValue(val[0]);
      onSelectDate(val[0]);
    };

    return (
      <FormGroup>
        <Flatpickr
          className={`${datepicker} ${className}`}
          value={value}
          name={name}
          ref={ref}
          options={{ dateFormat: 'd/m/Y' }}
          onChange={handleOnChange}
        />
        {error && <Form.Text className="text-muted pt-1">{errorTxt}</Form.Text>}
      </FormGroup>
    );
  }
);

DatePickerComponent.defaultProps = {
  className: '',
  defaultVal: '',
  error: false,
  errorTxt: 'Wajib diisi',
  name: '',
};

DatePickerComponent.propTypes = {
  className: string,
  defaultVal: string,
  error: bool,
  errorTxt: string,
  name: string,
  onSelectDate: func.isRequired,
};

export default memo(DatePickerComponent);
