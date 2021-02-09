import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { bool } from 'prop-types';

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';

import setCookie from 'utils/setCookie';
import MarkodingFetch from 'libraries/MarkodingFetch';
import Panel from 'components/Panel';
import TextField from 'components/TextField';
import { useIdeaFormContext } from 'components/context/IdeaContext';
import UploadComponent from '../Upload';
import { WORKBOOK_IDEA_URL } from '../../constants';
import { textArea, styButton, boxWarning } from './styles.module.scss';

const expCookie = 86000;

const BoxWarningPhotoVideo = () => (
  <Alert variant="warning">
    <div className={boxWarning}>
      <span>
        Foto/Video yang di-upload harus merupakan murni karya peserta sendiri,
        dan bukan hasil mengambil dari Google atau Youtube milik orang lain.
      </span>
    </div>
  </Alert>
);
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

  const setUserIdeaCookie = (userIdea) => {
    setCookie([
      {
        label: 'userIdea',
        value: JSON.stringify(userIdea),
        age: expCookie,
      },
    ]);
  };

  const handleCreateTeam = async (ideaId, isDraft = false) => {
    const userIds = [teacherId, ...teamIds];
    const filterIds = userIds.filter(Boolean);
    try {
      const { ok } = await MarkodingFetch(`/ideas/${ideaId}/users`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          userIds: filterIds,
        }),
      });
      if (ok) {
        const userIdea = { id: ideaId, isDraft };
        setUserIdeaCookie(userIdea);
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
    const userIdea = { id: ideaId, isDraft: payload.isDraft };
    setUserIdeaCookie(userIdea);

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
    if (payload) {
      setSolutionSupportingPhotos(payload);
    }
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
        <Panel title="Gambaran Ide Solusi">
          <TextField
            placeholder="Bagaimana teman-teman menceritakan ide dari solusi yang ingin teman-teman angkat di dalam satu kalimat?"
            defaultVal={ideaState.solutionVision}
            name="solutionVision"
            ref={register({ required: true })}
            error={!!errors.solutionVision}
            errorTxt="Wajib diisi"
          />
        </Panel>
        <Panel title="Tentang Ide Solusi">
          <TextField
            placeholder="Ceritakan seperti apa ide solusi yang ingin teman-teman rancang. Coba jelaskan : (1) Apa saja fitur yang menarik dari ide ini? (2) Bagaimana fitur tersebut menjawab permasalahan yang ingin teman-teman selesaikan? (3) Apa saja potensi atau manfaat-manfaat lainnya dari fitur tersebut?"
            defaultVal={ideaState.solutionMission}
            as="textarea"
            className={textArea}
            name="solutionMission"
            ref={register({ required: true })}
            error={!!errors.solutionMission}
            errorTxt="Wajib diisi"
          />
        </Panel>
        <Panel title="Dampak Positif, Manfaat atau Perubahan yang Ingin Dicapai">
          <TextField
            placeholder="Apa saja dampak positif, manfaat atau perubahan yang ingin teman-teman lihat dari ide solusi tersebut? Ceritakan perubahan baik yang terjadi di komunitas masyarakat yang ingin kita bantu"
            defaultVal={ideaState.targetOutcomes}
            name="targetOutcomes"
            as="textarea"
            className={textArea}
            ref={register({ required: true })}
            error={!!errors.targetOutcomes}
            errorTxt="Wajib diisi"
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
            errorTxt="Wajib diisi"
          />
        </Panel>
        <Panel title="Tantangan">
          <TextField
            placeholder="Apa saja tantangan yang akan teman-teman hadapi dalam menjalankan ide solusi ini? Risiko apa yang terjadi jika tantangan tersebut tidak diselesaikan? Bagaimana rencana teman-teman untuk mengatasinya?"
            defaultVal={ideaState.solutionObstacle}
            name="solutionObstacle"
            as="textarea"
            className={textArea}
            ref={register({ required: true })}
            error={!!errors.solutionObstacle}
            errorTxt="Wajib diisi"
          />
        </Panel>
        <Panel title="Link Video">
          <BoxWarningPhotoVideo />
          <TextField
            placeholder="Sertakan link video pitch tentang ide solusimu"
            defaultVal={ideaState.solutionPitchUrl}
            name="solutionPitchUrl"
            ref={register({ required: false })}
          />
          <Form.Text className="pt-1">
            URL video yang didukung saat ini adalah URL video dari Youtube.
          </Form.Text>
        </Panel>
        <Panel title="Foto Ide Solusi">
          <BoxWarningPhotoVideo />
          <p className="text-muted mb-2">
            Masukan foto ide solusi berdasarkan template yang ada di Workbook
            Mencari Ide - Menggambar Solusi, yang bisa di unduh di &nbsp;
            <a
              rel="noreferrer"
              href={WORKBOOK_IDEA_URL}
              target="_blank"
              className="text-decoration-none font-weight-bold"
            >
              link ini.
            </a>
          </p>
          <UploadComponent
            onUploadImg={handleUploadImage}
            defaultVal={ideaState.solutionSupportingPhotos?.[0]}
          />
        </Panel>
        <Panel title="Potensi Kolaborasi">
          <TextField
            placeholder="Karena perubahan tidak bisa dilakukan sendirian, siapa pihak-pihak yang teman-teman harap untuk bisa diajak kolaborasi? Seperti apa bentuk kolaborasinya? Apa manfaat yang bisa kita tawarkan untuk mereka?"
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
            Kirim Ide Solusi
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
