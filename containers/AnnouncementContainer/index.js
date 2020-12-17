import range from 'utils/range';
import BoxLoader from 'components/Shimmer/Box';
import AnnouncementCard from 'components/AnnouncemnetCard';
import useAnnouncement from 'hooks/useAnnouncement';
import Icon from 'components/Icons';
import styles from './styles.module.scss';
import warningBell from '../../svgs/warning-bell.svg';

const AnnouncementContainer = () => {
  const { data, error } = useAnnouncement();
  const result = data?.result || [];
  const isLoading = !data && !error;

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
        {isLoading && renderLoader()}
        {!isLoading && result.length > 0 ? (
          result.map((announcement) => {
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
        ) : (
          <div className={styles.emptyState}>
            <Icon src={warningBell} size={170} className="mb-3" />
            <h5 className="mb-1">Belum Ada Pengumuman</h5>
            <p className={styles.textInfo}>
              Saat ini belum ada pengumuman untuk kamu, jangan lupa kembali lagi
              ya
            </p>
          </div>
        )}
      </div>
    </>
  );
};

AnnouncementContainer.propTypes = {};

export default AnnouncementContainer;
