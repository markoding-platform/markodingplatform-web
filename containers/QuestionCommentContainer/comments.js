import ForumCommentCard from 'components/ForumCommentCard';
import React from 'react';
import useQuestion from 'hooks/useQuestion';
import { string } from 'prop-types';
import Loading from 'components/Loading';
import questionCommentMap from '../../map/questionCommentMap';

const QuestionComments = ({ questionSlug }) => {
  const { data, error } = useQuestion({
    url: `/questions/comments/${questionSlug}?limit=10&offset=0`,
  });
  const result = data?.result || [];
  const isLoading = !data && !error;
  const comments = result.map(questionCommentMap);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading &&
        result.length &&
        comments.map((c) => (
          <div key={c.id} className="ml-xs-0 ml-5 mb-4">
            <ForumCommentCard
              avatarUrl={c.avatarUrl}
              name={c.name}
              time={c.time}
              payload={c.payload}
            />
          </div>
        ))}
    </>
  );
};

QuestionComments.propTypes = {
  questionSlug: string.isRequired,
};

export default QuestionComments;
