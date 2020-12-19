import React from 'react';
import { string } from 'prop-types';
import useQuestion from 'hooks/useQuestion';
import Loading from 'components/Loading';
import ForumCard from 'components/ForumCard';
import questionMap from '../../map/questionMap';
import styles from './styles.module.scss';
import QuestionComments from './comments';
import InputComment from './inputComment';

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
                likeCount={question.likeCount}
                commentCount={question.commentCount}
              />
            </div>

            <QuestionComments questionSlug={questionSlug} />
          </div>
          <div className="ml-xs-0 ml-5">
            <InputComment questionSlug={questionSlug} />
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
