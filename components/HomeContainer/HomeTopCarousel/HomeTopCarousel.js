import React from 'react';
import { shape, string, arrayOf } from 'prop-types';

import EmblaCarousel from 'components/EmblaCarousel';
import BannerItem from 'components/BannerItem';

const HomeTopCarousel = ({ banners }) => {
  return (
    <div className="inner-full-section pb-5">
      <EmblaCarousel slideToScroll={1} withButton>
        {banners.map((banner) => (
          <BannerItem
            key={banner.id}
            imageUrl={banner.src}
            title={banner.title}
            link={banner.link}
          />
        ))}
      </EmblaCarousel>
    </div>
  );
};

HomeTopCarousel.propTypes = {
  banners: arrayOf(
    shape({
      id: string,
      title: string,
      src: string,
      link: string,
    })
  ).isRequired,
};

export default HomeTopCarousel;
