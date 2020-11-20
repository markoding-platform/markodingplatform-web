import { useState } from 'react';
import { useRouter } from 'next/router';

import { Button } from 'react-bootstrap';

import Icon from 'components/Icons';
import Panel from 'components/Panel';
import TextField from 'components/TextField';
import photoPlaceholder from 'svgs/photo-placeholder.svg';
import expands from 'svgs/expands.svg';
import {
  dropArea,
  textArea,
  infoUploader,
  infoText,
} from './styles.module.scss';

const SecondFormIdeaSolution = () => {
  const { push } = useRouter();
  const [solutionSummary, setSolutionSummary] = useState('');
  const [solutionVision, setSolutionVision] = useState('');
  const [targetOutcomes, setTargetOutcomes] = useState('');
  const [solutionBenefit, setSolutionBenefit] = useState('');
  const [solutionObstacle, setSolutionObstacle] = useState('');
  const [solutionPitchUrl, setSolutionPitchUrl] = useState('');
  const [potentialCollaboration, setPotentialCollaboration] = useState('');

  const handleOnClick = () => {
    console.log('masuk sini');
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
            defaultVal={solutionSummary}
            onEmit={setSolutionSummary}
          />
        </Panel>
        <Panel title="Ide Solusi">
          <TextField
            placeholder="Ceritakan tentang ide solusimu dan bagaimana cara bekerjanya"
            defaultVal={solutionVision}
            onEmit={setSolutionVision}
            as="textarea"
            className={textArea}
          />
        </Panel>
        <Panel title="Target Outcomes">
          <TextField
            placeholder="Apa yang ingin kamu capai dengan ide solusimu?"
            defaultVal={targetOutcomes}
            onEmit={setTargetOutcomes}
          />
        </Panel>
        <Panel title="Kelebihan Ide Solusi">
          <TextField
            placeholder="Apa kelebihan ide solusimu dibangding solusi yang sudah ada?"
            defaultVal={solutionBenefit}
            onEmit={setSolutionBenefit}
            as="textarea"
            className={textArea}
          />
        </Panel>
        <Panel title="Kendala">
          <TextField
            placeholder="Apa saja kendala yang akan kamu hadapi dalam menjalankan ide solusi ini dan jelaskan rencanamu untuk mengatasinya?"
            defaultVal={solutionObstacle}
            onEmit={setSolutionObstacle}
          />
        </Panel>
        <Panel title="Link Video">
          <TextField
            placeholder="Sertakan link video pitch tentang ide solusimu"
            defaultVal={solutionPitchUrl}
            onEmit={setSolutionPitchUrl}
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
            defaultVal={potentialCollaboration}
            onEmit={setPotentialCollaboration}
            as="textarea"
            className={textArea}
          />
        </Panel>
        <div className="d-flex justify-content-end">
          <Button variant="outline-primary mr-2" onClick={handleBack}>
            Kembali
          </Button>
          <Button variant="primary" onClick={() => handleOnClick()}>
            Kirim Ide Solusi
          </Button>
        </div>
      </form>
    </>
  );
};

export default SecondFormIdeaSolution;
