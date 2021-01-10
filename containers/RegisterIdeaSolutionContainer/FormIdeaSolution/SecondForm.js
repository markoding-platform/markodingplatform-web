import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Button } from 'react-bootstrap';

import Panel from 'components/Panel';
import TextField from 'components/TextField';
import { useGlobalFormContext } from 'components/context/FormContext';
import UploadComponent from '../Upload';
import { textArea } from './styles.module.scss';

const BASE_URL = process.env.MARKODING_API_URL;

const SecondFormIdeaSolution = () => {
  const { push } = useRouter();
  const { inputs } = useGlobalFormContext();
  const { register, handleSubmit, errors } = useForm();
  const [solutionSupportingPhotos, setSolutionSupportingPhotos] = useState('');

  const handlePostIdeas = async (payload) => {
    try {
      const res = await fetch(`${BASE_URL}/ideas`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      res.json().then((data) => {
        if (data.error) {
          console.error({ error: data.message });
        } else {
          push('/idea');
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleUploadImage = (payload) => {
    setSolutionSupportingPhotos(payload);
  };
  const onSubmit = (payload) => {
    const newIdeaSolution = { ...payload, ...inputs.ideaSolution };
    newIdeaSolution.solutionSupportingPhotos = [solutionSupportingPhotos];
    newIdeaSolution.isDraft = false;
    newIdeaSolution.teacherId = '4b3daeba-3aeb-11eb-adc1-0242ac120002';
    handlePostIdeas(newIdeaSolution);
  };

  const onSubmitAsDraft = (payload) => {
    const newIdeaSolution = { ...payload, ...inputs.ideaSolution };
    newIdeaSolution.solutionSupportingPhotos = [solutionSupportingPhotos];
    newIdeaSolution.isDraft = true;
    newIdeaSolution.teacherId = '4b3daeba-3aeb-11eb-adc1-0242ac120002';
    handlePostIdeas(newIdeaSolution);
  };

  const handleBack = () => {
    push('/register-idea');
  };

  useEffect(() => {
    if (Object.keys(inputs).length < 1) {
      push('/register-idea');
    }
  });
  return (
    <>
      <form>
        <Panel title="Solusi Singkat">
          <TextField
            placeholder="Jelaskan solusi dalam 1 kalimat"
            defaultVal={inputs.solutionVision}
            name="solutionVision"
            ref={register({ required: true })}
            error={!!errors.solutionVision}
            errorTxt="Harap mengisi solusi singkat"
          />
        </Panel>
        <Panel title="Ide Solusi">
          <TextField
            placeholder="Ceritakan tentang ide solusimu dan bagaimana cara bekerjanya"
            defaultVal={inputs.solutionMission}
            as="textarea"
            className={textArea}
            name="solutionMission"
            ref={register({ required: true })}
            error={!!errors.solutionMission}
            errorTxt="Harap mengisi ide solusi"
          />
        </Panel>
        <Panel title="Target Outcomes">
          <TextField
            placeholder="Apa yang ingin kamu capai dengan ide solusimu?"
            defaultVal={inputs.targetOutcomes}
            name="targetOutcomes"
            ref={register({ required: true })}
            error={!!errors.targetOutcomes}
            errorTxt="Harap mengisi target outcomes"
          />
        </Panel>
        <Panel title="Kelebihan Ide Solusi">
          <TextField
            placeholder="Apa kelebihan ide solusimu dibangding solusi yang sudah ada?"
            defaultVal={inputs.solutionBenefit}
            name="solutionBenefit"
            ref={register({ required: true })}
            as="textarea"
            className={textArea}
            error={!!errors.solutionBenefit}
            errorTxt="Harap mengisi kelebihan ide solusi"
          />
        </Panel>
        <Panel title="Kendala">
          <TextField
            placeholder="Apa saja kendala yang akan kamu hadapi dalam menjalankan ide solusi ini dan jelaskan rencanamu untuk mengatasinya?"
            defaultVal={inputs.solutionObstacle}
            name="solutionObstacle"
            ref={register({ required: true })}
            error={!!errors.solutionObstacle}
            errorTxt="Harap mengisi kendala"
          />
        </Panel>
        <Panel title="Link Video">
          <TextField
            placeholder="Sertakan link video pitch tentang ide solusimu"
            defaultVal={inputs.solutionPitchUrl}
            name="solutionPitchUrl"
            ref={register({ required: false })}
          />
        </Panel>
        <Panel title="Gambar/Foto Pendukung Ide Solusi">
          <UploadComponent onUploadImg={handleUploadImage} />
        </Panel>
        <Panel title="Kolaborasi Customer">
          <TextField
            placeholder="Siapa saja yang ingin kamu ajak kolaborasi dan jelaskan alasannya untuk mewujudkan ide solusimu?"
            defaultVal={inputs.potentialCollaboration}
            name="potentialCollaboration"
            ref={register({ required: false })}
            as="textarea"
            className={textArea}
          />
        </Panel>
        <div className="d-flex justify-content-end">
          <Button variant="outline-primary mr-2" onClick={handleBack}>
            Kembali
          </Button>
          <Button
            variant="secondary"
            className="mr-2"
            onClick={handleSubmit(onSubmitAsDraft)}
          >
            Simpan Sebagai Draft
          </Button>
          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            Kirim Ide Solusi
          </Button>
        </div>
      </form>
    </>
  );
};

export default SecondFormIdeaSolution;
