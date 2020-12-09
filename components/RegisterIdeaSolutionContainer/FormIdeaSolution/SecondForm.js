import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';

import { Button } from 'react-bootstrap';

import Icon from 'components/Icons';
import Panel from 'components/Panel';
import TextField from 'components/TextField';
import photoPlaceholder from 'svgs/photo-placeholder.svg';
import expands from 'svgs/expands.svg';
import { useGlobalFormContext } from 'components/context/FormContext';
import {
  dropArea,
  textArea,
  infoUploader,
  infoText,
} from './styles.module.scss';

const BASE_URL = 'http://0.0.0.0:8080';

const SecondFormIdeaSolution = () => {
  const { push } = useRouter();
  const { inputs } = useGlobalFormContext();
  const { register, handleSubmit } = useFormContext();

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
  const onSubmit = (payload) => {
    const newIdeaSolution = { ...payload, ...inputs.ideaSolution };
    newIdeaSolution.solutionSupportingPhotos = []; //  upload photos not supported from BE yet
    newIdeaSolution.isDraft = false;
    handlePostIdeas(newIdeaSolution);
  };

  const handleBack = () => {
    push('/register-idea');
  };
  return (
    <>
      <form>
        <Panel title="Solusi Singkat">
          <TextField
            placeholder="Jelaskan solusi dalam 1 kalimat"
            defaultVal={inputs.solutionVision}
            name="solutionVision"
            ref={register({ required: true })}
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
          />
        </Panel>
        <Panel title="Target Outcomes">
          <TextField
            placeholder="Apa yang ingin kamu capai dengan ide solusimu?"
            defaultVal={inputs.targetOutcomes}
            name="targetOutcomes"
            ref={register({ required: true })}
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
          />
        </Panel>
        <Panel title="Kendala">
          <TextField
            placeholder="Apa saja kendala yang akan kamu hadapi dalam menjalankan ide solusi ini dan jelaskan rencanamu untuk mengatasinya?"
            defaultVal={inputs.solutionObstacle}
            name="solutionObstacle"
            ref={register({ required: true })}
          />
        </Panel>
        <Panel title="Link Video">
          <TextField
            placeholder="Sertakan link video pitch tentang ide solusimu"
            defaultVal={inputs.solutionPitchUrl}
            name="solutionPitchUrl"
            ref={register({ required: true })}
          />
        </Panel>
        <Panel title="Gambar/Foto Pendukung Ide Solusi">
          <div className={dropArea}>
            {/* <input
              type="file"
              id="fileElem"
              multiple
              accept="image/*"
              onChange="handleFiles(this.files)"
            /> */}
            <div className={infoUploader}>
              <p>Upload file dari penyimpanan</p>
              <div className="d-flex">
                <div className="d-flex">
                  <Icon src={photoPlaceholder} size={20} />
                  <p className={infoText}>High-Res Image PNG, JPG or GIF </p>
                </div>
                <div className="d-flex">
                  <Icon src={expands} size={20} />
                  <p className={infoText}>Size 1080x1920 or 600x800 </p>
                </div>
              </div>
            </div>
          </div>
        </Panel>
        <Panel title="Kolaborasi Customer">
          <TextField
            placeholder="Siapa saja yang ingin kamu ajak kolaborasi dan jelaskan alasannya untuk mewujudkan ide solusimu?"
            defaultVal={inputs.potentialCollaboration}
            name="potentialCollaboration"
            ref={register({ required: true })}
            as="textarea"
            className={textArea}
          />
        </Panel>
        <div className="d-flex justify-content-end">
          <Button variant="outline-primary mr-2" onClick={handleBack}>
            Kembali
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
