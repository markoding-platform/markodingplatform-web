import range from 'utils/range';
import BoxLoader from 'components/Shimmer/Box';
import AnnouncementCard from 'components/AnnouncemnetCard';
import styles from './styles.module.scss';
import useAnnouncement from './hooks/useAnnouncement';

const AnnouncementContainer = () => {
  const { data = [], error } = useAnnouncement();

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

  return (
    <>
      <div className="d-flex align-items-center mb-4">
        <h1 className="h3">Pengumuman</h1>
      </div>
      <div>
        {data.length && !error
          ? data.map((announcement) => {
              const { id, title, subtitle, url, datetime } = announcement;
              return (
                <div key={id} className={styles.wrapper}>
                  <AnnouncementCard
                    title={title}
                    subtitle={subtitle}
                    link={url}
                    date={datetime}
                  />
                </div>
              );
            })
          : renderLoader()}
      </div>
    </>
  );
};

AnnouncementContainer.propTypes = {};

export default AnnouncementContainer;
