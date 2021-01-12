import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import MarkodingFetch from 'libraries/MarkodingFetch';
import Panel from 'components/Panel';
import TextField from 'components/TextField';
import { useGlobalFormContext } from 'components/context/FormContext';
import UploadComponent from '../Upload';
import { textArea } from './styles.module.scss';

const SecondFormIdeaSolution = () => {
  const { push, pathname, query } = useRouter();
  const { inputs, idea } = useGlobalFormContext();
  const { register, handleSubmit, errors } = useForm();
  const isEditIdea = pathname.includes('/idea/edit');
  const ideaPhoto = idea.solutionSupportingPhotos?.[0] || '';
  const [solutionSupportingPhotos, setSolutionSupportingPhotos] = useState(
    ideaPhoto
  );

  const renderToast = (msg, error = false) => {
    if (error) {
      return toast.error(<p className="m-0 pl-3">{msg}</p>, {
        autoClose: 3000,
      });
    }
    return toast.success(<p className="m-0 pl-3">{msg}</p>, {
      autoClose: 3000,
    });
  };

  const handleCreateTeam = async (ideaId) => {
    try {
      const { ok } = await MarkodingFetch(`/ideas/${ideaId}/team`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          userIds: inputs.teamIds,
        }),
      });
      // TODO handle error
      if (ok) {
        renderToast('Berhasil mendaftarkan ide mu');
        push('/idea');
      } else {
        renderToast('Gagal mendaftarkan ide mu');
      }
    } catch (e) {
      console.error(e);
      renderToast('Gagal mendaftarkan ide mu');
    }
  };

  const handlePostIdeas = async (payload) => {
    try {
      const { ok } = await MarkodingFetch('/ideas', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (ok) {
        renderToast('Berhasil menyimpan ide');
        // handleCreateTeam(result.id);
      } else {
        renderToast('Gagal menyimpan ide mu', true);
      }
    } catch (e) {
      console.error(e);
      renderToast('Gagal menyimpan ide mu', true);
    }
  };

  const handleEditIdea = async (payload) => {
    const ideaId = query.slug;
    try {
      const { ok, result } = await MarkodingFetch(`/ideas/${ideaId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      // TODO handle error
      if (ok) {
        console.log('handlePostIdeas', { result });
        handleCreateTeam(result.id);
      }
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
    if (isEditIdea) {
      return handleEditIdea(newIdeaSolution);
    }
    handlePostIdeas(newIdeaSolution);
  };

  const onSubmitAsDraft = (payload) => {
    const newIdeaSolution = { ...payload, ...inputs.ideaSolution };
    newIdeaSolution.solutionSupportingPhotos = [solutionSupportingPhotos];
    newIdeaSolution.isDraft = true;
    if (isEditIdea) {
      return handleEditIdea(newIdeaSolution);
    }
    handlePostIdeas(newIdeaSolution);
  };

  const handleBack = () => {
    push('/register-idea');
  };

  useEffect(() => {
    if (!inputs.ideaSolution) {
      push('/register-idea');
    }
  }, [inputs.ideaSolution, push]);
  return (
    <>
      <form>
        <Panel title="Solusi Singkat">
          <TextField
            placeholder="Jelaskan solusi dalam 1 kalimat"
            defaultVal={idea.solutionVision}
            name="solutionVision"
            ref={register({ required: true })}
            error={!!errors.solutionVision}
            errorTxt="Harap mengisi solusi singkat"
          />
        </Panel>
        <Panel title="Ide Solusi">
          <TextField
            placeholder="Ceritakan tentang ide solusimu dan bagaimana cara bekerjanya"
            defaultVal={idea.solutionMission}
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
            defaultVal={idea.targetOutcomes}
            name="targetOutcomes"
            ref={register({ required: true })}
            error={!!errors.targetOutcomes}
            errorTxt="Harap mengisi target outcomes"
          />
        </Panel>
        <Panel title="Kelebihan Ide Solusi">
          <TextField
            placeholder="Apa kelebihan ide solusimu dibangding solusi yang sudah ada?"
            defaultVal={idea.solutionBenefit}
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
            defaultVal={idea.solutionObstacle}
            name="solutionObstacle"
            ref={register({ required: true })}
            error={!!errors.solutionObstacle}
            errorTxt="Harap mengisi kendala"
          />
        </Panel>
        <Panel title="Link Video">
          <TextField
            placeholder="Sertakan link video pitch tentang ide solusimu"
            defaultVal={idea.solutionPitchUrl}
            name="solutionPitchUrl"
            ref={register({ required: false })}
          />
        </Panel>
        <Panel title="Gambar/Foto Pendukung Ide Solusi">
          <UploadComponent
            onUploadImg={handleUploadImage}
            defaultVal={solutionSupportingPhotos}
          />
        </Panel>
        <Panel title="Kolaborasi Customer">
          <TextField
            placeholder="Siapa saja yang ingin kamu ajak kolaborasi dan jelaskan alasannya untuk mewujudkan ide solusimu?"
            defaultVal={idea.potentialCollaboration}
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
            {isEditIdea ? 'Simpan' : 'Kirim Ide Solusi'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default SecondFormIdeaSolution;
