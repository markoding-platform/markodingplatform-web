import { useMemo, useState } from 'react';
import { string } from 'prop-types';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import TextField from 'components/TextField';
import DropdownComponent from 'components/Dropdown';
import StepsComponent from './Steps';
import {
  styCardHeader,
  styLabel,
  styTextfield,
  styTerm,
  required,
} from './styles.module.scss';
import { LIST_FORM } from './contants';

const SignupForm = ({ registerAs }) => {
  const [isStudentSupporter, setIsStudentSupporter] = useState(false);
  const schools = [
    {
      key: 0,
      text: 'SMA KARANTINA',
    },
    {
      key: 1,
      text: 'SMA COVIDIOT',
    },
  ];

  const getForm = useMemo(() => {
    if (isStudentSupporter) {
      return LIST_FORM.siswa;
    }
    if (!isStudentSupporter) {
      return LIST_FORM[registerAs];
    }

    return [];
  }, [isStudentSupporter, registerAs]);

  const handleSelectSupporter = () => {
    setIsStudentSupporter(true);
  };

  const handleSelectDropdown = (payload) => {
    console.log({ payload });
  };

  return (
    <div>
      <Card>
        <Card.Header className={styCardHeader}>
          <h2 className="text-capitalize">
            Daftar Sebagai &nbsp;
            {registerAs}
          </h2>
        </Card.Header>
        <div className="border-bottom mb-3">
          <p className="text-center text-secondary">
            Sebelum memulai perjalananmu yuk cerita tentang dirimu
          </p>
        </div>
        <div className="container px-3 mb-4">
          <StepsComponent />
          <div className="row">
            <>
              {registerAs === 'supporter' && (
                <div className="col-12 pb-4">
                  <label className={`${styLabel} ${required}`}>
                    Apakah anda masih duduk di bangku sekolah?
                  </label>
                  <DropdownComponent
                    onSelected={handleSelectSupporter}
                    dropdownItem={schools}
                  />
                </div>
              )}
            </>
            {getForm.map((item) => {
              return (
                <div
                  key={item.key}
                  className={`col-md-${item.columns} col-sm-12 pb-4`}
                >
                  <label className={`${styLabel} ${item.required && required}`}>
                    {item.label}
                  </label>
                  {item.as === 'textfield' && (
                    <TextField placeholder="smk" className={styTextfield} />
                  )}
                  {item.as === 'dropdown' && (
                    <DropdownComponent
                      dropdownItem={schools}
                      onSelected={handleSelectDropdown}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className={`form-check ${styTerm}`}>
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Dengan mendaftar, saya menyetujui Syarat dan Ketentuan serta
              Kebijakan Privasi
            </label>
          </div>

          <div>
            <Button
              className="w-100 mt-5 font-weight-bold"
              type="button"
              variant="warning"
            >
              Daftar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

SignupForm.propTypes = {
  registerAs: string.isRequired,
};
export default SignupForm;
