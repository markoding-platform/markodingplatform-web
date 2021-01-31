import { useEffect, useState, memo } from 'react';
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
import useProblemArea from 'hooks/useProblemArea';

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
  const { data: problemAreas } = useProblemArea({
    url: '/ideas/problem-area',
  });

  const teachers = teachersResult;

  const { inputs, idea, setInputs, teacher } = useIdeaFormContext();

  const [ideaState] = useState(idea || inputs?.ideaSolution);

  const { register, handleSubmit, errors, setValue, watch } = useForm({
    defaultValues: {
      schoolName: profile.schoolName,
      schoolId: profile.schoolId,
      teacherId: teacher.userId || '',
    },
  });

  const isErrorProblemAreaField =
    errors.problemAreaId && !watch('problemAreaId');

  const [solutionType, setSolutionType] = useState(
    ideaState.solutionType?.trim()
  );

  const SOLUTION_TYPES = [
    { id: 0, text: 'Aplikasi Mobile', value: 'mobile' },
    { id: 1, text: 'Aplikasi Web', value: 'web' },
    { id: 2, text: 'Aplikasi Game', value: 'game' },
  ];

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
    setValue('problemAreaId', payload.value);
  };

  useEffect(() => {
    if (Object.keys(user).length < 1) {
      push('/');
    }
  }, [push, user]);

  useEffect(() => {
    register('teacherId', { required: false });
    register('schoolId', { required: true });
    register('schoolName', { required: true });
    register('problemAreaId', { required: true });
  }, [register]);

  return (
    <>
      <form>
        <Panel title="Nama Guru Pembimbing">
          <DropdownComponent
            placeholder="Nama guru kamu"
            onSelected={handleSelectTeacher}
            dropdownItem={teachers}
            defaultVal={teacher.name}
            inputName="teacherId"
            name="teacherId"
          />
        </Panel>
        <Panel title="Nama Solusi Digital">
          <TextField
            placeholder="Tulis nama solusi digital kamu"
            defaultVal={ideaState.solutionName}
            name="solutionName"
            ref={register({ required: true })}
            error={!!errors.solutionName}
            errorTxt="Wajib diisi"
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
            <Form.Text className="text-muted pt-1">Wajib diisi</Form.Text>
          )}
        </Panel>
        <Panel title="Bidang Masalah">
          <div className={isErrorProblemAreaField && dropdownError}>
            <DropdownComponent
              placeholder="Tulis bidang masalah yang ingin kamu selesaikan"
              onSelected={handleSelectProblemArea}
              dropdownItem={problemAreas}
              defaultVal={ideaState.problemArea}
              inputName="problemAreaId"
              name="problemAreaId"
            />
          </div>
          {isErrorProblemAreaField && (
            <Form.Text className="text-muted pt-1">Wajib diisi</Form.Text>
          )}
        </Panel>
        <Panel title="Menentukan Misi">
          <TextField
            placeholder="Apa masalah yang teman-teman tergerak untuk selesaikan? Ceritakan konteks dan seperti apa situasinya."
            defaultVal={ideaState.problemSelection}
            as="textarea"
            className={textArea}
            name="problemSelection"
            ref={register({ required: true })}
            error={!!errors.problemSelection}
            errorTxt="Wajib diisi"
          />
        </Panel>
        <Panel title="Mengapa masalah ini penting?">
          <TextField
            placeholder="Berikan beberapa alasan mengapa masalah ini perlu kita selesaikan beserta contoh dampak-dampak dari permasalahan ini"
            defaultVal={ideaState.problemReasoning}
            name="problemReasoning"
            ref={register({ required: true })}
            as="textarea"
            className={textArea}
            error={!!errors.problemReasoning}
            errorTxt="Wajib diisi"
          />
        </Panel>
        <Panel title="Siapa orang yang paling terbantu jika masalah ini selesai?">
          <TextField
            placeholder="Ceritakan siapa fokus profil komunitas/individu yang paling terdampak dari masalah ini. Seperti apa orangnya? Seperti apa kesehariannya? Tantangan apa saja yang mereka alami dan rasakan? Seperti apa orang ini jika kita bertemu langsung dengan mereka?"
            defaultVal={ideaState.targetCustomer}
            name="targetCustomer"
            as="textarea"
            className={textArea}
            ref={register({ required: true })}
            error={!!errors.targetCustomer}
            errorTxt="Wajib diisi"
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
