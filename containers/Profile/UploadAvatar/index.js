import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { func } from 'prop-types';

import Spinner from 'react-bootstrap/Spinner';
import { BsTrash } from 'react-icons/bs';

import { RiPencilFill } from 'react-icons/ri';

import MarkodingFetch from 'libraries/MarkodingFetch';
import Avatar from 'svgs/avatar.svg';
import { imgLoader, uploadBtn } from './styles.module.scss';

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
      const res = await MarkodingFetch(`/uploads?path=ideas`, {
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
        <div>
          <Image
            width={150}
            height={132}
            layout="fixed"
            className="rounded-circle"
            src={imageSrc || Avatar}
          />
          <div onClick={handleRemoveImage} aria-hidden className={uploadBtn}>
            <BsTrash size="20" />
            <span className="ml-2 ">Hapus</span>
          </div>
        </div>
      )}
      {!imageSrc && (
        <div className="position-relative">
          <Image
            width={150}
            height={132}
            layout="fixed"
            className="rounded-circle"
            src={Avatar}
          />
          {isLoading && (
            <div className={imgLoader}>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          )}
          <div className={uploadBtn}>
            <RiPencilFill size="20" />
            <span className="ml-2">
              <input
                type="file"
                multiple
                accept="image"
                onChange={handleOnChange}
                ref={inputFileRef}
                style={{ display: 'none' }}
                disabled={isLoading}
              />
              Edit
            </span>
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
