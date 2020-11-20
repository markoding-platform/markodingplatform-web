import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';

import Panel from 'components/Panel';
import TextField from 'components/TextField';
import {
  radioBtnWrapper,
  radioBtn,
  radioInputText,
  textArea,
  isRadioActive,
} from './styles.module.scss';

const FormIdeaSolution = () => {
  const { push } = useRouter();
  const [schools, setSchools] = useState('');
  const [teacher, setTeacher] = useState('');
  const [solutionName, setSolutionName] = useState();
  const [solutionType, setSolutionType] = useState('');
  const [problemSelection, setProblemSelection] = useState('');
  const [problemReason, setProblemReason] = useState('');
  const [targetCustomer, setTargetCustomer] = useState('');

  const SOLUTION_TYPES = [
    { id: 0, text: 'Aplikasi Mobile' },
    { id: 1, text: 'Aplikasi Web' },
    { id: 2, text: 'Aplikasi Game' },
  ];
  const handleOnClick = () => {
    push('/register-idea/2');
  };
  return (
    <>
      <form>
        <Panel title="Nama Sekolah">
          <TextField
            placeholder="Tulis nama sekolah kamu"
            defaultVal={schools}
            onEmit={setSchools}
          />
        </Panel>
        <Panel title="Nama Guru Pembimbing">
          <TextField
            placeholder="Tulis nama guru pembimbing kamu"
            defaultVal={teacher}
            onEmit={setTeacher}
          />
        </Panel>
        <Panel title="Nama Solusi Digital">
          <TextField
            placeholder="Tulis nama solusi digital kamu"
            defaultVal={solutionName}
            onEmit={setSolutionName}
          />
        </Panel>
        <Panel title="Pilihan Tipe Solusi Digital yang Ingin Kamu Buat">
          <div className="d-flex justify-content-start">
            {SOLUTION_TYPES.map(({ text, id }) => (
              <InputGroup
                key={id}
                className={`${
                  id === solutionType && isRadioActive
                } ${radioBtnWrapper}`}
              >
                <input
                  className={radioBtn}
                  type="radio"
                  name={solutionType}
                  value={solutionType}
                  onChange={() => setSolutionType(id)}
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
            defaultVal={problemSelection}
            onEmit={setProblemSelection}
          />
        </Panel>
        <Panel title="Pemilihan Masalah">
          <TextField
            placeholder="Apa masalah yang ingin kamu selesaikan"
            defaultVal={problemSelection}
            onEmit={setProblemSelection}
            as="textarea"
            className={textArea}
          />
        </Panel>
        <Panel title="Alasan Masalah">
          <TextField
            placeholder="Mengapa kamu ingin menyelesaikan masalah ini"
            defaultVal={problemReason}
            onEmit={setProblemReason}
            as="textarea"
            className={textArea}
          />
        </Panel>
        <Panel title="Target Customer">
          <TextField
            placeholder="Siapa yang ingin kamu bantu"
            defaultVal={targetCustomer}
            onEmit={setTargetCustomer}
          />
        </Panel>
        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleOnClick}>
            Selanjutnya
          </Button>
        </div>
      </form>
    </>
  );
};

export default FormIdeaSolution;
