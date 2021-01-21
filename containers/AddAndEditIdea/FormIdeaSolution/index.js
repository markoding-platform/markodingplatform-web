import { useEffect, useState, memo, useMemo } from 'react';
import { shape, bool } from 'prop-types';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm } from 'react-hook-form';
import { useIdeaFormContext } from 'components/context/IdeaContext';
import { toast } from 'react-toastify';

import Panel from 'components/Panel';
import TextField from 'components/TextField';
import DropdownComponent from 'components/Dropdown';
import useMyTeachers from 'hooks/useMyTeachers';
import { PROBLEM_LIST } from '../constants';

import {
  radioBtnWrapper,
  radioBtn,
  radioInputText,
  textArea,
  isRadioActive,
  inputSolutionType,
  dropdownError,
} from './styles.module.scss';

const FormIdeaSolution = ({ user, isEditIdea }) => {
  const profile = user?.profile || {};

  const { push, query } = useRouter();
  const { data: teachersResult } = useMyTeachers({
    url: '/users/my/teachers',
  });
  const teachers = teachersResult;

  const { inputs, idea, setInputs, teacher } = useIdeaFormContext();
  const [ideaState] = useState(idea || inputs?.ideaSolution);

  const { register, handleSubmit, errors, setValue, watch } = useForm({
    defaultValues: {
      schoolName: profile.schoolName,
      schoolId: profile.schoolId,
      teacherId: teacher.userId || '',
      problemArea: ideaState.problemArea,
    },
  });

  const isErrorTeacherField = errors.teacherId && !watch('teacherId');
  const isErrorProblemAreaField = errors.teacherId && !watch('problemArea');

  const [solutionType, setSolutionType] = useState(
    ideaState.solutionType?.trim()
  );

  const SOLUTION_TYPES = [
    { id: 0, text: 'Aplikasi Mobile', value: 'Mobile' },
    { id: 1, text: 'Aplikasi Web', value: 'Web' },
    { id: 2, text: 'Aplikasi Game', value: 'Game' },
  ];

  const problemList = useMemo(() => {
    return PROBLEM_LIST.map((prob, idx) => ({
      id: idx,
      name: prob,
      value: prob,
    }));
  }, []);

  const handleValidateTeams = () => {
    if (inputs?.teamIds?.length) {
      return true;
    }
    return false;
  };

  const onSubmit = (data) => {
    setInputs({ ...inputs, ideaSolution: { ...data } });

    if (!isEditIdea && !handleValidateTeams()) {
      return toast.error(
        <p className="m-0 pl-3">Harap menambah anggota team</p>,
        {
          autoClose: 3000,
        }
      );
    }
    if (!isEditIdea) {
      push('/register-idea/2');
    } else {
      push(`/idea/edit/${query.slug}/2`);
    }
  };

  const handleSelectTeacher = (payload) => {
    setValue('teacherId', payload.id);
  };

  const handleSelectProblemArea = (payload) => {
    setValue('problemArea', payload.value);
  };

  useEffect(() => {
    if (Object.keys(user).length < 1) {
      push('/');
    }
  }, [push, user]);

  useEffect(() => {
    register('teacherId', { required: true });
    register('schoolId', { required: true });
    register('schoolName', { required: true });
    register('problemArea', { required: true });
  }, [register]);

  return (
    <>
      <form>
        <Panel title="Nama Guru Pembimbing">
          <div className={isErrorTeacherField && dropdownError}>
            <DropdownComponent
              placeholder="Nama guru kamu"
              onSelected={handleSelectTeacher}
              dropdownItem={teachers}
              defaultVal={teacher.name}
              inputName="teacherId"
              name="teacherId"
            />
          </div>
          {isErrorTeacherField && (
            <Form.Text className="text-muted pt-1">
              Harap mengisi nama guru
            </Form.Text>
          )}
        </Panel>
        <Panel title="Nama Solusi Digital">
          <TextField
            placeholder="Tulis nama solusi digital kamu"
            defaultVal={ideaState.solutionName}
            name="solutionName"
            ref={register({ required: true })}
            error={!!errors.solutionName}
            errorTxt="Harap mengisi solusi digital"
          />
        </Panel>
        <Panel title="Pilihan Tipe Solusi Digital yang Ingin Kamu Buat">
          <div className={inputSolutionType}>
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
          </div>
          {errors.solutionType && (
            <Form.Text className="text-muted pt-1">
              Harap memilih tipe solusi digital
            </Form.Text>
          )}
        </Panel>
        <Panel title="Bidang Masalah">
          <div className={isErrorProblemAreaField && dropdownError}>
            <DropdownComponent
              placeholder="Tulis bidang masalah yang ingin kamu selesaikan"
              onSelected={handleSelectProblemArea}
              dropdownItem={problemList}
              defaultVal={ideaState.problemArea}
              inputName="problemArea"
              name="problemArea"
            />
          </div>
          {isErrorProblemAreaField && (
            <Form.Text className="text-muted pt-1">
              Harap mengisi nama guru
            </Form.Text>
          )}
        </Panel>
        <Panel title="Pemilihan Masalah">
          <TextField
            placeholder="Apa masalah yang ingin kamu selesaikan"
            defaultVal={ideaState.problemSelection}
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
            defaultVal={ideaState.problemReasoning}
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
            defaultVal={ideaState.targetCustomer}
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
  isEditIdea: bool.isRequired,
  user: shape({}).isRequired,
};
export default memo(FormIdeaSolution);
