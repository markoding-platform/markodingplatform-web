import React from 'react';
import PropTypes, { string } from 'prop-types';
import useQuestion from 'hooks/useQuestion';
import Loading from 'components/Loading';
import ForumCard from 'components/ForumCard';
import MarkodingFetch from 'libraries/MarkodingFetch';
import { mutate } from 'swr';
import questionMap from '../../map/questionMap';
import styles from './styles.module.scss';
import QuestionComments from './comments';
import InputComment from './inputComment';

const QuestionCommentContainer = ({
  channelSlug,
  questionSlug,
  user,
  callBack,
}) => {
  const { data, error } = useQuestion({
    url: `/questions/${questionSlug}`,
  });
  const result = data?.result || {};
  const isLoading = !data && !error;
  const question = questionMap(result);

  const onLikeQuestion = async (qid) => {
    if (user) {
      const likeResult = await MarkodingFetch('/questions/likes', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          isLike: true,
          question: qid,
        }),
      });

      if (likeResult.ok) {
        await mutate(`/questions/${questionSlug}`);
      }
    } else {
      callBack('blocked');
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && question && question.id ? (
        <>
          <div className={styles.chatWrap}>
            <div className="mb-5">
              <ForumCard
                userId={question.userId}
                imageUrl={question.imageUrl}
                comment={question.comment}
                name={question.name}
                time={question.time}
                likeCount={question.likeCount}
                link={`/question/${channelSlug}/${questionSlug}`}
                commentCount={question.commentCount}
                onLike={() => onLikeQuestion(question.id)}
              />
            </div>

            <QuestionComments questionSlug={questionSlug} />
          </div>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div
            className="ml-xs-0 ml-5"
            onClick={() => {
              if (!user) {
                callBack('blocked');
              }
            }}
          >
            <InputComment questionSlug={questionSlug} disabled={!user} />
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
  channelSlug: string.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  callBack: PropTypes.func.isRequired,
};

export default QuestionCommentContainer;
