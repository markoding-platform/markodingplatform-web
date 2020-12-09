import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import { useFormContext } from 'react-hook-form';
import { useGlobalFormContext } from 'components/context/FormContext';

import Panel from 'components/Panel';
import TextField from 'components/TextField';
import {
  radioBtnWrapper,
  radioBtn,
  radioInputText,
  textArea,
  isRadioActive,
} from './styles.module.scss';
// import useIdeaSolution from '../hooks/useIdeaSolution';

const FormIdeaSolution = () => {
  const { push } = useRouter();

  const { register, handleSubmit } = useFormContext();
  const { inputs, setInputs } = useGlobalFormContext();
  const [solutionType, setSolutionType] = useState('');

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
    setInputs({ ideaSolution: { ...data } });
    handleOnClick();
  };
  return (
    <>
      <form>
        <Panel title="Nama Sekolah">
          <TextField
            placeholder="Tulis nama sekolah kamu"
            defaultVal={inputs.schoolId}
            name="schoolId"
            ref={register({ required: true })}
          />
        </Panel>
        <Panel title="Nama Guru Pembimbing">
          <TextField
            placeholder="Tulis nama guru pembimbing kamu"
            defaultVal={inputs.teacherId}
            name="teacherId"
            ref={register({ required: true })}
          />
        </Panel>
        <Panel title="Nama Solusi Digital">
          <TextField
            placeholder="Tulis nama solusi digital kamu"
            defaultVal={inputs.solutionName}
            name="solutionName"
            ref={register({ required: true })}
          />
        </Panel>
        <Panel title="Pilihan Tipe Solusi Digital yang Ingin Kamu Buat">
          <div className="d-flex justify-content-start">
            {SOLUTION_TYPES.map(({ text, id, value }) => (
              <InputGroup
                key={id}
                className={`${
                  id === solutionType && isRadioActive
                } ${radioBtnWrapper}`}
              >
                <input
                  className={radioBtn}
                  type="radio"
                  name="solutionType"
                  value={solutionType}
                  ref={register({ required: true })}
                  onChange={() => setSolutionType(value)}
                />
                <InputGroup.Append aria-label="Radio button">
                  <InputGroup.Text className={radioInputText}>
                    {text}
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            ))}
          </div>
        </Panel>
        <Panel title="Bidang Masalah">
          <TextField
            placeholder="Tulis bidang masalah yang ingin kamu selesaikan"
            defaultVal={inputs.problemArea}
            name="problemArea"
            ref={register({ required: true })}
          />
        </Panel>
        <Panel title="Pemilihan Masalah">
          <TextField
            placeholder="Apa masalah yang ingin kamu selesaikan"
            defaultVal={inputs.problemSelection}
            as="textarea"
            className={textArea}
            name="problemSelection"
            ref={register({ required: true })}
          />
        </Panel>
        <Panel title="Alasan Masalah">
          <TextField
            placeholder="Mengapa kamu ingin menyelesaikan masalah ini"
            defaultVal={inputs.problemReasoning}
            name="problemReasoning"
            ref={register({ required: true })}
            as="textarea"
            className={textArea}
          />
        </Panel>
        <Panel title="Target Customer">
          <TextField
            placeholder="Siapa yang ingin kamu bantu"
            defaultVal={inputs.targetCustomer}
            name="targetCustomer"
            ref={register({ required: true })}
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

export default FormIdeaSolution;
