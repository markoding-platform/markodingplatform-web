import CardLoader from 'components/Shimmer/Box';
import range from 'utils/range';

const BlogLoader = () => {
  const renderLoader = () => {
    const loaderArr = [];
    range(1, 6).forEach((item) => {
      loaderArr.push(
        <div key={item} className="w-100">
          <CardLoader className="m-1" />
        </div>
      );
    });
    return loaderArr;
  };

  return <>{renderLoader()}</>;
};

export default BlogLoader;
