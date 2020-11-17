import PropTypes from 'prop-types';
import React, { useEffect, useCallback, useState } from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';
import { DotButton, PrevButton, NextButton } from '../EmblaCarouselButton';
import styles from './styles.module.scss';
import useInterval from '../../hooks/useInterval';

const EmblaCarousel = ({
  children,
  withButton,
  slideToScroll,
  autoPlay,
  delay,
}) => {
  const [viewportRef, embla] = useEmblaCarousel({
    slidesToScroll: slideToScroll,
    align: 0.02,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const scrollTo = useCallback((index) => embla && embla.scrollTo(index), [
    embla,
  ]);

  useInterval(
    () => {
      if (selectedIndex === scrollSnaps.length - 1) {
        scrollTo(0);
      } else {
        scrollNext();
      }
    },
    autoPlay ? delay : null
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on('select', onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={viewportRef}>
        <div className={styles.embla__container}>{children}</div>
      </div>
      {withButton && (
        <div className={styles.embla__dots}>
          <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          {scrollSnaps.map((_, index) => {
            const key = `dot-${index}`;
            return (
              <DotButton
                key={key}
                selected={index === selectedIndex}
                onClick={() => scrollTo(index)}
              />
            );
          })}
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </div>
      )}
    </div>
  );
};

EmblaCarousel.defaultProps = {
  withButton: false,
  autoPlay: false,
  delay: 8000,
  slideToScroll: 1,
};

EmblaCarousel.propTypes = {
  withButton: PropTypes.bool,
  autoPlay: PropTypes.bool,
  delay: PropTypes.number,
  slideToScroll: PropTypes.number,
  children: PropTypes.array.isRequired,
};

export default EmblaCarousel;
