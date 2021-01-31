import BlogCard from 'components/BlogCard';
import useBlog from 'hooks/useBlog';

import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { LIMIT_PER_PAGE } from 'containers/IdeaAndSolutionContainer/constant';
import Pagination from 'components/Pagination';
import SortComponent from 'components/Sort';
import trimText from 'utils/trimText';
import { blogWrapper, blogCardWrapper } from './styles.module.scss';
import BlogLoader from './Loader';

const BlogContainer = () => {
  const SORT_BLOG = [
    {
      id: 0,
      name: 'Sortir berdasarkan A-Z',
      value: 'title',
    },
    {
      id: 1,
      name: 'Sortir berdasarkan Z-A',
      value: '-title',
    },
  ];

  const router = useRouter();
  const { query } = router;
  const currentOffset = Number(query?.start) || 0;
  const currentPage = Number(query?.page) || 1;
  const [activeSort, setActiveSort] = useState('');

  const { isLoading, error, data, pages } = useBlog({
    url: `/blogs?limit=${LIMIT_PER_PAGE}&offset=${currentOffset}&sort=${activeSort}`,
  });
  const blogs = data || [];

  const handlePageChanged = useCallback(
    (page) => {
      const offset = LIMIT_PER_PAGE * page - LIMIT_PER_PAGE;
      router.replace(`/blog/?page=${page}&start=${offset}`);
    },
    [router]
  );

  const handleClickSort = useCallback((sort = {}) => {
    setActiveSort(sort.value);
  }, []);

  return (
    <div className="inner-section">
      <div className="d-flex align-items-center  justify-content-between mb-4">
        <h1 className="h3">Blog</h1>
        <div className="d-flex">
          <SortComponent
            sortItems={SORT_BLOG}
            onClickSortItem={handleClickSort}
          />
        </div>
      </div>
      <div className={blogWrapper}>
        {isLoading && <BlogLoader />}
        {!isLoading && !error && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className={blogCardWrapper}>
              <BlogCard
                key={blog.id}
                imageUrl={blog.imageUrl}
                title={blog.title}
                description={trimText(blog.description, 55)}
                date={blog.createdAt}
                link={`/blog/${blog.id}`}
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="d-flex justify-content-center mt-5">
        <Pagination
          totalRecords={pages.count}
          totalPages={pages.totalPages}
          pageLimit={LIMIT_PER_PAGE}
          onPageChanged={handlePageChanged}
          defaultPage={currentPage}
        />
      </div>
    </div>
  );
};

export default BlogContainer;
