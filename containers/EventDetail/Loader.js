import BoxLoader from 'components/Shimmer/Box';

const EventLoader = () => {
  return (
    <>
      <div className="mb-4">
        <BoxLoader width="100" height="33" />
      </div>
      <BoxLoader height="457" />
      <BoxLoader className="mt-4" width="150" height="33" />
    </>
  );
};

export default EventLoader;
