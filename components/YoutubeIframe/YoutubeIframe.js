import { string } from 'prop-types';
import { useState, useCallback, useEffect } from 'react';

import youtubeVideoIdParser from 'utils/youtubeVIdeoIdParser';
import EmptyPlaceholder from './EmptyPlaceholder';

import {
  styVideoContainer,
  styThumbnail,
  styArrow,
  styPlayBtn,
} from './styles.module.scss';

const YoutubeIframe = ({ solutionPitchUrl, className }) => {
  const videoID = solutionPitchUrl && youtubeVideoIdParser(solutionPitchUrl);
  const embedURL =
    videoID &&
    `https://www.youtube.com/embed/${videoID}?rel=0&amp;autoplay=1&mute=1`;
  const [isPlaying, setIsPlaying] = useState(false);
  const defaultThumnails = `https://i.ytimg.com/vi/${videoID}/hqdefault.jpg`;
  const [thumbnailUrls, setThumbnailUrls] = useState('');

  const handleClickVideo = useCallback(() => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const getImage = useCallback((thumbSrc) => {
    const image = new Image();
    image.src = thumbSrc;
    image.onload = () => {
      if (image.naturalHeight > 90) {
        setThumbnailUrls(thumbSrc);
      }
    };
  }, []);
  const generateImg = useCallback(() => {
    const qualityArr = ['maxresdefault', 'sddefault', 'hqdefault'];
    // eslint-disable-next-line no-restricted-syntax
    for (const el of qualityArr) {
      if (thumbnailUrls.length) {
        break;
      }
      const thumbSrc = `https://i.ytimg.com/vi_webp/${videoID}/${el}.webp`;
      return getImage(thumbSrc);
    }
  }, [getImage, thumbnailUrls.length, videoID]);

  useEffect(() => {
    if (!thumbnailUrls.length) {
      generateImg();
    }
  }, [generateImg, getImage, thumbnailUrls, videoID]);

  return (
    <>
      {videoID && thumbnailUrls.length < 0 && <EmptyPlaceholder />}
      {videoID && embedURL && (
        <div className={className}>
          <div
            className={`${styVideoContainer}`}
            onClick={handleClickVideo}
            aria-hidden="true"
          >
            <>
              <iframe
                title="youtube video"
                src={isPlaying ? embedURL : ''}
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              />
              {!isPlaying && (
                <div>
                  <picture>
                    {thumbnailUrls.length > 0 && (
                      <source srcSet={thumbnailUrls} type="image/webp" />
                    )}
                    <img
                      src={defaultThumnails}
                      className={styThumbnail}
                      alt="thumbnail"
                    />
                    <a className={styPlayBtn}>
                      <div className={styArrow} />
                    </a>
                  </picture>
                </div>
              )}
            </>
          </div>
        </div>
      )}
    </>
  );
};

YoutubeIframe.defaultProps = {
  className: '',
  solutionPitchUrl: '',
};

YoutubeIframe.propTypes = {
  className: string,
  solutionPitchUrl: string,
};

export default YoutubeIframe;
