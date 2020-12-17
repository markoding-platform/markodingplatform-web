import ForumCommentCard from 'components/ForumCommentCard';
import { BiImageAlt, BiSmile } from 'react-icons/bi';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { string } from 'prop-types';
import useQuestion from 'hooks/useQuestion';
import Loading from 'components/Loading';
import ForumCard from 'components/ForumCard';
import questionMap from '../../map/questionMap';
import styles from './styles.module.scss';

const dummyData = [
  {
    id: 1,
    avatarUrl:
      'https://image.freepik.com/free-vector/man-face-close-up_98292-4059.jpg',
    name: 'Muamar Alfatah',
    time: '5 min ago',
    payload: {
      text: 'Begini bagus gak?',
      image:
        'https://image.freepik.com/free-vector/illustration-computer-hacking-code_53876-26940.jpg',
    },
  },
  {
    id: 1,
    avatarUrl:
      'https://image.freepik.com/free-vector/man-face-close-up_98292-4059.jpg',
    name: 'Yusuf Makmur',
    time: '55 min ago',
    payload: {
      text: 'php artisan make:controller \nAuthorController --resource',
      image: '',
    },
  },
];

const QuestionCommentContainer = ({ questionSlug }) => {
  const { data, error } = useQuestion({
    url: `/questions/${questionSlug}`,
  });
  const result = data?.result || {};
  const isLoading = !data && !error;
  const question = questionMap(result);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && question && question.id ? (
        <>
          <div className={styles.chatWrap}>
            <div className="mb-5">
              <ForumCard
                imageUrl={question.imageUrl}
                comment={question.comment}
                name={question.name}
                time={question.time}
              />
            </div>

            {dummyData.map((c) => (
              <div key={c.id} className="ml-xs-0 ml-5 mb-4">
                <ForumCommentCard
                  avatarUrl={c.avatarUrl}
                  name={c.name}
                  time={c.time}
                  payload={c.payload}
                />
              </div>
            ))}
          </div>
          <div className="ml-xs-0 ml-5">
            <div className={styles.inpGroup}>
              <button type="button" className={styles.addImage}>
                <BiImageAlt size={24} />
              </button>
              <Form.Control
                type="text"
                placeholder="Ketik Pesan"
                className={styles.inputChat}
              />
              <BiSmile className={styles.searchIcon} />
            </div>
          </div>
        </>
      ) : (
        <p className="text-danger">Pertanyaan tidak ditemukan</p>
      )}
    </>
  );
};

QuestionCommentContainer.propTypes = {
  questionSlug: string.isRequired,
};

export default QuestionCommentContainer;
