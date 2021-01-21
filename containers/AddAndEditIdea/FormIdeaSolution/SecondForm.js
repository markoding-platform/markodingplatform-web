import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { bool } from 'prop-types';

import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';

import MarkodingFetch from 'libraries/MarkodingFetch';
import Panel from 'components/Panel';
import TextField from 'components/TextField';
import { useIdeaFormContext } from 'components/context/IdeaContext';
import UploadComponent from '../Upload';
import { textArea, styButton } from './styles.module.scss';

const SecondFormIdeaSolution = ({ isEditIdea }) => {
  const { push, query, back } = useRouter();
  const {
    inputs,
    inputs: { ideaSolution, teamIds },
    idea,
  } = useIdeaFormContext();
  const teacherId = ideaSolution?.teacherId;

  const [ideaState] = useState(idea || ideaSolution);

  const { register, handleSubmit, errors } = useForm();
  const ideaPhoto = ideaState.solutionSupportingPhotos?.[0] || '';
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

  const handleCreateTeam = async (ideaId, isDraft = false) => {
    try {
      const { ok } = await MarkodingFetch(`/ideas/${ideaId}/users`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          userIds: [teacherId, ...teamIds],
        }),
      });
      if (ok) {
        const msg =
          isEditIdea || isDraft
            ? 'Berhasil menyimpan ide'
            : 'Berhasil mendaftarkan ide mu';
        renderToast(msg);
        push('/idea');
      } else {
        renderToast('Gagal mendaftarkan ide mu', true);
      }
    } catch (e) {
      console.error(e);
      renderToast('Gagal mendaftarkan ide mu', true);
    }
  };

  const handlePostIdeas = async (payload) => {
    try {
      const { ok, result } = await MarkodingFetch('/ideas', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (ok) {
        handleCreateTeam(result.id, payload.isDraft);
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
      const { ok } = await MarkodingFetch(`/ideas/${ideaId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      if (ok) {
        renderToast('Berhasil menyimpan ide mu');
        push('/idea');
      } else {
        renderToast('Gagal menyimpan ide mu', true);
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

  const handleBack = useCallback(() => back(), [back]);

  useEffect(() => {
    if (!Object.keys(ideaSolution).length) {
      handleBack();
    }
  }, [handleBack, ideaSolution, push]);
  return (
    <>
      <form>
        <Panel title="Solusi Singkat">
          <TextField
            placeholder="Jelaskan solusi dalam 1 kalimat"
            defaultVal={ideaState.solutionVision}
            name="solutionVision"
            ref={register({ required: true })}
            error={!!errors.solutionVision}
            errorTxt="Harap mengisi solusi singkat"
          />
        </Panel>
        <Panel title="Ide Solusi">
          <TextField
            placeholder="Ceritakan tentang ide solusimu dan bagaimana cara bekerjanya"
            defaultVal={ideaState.solutionMission}
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
            defaultVal={ideaState.targetOutcomes}
            name="targetOutcomes"
            ref={register({ required: true })}
            error={!!errors.targetOutcomes}
            errorTxt="Harap mengisi target outcomes"
          />
        </Panel>
        <Panel title="Kelebihan Ide Solusi">
          <TextField
            placeholder="Apa kelebihan ide solusimu dibangding solusi yang sudah ada?"
            defaultVal={ideaState.solutionBenefit}
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
            defaultVal={ideaState.solutionObstacle}
            name="solutionObstacle"
            ref={register({ required: true })}
            error={!!errors.solutionObstacle}
            errorTxt="Harap mengisi kendala"
          />
        </Panel>
        <Panel title="Link Video">
          <TextField
            placeholder="Sertakan link video pitch tentang ide solusimu"
            defaultVal={ideaState.solutionPitchUrl}
            name="solutionPitchUrl"
            ref={register({ required: false })}
          />
          <Form.Text className="text-muted pt-1">
            URL video yang didukung saat ini adalah URL video dari Youtube.
          </Form.Text>
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
            defaultVal={ideaState.potentialCollaboration}
            name="potentialCollaboration"
            ref={register({ required: false })}
            as="textarea"
            className={textArea}
          />
        </Panel>
        <div className="d-flex justify-content-end">
          <Button
            variant="outline-primary"
            className={`mr-2 ${styButton}`}
            onClick={handleBack}
          >
            Kembali
          </Button>
          <Button
            variant="secondary"
            className={`mr-2 ${styButton}`}
            onClick={handleSubmit(onSubmitAsDraft)}
          >
            Simpan Sebagai Draft
          </Button>
          <Button
            variant="primary"
            className={`mr-2 ${styButton}`}
            onClick={handleSubmit(onSubmit)}
          >
            {isEditIdea ? 'Simpan' : 'Kirim Ide Solusi'}
          </Button>
        </div>
      </form>
    </>
  );
};

SecondFormIdeaSolution.propTypes = {
  isEditIdea: bool.isRequired,
};
export default SecondFormIdeaSolution;
