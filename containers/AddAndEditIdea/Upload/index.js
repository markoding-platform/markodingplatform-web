import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { func } from 'prop-types';

import { BsTrash } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import MarkodingFetch from 'libraries/MarkodingFetch';
import Icon from 'components/Icons';
import photoPlaceholder from 'svgs/photo-placeholder.svg';
import expands from 'svgs/expands.svg';
import {
  dropArea,
  infoUploader,
  infoText,
  imageViewer,
  btnRemoveImage,
} from './styles.module.scss';

const types = ['image/png', 'image/jpeg'];

const UploadComponent = ({ onUploadImg, defaultVal }) => {
  const inputFileRef = useRef();
  const [imageSrc, setImagesSrc] = useState(defaultVal);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickUploader = () => {
    inputFileRef.current?.click();
  };

  const renderErrorToast = (errMsg) =>
    toast.error(<p className="m-0 pl-3">{errMsg}</p>, { autoClose: 3000 });

  const handlePostImage = useCallback(
    async (files) => {
      const formData = new FormData();

      files.forEach((file, i) => {
        if (types.every((type) => file.type !== type)) {
          return renderErrorToast(`tidak support format file ${file.type}`);
        }

        if (Math.round(file.size / 1024 / 1024) > 1) {
          return renderErrorToast(`Ukuran gambar terlalu besar. max 1 MiB`);
        }
        formData.append(i, file);
      });
      const res = await MarkodingFetch(`/uplodsads?path=ideas`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok && res.result && res.result.url) {
        setImagesSrc(res.result.url);
        onUploadImg(res.result.url);
      }
      if (!res.ok) {
        console.error(res);
        setIsLoading(false);
        return renderErrorToast('Ooops! Gagal mengupload gambar');
      }
      setIsLoading(false);
    },
    [onUploadImg]
  );

  const handleOnChange = (e) => {
    const files = Array.from(e.target.files);
    setIsLoading(true);
    handlePostImage(files);
  };

  const handleRemoveImage = () => {
    setImagesSrc('');
    onUploadImg('');
  };

  return (
    <div aria-hidden onClick={handleClickUploader}>
      {imageSrc && (
        <div className={imageViewer}>
          <Image src={imageSrc} layout="fill" objectFit="cover" />
          <Button
            variant="secondary"
            className={btnRemoveImage}
            onClick={handleRemoveImage}
          >
            Hapus
            <span className="pl-2">
              <BsTrash width="40" height="40" />
            </span>
          </Button>
        </div>
      )}

      {!imageSrc && (
        <div className={dropArea}>
          <input
            type="file"
            multiple
            accept="image"
            onChange={handleOnChange}
            ref={inputFileRef}
            style={{ display: 'none' }}
          />
          <div className={infoUploader}>
            {isLoading && (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}
            <p>Upload file dari penyimpanan</p>
            <div className="d-flex">
              <div className="d-flex">
                <Icon src={photoPlaceholder} size={20} />
                <p className={infoText}>High-Res Image PNG, JPG </p>
              </div>
              <div className="d-flex">
                <Icon src={expands} size={20} />
                <p className={infoText}>Size 1080x1920 or 600x800 </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

UploadComponent.propTypes = {
  onUploadImg: func.isRequired,
};

export default UploadComponent;
