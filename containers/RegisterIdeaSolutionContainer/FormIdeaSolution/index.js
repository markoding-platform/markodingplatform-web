import { useEffect, useState } from 'react';
import { shape } from 'prop-types';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm } from 'react-hook-form';
import { useGlobalFormContext } from 'components/context/FormContext';

import Panel from 'components/Panel';
import TextField from 'components/TextField';
import DropdownComponent from 'components/Dropdown';
import {
  radioBtnWrapper,
  radioBtn,
  radioInputText,
  textArea,
  isRadioActive,
  inputSolutionType,
} from './styles.module.scss';

const FormIdeaSolution = ({ user }) => {
  const profile = user?.profile || {};
  const { push } = useRouter();

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      schoolName: profile.schoolName,
      schoolId: profile.schoolId,
    },
  });

  const {
    inputs: { ideaSolution = {} },
    setInputs,
  } = useGlobalFormContext();

  const [solutionType, setSolutionType] = useState(ideaSolution.solutionType);

  const SOLUTION_TYPES = [
    { id: 0, text: 'Aplikasi Mobile', value: 'mobile' },
    { id: 1, text: 'Aplikasi Web', value: 'web' },
    { id: 2, text: 'Aplikasi Game', value: 'game' },
  ];

  const handleOnClick = () => {
    push('/register-idea/2');
  };
  const onSubmit = (data) => {
    data.solutionType = solutionType;
    data.schoolId = profile.schoolId;
    data.schoolName = profile.schoolName;
    setInputs({ ideaSolution: { ...data } });
    handleOnClick();
  };

  useEffect(() => {
    if (Object.keys(user).length < 1) {
      push('/');
    }
  }, [push, user]);

  return (
    <>
      <form>
        <Panel title="Nama Guru Pembimbing">
          <DropdownComponent
            placeholder="Nama guru kamu"
            onSelected={() => {}}
            dropdownItem={[]}
            withSearch
          />
        </Panel>
        <Panel title="Nama Solusi Digital">
          <TextField
            placeholder="Tulis nama solusi digital kamu"
            defaultVal={ideaSolution.solutionName}
            name="solutionName"
            ref={register({ required: true })}
            error={!!errors.solutionName}
            errorTxt="Harap mengisi solusi digital"
          />
        </Panel>
        <Panel title="Pilihan Tipe Solusi Digital yang Ingin Kamu Buat">
          <div className={inputSolutionType}>
            <div className="d-flex justify-content-start">
              <>
                {SOLUTION_TYPES.map(({ text, id, value }) => (
                  <InputGroup
                    key={id}
                    className={`${
                      value === solutionType && isRadioActive
                    } ${radioBtnWrapper}`}
                  >
                    <input
                      className={radioBtn}
                      type="radio"
                      name="solutionType"
                      value={solutionType}
                      ref={register({ required: true })}
                      onChange={() => setSolutionType(value)}
                      checked={value === solutionType}
                    />
                    <InputGroup.Append aria-label="Radio button">
                      <InputGroup.Text className={radioInputText}>
                        {text}
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                ))}
              </>
            </div>
            {errors.solutionType && (
              <Form.Text className="text-muted pt-1">
                Harap memilih tipe solusi digital
              </Form.Text>
            )}
          </div>
        </Panel>
        <Panel title="Bidang Masalah">
          <TextField
            placeholder="Tulis bidang masalah yang ingin kamu selesaikan"
            defaultVal={ideaSolution.problemArea}
            name="problemArea"
            ref={register({ required: true })}
            error={!!errors.problemArea}
            errorTxt="Harap mengisi bidang masalah"
          />
        </Panel>
        <Panel title="Pemilihan Masalah">
          <TextField
            placeholder="Apa masalah yang ingin kamu selesaikan"
            defaultVal={ideaSolution.problemSelection}
            as="textarea"
            className={textArea}
            name="problemSelection"
            ref={register({ required: true })}
            error={!!errors.problemSelection}
            errorTxt="Harap mengisi pemilihan masalah"
          />
        </Panel>
        <Panel title="Alasan Masalah">
          <TextField
            placeholder="Mengapa kamu ingin menyelesaikan masalah ini"
            defaultVal={ideaSolution.problemReasoning}
            name="problemReasoning"
            ref={register({ required: true })}
            as="textarea"
            className={textArea}
            error={!!errors.problemReasoning}
            errorTxt="Harap mengisi alasan masalah"
          />
        </Panel>
        <Panel title="Target Customer">
          <TextField
            placeholder="Siapa yang ingin kamu bantu"
            defaultVal={ideaSolution.targetCustomer}
            name="targetCustomer"
            ref={register({ required: true })}
            error={!!errors.targetCustomer}
            errorTxt="Harap mengisi target customer"
          />
        </Panel>
        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            Selanjutnya
          </Button>
        </div>
      </form>
    </>
  );
};

FormIdeaSolution.propTypes = {
  user: shape({}).isRequired,
};
export default FormIdeaSolution;
