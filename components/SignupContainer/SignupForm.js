import { string } from 'prop-types';
import Card from 'react-bootstrap/Card';

import TextField from 'components/TextField';
import DropdownComponent from 'components/Dropdown';
import StepsComponent from './Steps';
import { styCardHeader } from './styles.module.scss';
import { LIST_FORM } from './contants';

const SignupForm = ({ registerAs }) => {
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
        <StepsComponent />
        <div>
          {LIST_FORM[registerAs].map((item) => {
            return (
              <div key={item.key}>
                <p>{item.label}</p>
                {item.as === 'textfield' && <TextField placeholder="smk" />}
                {item.as === 'dropdown' && (
                  <DropdownComponent dropdownItem={schools} />
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

SignupForm.propTypes = {
  registerAs: string.isRequired,
};
export default SignupForm;
