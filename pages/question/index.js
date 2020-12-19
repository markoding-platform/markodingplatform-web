import React from 'react';
import Link from 'next/link';
import ListGroup from 'react-bootstrap/ListGroup';
import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import useChannels from 'hooks/useChannel';
import range from 'utils/range';
import BoxLoader from 'components/Shimmer/Box';
import styles from '../../styles/chat.module.scss';

const Question = () => {
  const { data, error } = useChannels({ url: '/channels' });
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
    <Layout activeMenu="/question">
      <div className={styles.chatContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="pb-4">
          <div className="inner-section">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h3">Tanya Jawab</h1>
            </div>
            {isLoading && renderLoader()}

            {!isLoading && result.length && (
              <ListGroup>
                {result.map((channel) => (
                  <Link key={channel.id} href={`/question/${channel.id}`}>
                    <ListGroup.Item action href={`/question/${channel.id}`}>
                      {`#${channel.name}`}
                    </ListGroup.Item>
                  </Link>
                ))}
              </ListGroup>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Question;
