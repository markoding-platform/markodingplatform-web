import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { BiSearchAlt2 } from 'react-icons/bi';
import ForumCard from 'components/ForumCard';
import React, { useCallback, useState } from 'react';
import useQuestion from 'hooks/useQuestion';
import range from 'utils/range';
import BoxLoader from 'components/Shimmer/Box';
import MarkodingFetch from 'libraries/MarkodingFetch';
import { mutate } from 'swr';
import { useRouter } from 'next/router';
import Pagination from 'components/Pagination';
import styles from './styles.module.scss';
import questionMap from '../../map/questionMap';

const QuestionContainer = ({ channelSlug, user, callBack }) => {
  const limit = 6;
  const router = useRouter();
  const { query } = router;
  const currentOffset = Number(query?.start) || 0;
  const currentPage = Number(query?.page) || 1;
  const search = query?.q || '';
  const [keyword, setKeyword] = useState(search);
  const { data, error } = useQuestion({
    url: `/questions/channel/${channelSlug}?limit=${limit}&offset=${currentOffset}&keyword=${search}`,
  });
  const result = data?.result || {};
  const { data: questionsRes, pages = {} } = result;
  const isLoading = !data && !error;
  const questions = questionsRes ? questionsRes.map(questionMap) : [];

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
    if (user) {
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
        await mutate(
          `/questions/channel/${channelSlug}?limit=${limit}&offset=${currentOffset}&keyword=${search}`
        );
      }
    } else {
      callBack('blocked');
    }
  };

  const handlePageChanged = useCallback(
    (page) => {
      const offset = limit * page - limit;
      router.replace(
        `/question/${channelSlug}?page=${page}&start=${offset}&q=${search}`
      );
    },
    [router]
  );

  const onSearch = () => {
    router.replace(`/question/${channelSlug}?q=${keyword}`);
  };

  return (
    <>
      <div className={styles.searchGroup}>
        <Form.Control
          type="text"
          placeholder="Cari Pertanyaan"
          className={styles.search}
          disabled={isLoading}
          value={keyword}
          onChange={(event) => {
            setKeyword(event.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              onSearch();
            }
          }}
        />
        <BiSearchAlt2
          className={styles.searchIcon}
          onClick={() => onSearch()}
        />
      </div>
      <div className="mt-2">
        {isLoading && renderLoader()}

        {!isLoading && questions.length > 0 ? (
          questions.map((q) => (
            <div key={q.id} className="mb-3">
              <ForumCard
                userId={q.userId}
                imageUrl={q.imageUrl}
                comment={q.comment}
                name={q.name}
                time={q.time}
                commentCount={q.commentCount}
                likeCount={q.likeCount}
                link={`/question/${channelSlug}/${q.id}`}
                onLike={() => onLikeQuestion(q.id)}
              />
            </div>
          ))
        ) : (
          <p className="text-danger">Tidak ada pertanyaan</p>
        )}
      </div>
      <div className="d-flex justify-content-center mt-5">
        <Pagination
          totalRecords={pages.count}
          totalPages={pages.totalPages}
          pageLimit={limit}
          onPageChanged={handlePageChanged}
          defaultPage={currentPage}
        />
      </div>
    </>
  );
};

QuestionContainer.defaultProps = {
  callBack: () => {},
};

QuestionContainer.propTypes = {
  channelSlug: PropTypes.string.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  callBack: PropTypes.func,
};

export default QuestionContainer;
