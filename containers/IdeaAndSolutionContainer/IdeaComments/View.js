import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

import useIdeaComments from 'hooks/useIdeaComments';
import ForumCard from 'components/ForumCard';
import Pagination from 'components/Pagination';
import { LIMIT_PER_PAGE } from 'containers/IdeaAndSolutionContainer/constant';

dayjs.locale('id');

const IdeaCommentsContainer = () => {
  const { query } = useRouter();
  const ideaId = query.id;
  const [currentOffset, setCurrentOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const { data, pages } = useIdeaComments({
    url: `/ideas/${ideaId}/comment?offset=${currentOffset}&limit=${LIMIT_PER_PAGE}`,
    skip: !ideaId,
  });

  const handlePageChanged = useCallback((page) => {
    const offset = LIMIT_PER_PAGE * page - LIMIT_PER_PAGE;
    setCurrentOffset(offset);
    setCurrentPage(page);
  }, []);

  return (
    <div className="mt-5">
      {data.length > 0 && (
        <>
          {data.map((idea) => {
            const { user = {} } = idea || {};
            return (
              <div key={idea.id} className="mb-3">
                <ForumCard
                  userId={user.id}
                  imageUrl={user.imageUrl}
                  comment={idea.comment}
                  name={user.name}
                  time={dayjs(idea.createdAt).format('dddd, DD MMMM YYYY')}
                  onLike={() => {}}
                  withLikes={false}
                  profile={user?.profile || {}}
                />
              </div>
            );
          })}
          <div className="d-flex justify-content-center mt-5">
            <Pagination
              totalRecords={pages.count}
              totalPages={pages.totalPages}
              pageLimit={LIMIT_PER_PAGE}
              onPageChanged={handlePageChanged}
              defaultPage={currentPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default IdeaCommentsContainer;
