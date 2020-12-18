import { string } from 'prop-types';
import Form from 'react-bootstrap/Form';
import { BiSearchAlt2 } from 'react-icons/bi';
import ForumCard from 'components/ForumCard';
import React from 'react';
import useQuestion from 'hooks/useQuestion';
import range from 'utils/range';
import BoxLoader from 'components/Shimmer/Box';
import MarkodingFetch from 'libraries/MarkodingFetch';
import { mutate } from 'swr';
import questionMap from '../../map/questionMap';
import styles from './styles.module.scss';

const QuestionContainer = ({ channelSlug }) => {
  const { data, error } = useQuestion({
    url: `/questions/channel/${channelSlug}?limit=6&offset=0`,
  });
  const result = data?.result || [];
  const isLoading = !data && !error;
  const questions = result.map(questionMap);

  const renderLoader = () => {
    const loaderArr = [];
    range(1, 4).forEach((item) => {
      loaderArr.push(
        <div key={item} className="mb-3">
          <BoxLoader height="60" />
        </div>
      );
    });
    return loaderArr;
  };

  const onLikeQuestion = async (questionSlug) => {
    const likeResult = await MarkodingFetch('/questions/likes', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        isLike: true,
        question: questionSlug,
      }),
    });

    if (likeResult.ok) {
      await mutate(`/questions/channel/${channelSlug}?limit=6&offset=0`);
    }
  };

  return (
    <>
      <div className={styles.searchGroup}>
        <Form.Control
          type="text"
          placeholder="Cari Pertanyaan"
          className={styles.search}
          disabled={isLoading}
        />
        <BiSearchAlt2 className={styles.searchIcon} />
      </div>
      <div className="mt-2">
        {isLoading && renderLoader()}

        {!isLoading && result.length > 0 ? (
          questions.map((q) => (
            <div key={q.id} className="mb-3">
              <ForumCard
                imageUrl={q.imageUrl}
                comment={q.comment}
                name={q.name}
                time={q.time}
                commentCount={q.commentCount}
                likeCount={q.likeCount}
                link={`/chat/${channelSlug}/${q.id}`}
                onLike={() => onLikeQuestion(q.id)}
              />
            </div>
          ))
        ) : (
          <p className="text-danger">Tidak ada pertanyaan</p>
        )}
      </div>
    </>
  );
};

QuestionContainer.propTypes = {
  channelSlug: string.isRequired,
};

export default QuestionContainer;
