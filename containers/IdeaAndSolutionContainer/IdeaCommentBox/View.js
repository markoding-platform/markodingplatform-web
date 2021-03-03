import { useState, useCallback } from 'react';
import { string, func } from 'prop-types';
import { mutate } from 'swr';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { toast } from 'react-toastify';
import MarkodingFetch from 'libraries/MarkodingFetch';

import { LIMIT_PER_PAGE } from 'containers/IdeaAndSolutionContainer/constant';
import getCookie from 'utils/getCookie';
import canUseDOM from 'utils/canUseDOM';
import Panel from 'components/Panel';
import { textArea } from './styles.module.scss';

const IdeaCommentBox = ({ ideaId, onBlockAuth }) => {
  const [textValue, setTextValue] = useState('');
  const userId = canUseDOM && getCookie('userID');

  const handleOnChange = (e) => {
    const {
      target: { value },
    } = e;
    setTextValue(value);
  };

  const postComment = useCallback(
    async (payload) => {
      try {
        const commentRes = await MarkodingFetch(`/ideas/${ideaId}/comment`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(payload),
        });
        if (commentRes.ok) {
          try {
            await mutate(
              `/ideas/${ideaId}/comment?offset=0&limit=${LIMIT_PER_PAGE}`
            );
          } catch (e) {
            console.error(e);
          }

          return toast.success(
            <p className="m-0 pl-3">Berhasil mengirimkan komentar</p>,
            {
              autoClose: 3000,
            }
          );
        }
        return toast.error(
          <p className="m-0 pl-3">Ooops! Gagal mengirimkan komentar</p>,
          {
            autoClose: 3000,
          }
        );
      } catch (e) {
        console.error(e);
      }
    },
    [ideaId]
  );
  const handleSubmitComment = () => {
    if (!userId) return onBlockAuth();
    const payload = {
      comment: textValue,
      ideaId,
      userId,
    };
    postComment(payload);
    return setTextValue('');
  };
  return (
    <Panel title="Komentar">
      <InputGroup>
        <FormControl
          className={textArea}
          as="textarea"
          name="ideaComment"
          placeholder="Berikan pendapatmu disini..."
          value={textValue}
          aria-describedby="inputGroup-sizing"
          onChange={handleOnChange}
          autoComplete="off"
        />
      </InputGroup>
      <div className="d-flex justify-content-end mt-2">
        <Button disabled={!textValue} onClick={handleSubmitComment}>
          Kirim Komentar
        </Button>
      </div>
    </Panel>
  );
};

IdeaCommentBox.propTypes = {
  ideaId: string.isRequired,
  onBlockAuth: func.isRequired,
};
export default IdeaCommentBox;
