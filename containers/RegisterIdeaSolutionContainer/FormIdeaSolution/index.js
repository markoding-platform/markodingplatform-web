import { useEffect, useState, memo } from 'react';
import { shape } from 'prop-types';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm } from 'react-hook-form';
import { useGlobalFormContext } from 'components/context/FormContext';
import { toast } from 'react-toastify';

import Panel from 'components/Panel';
import TextField from 'components/TextField';
import DropdownComponent from 'components/Dropdown';
import useMyTeachers from 'hooks/useMyTeachers';

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
  const { push, query, pathname } = useRouter();
  const isEditIdea = pathname === '/idea/edit/[slug]';
  const { data: teachersResult } = useMyTeachers({
    url: '/users/my/teachers',
  });
  const teachers = teachersResult;
  const { register, handleSubmit, errors, setValue } = useForm({
    defaultValues: {
      schoolName: profile.schoolName,
      schoolId: profile.schoolId,
    },
  });

  const { inputs, idea, setInputs } = useGlobalFormContext();
  console.log({ idea });

  const [solutionType, setSolutionType] = useState(idea.solutionType?.trim());
  console.log({ solutionType }, idea.solutionType);
  const SOLUTION_TYPES = [
    { id: 0, text: 'Aplikasi Mobile', value: 'mobile' },
    { id: 1, text: 'Aplikasi Web', value: 'web' },
    { id: 2, text: 'Aplikasi Game', value: 'game' },
  ];

  const handleValidateTeams = () => {
    if (inputs?.teamIds?.length) {
      return true;
    }
    return toast.error(
      <p className="m-0 pl-3">Harap menambah anggota team</p>,
      {
        autoClose: 3000,
      }
    );
  };

  const onSubmit = (data) => {
    data.solutionType = solutionType;
    data.schoolId = profile.schoolId;
    data.schoolName = profile.schoolName;
    setInputs({ ...inputs, ideaSolution: { ...data } });
    if (handleValidateTeams() && !isEditIdea) {
      push('/register-idea/2');
    } else {
      push(`/idea/edit/${query.slug}/2`);
    }
  };

  const handleSelectTeacher = (teacher) => {
    setValue('teacherId', teacher.id);
  };

  useEffect(() => {
    if (Object.keys(user).length < 1) {
      push('/');
    }
  }, [push, user]);

  useEffect(() => {
    register('teacherId', { required: true }); // custom register Antd input
  }, [register]);

  return (
    <>
      <form>
        <Panel title="Nama Guru Pembimbing">
          <DropdownComponent
            placeholder="Nama guru kamu"
            onSelected={handleSelectTeacher}
            dropdownItem={teachers}
            withSearch
            name="teacherId"
          />
        </Panel>
        <Panel title="Nama Solusi Digital">
          <TextField
            placeholder="Tulis nama solusi digital kamu"
            defaultVal={idea.solutionName}
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
            defaultVal={idea.problemArea}
            name="problemArea"
            ref={register({ required: true })}
            error={!!errors.problemArea}
            errorTxt="Harap mengisi bidang masalah"
          />
        </Panel>
        <Panel title="Pemilihan Masalah">
          <TextField
            placeholder="Apa masalah yang ingin kamu selesaikan"
            defaultVal={idea.problemSelection}
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
            defaultVal={idea.problemReasoning}
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
            defaultVal={idea.targetCustomer}
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
export default memo(FormIdeaSolution);
