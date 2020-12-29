import React from 'react';

import EmblaCarousel from 'components/EmblaCarousel';
import BannerItem from 'components/BannerItem';
import useBanners from 'hooks/useBanners';
import { bannerMap } from 'map/bannerMap';

const HomeTopCarousel = () => {
  const { data, error } = useBanners({ url: '/banners' });
  const result = data?.result || [];
  const isLoading = !data && !error;

  const banners = !isLoading ? bannerMap(result) : [];
  return (
    <div className="inner-full-section pb-5">
      {!isLoading && banners.length > 0 && (
        <EmblaCarousel slideToScroll={1} withButton>
          {banners.map((banner, idx) => (
            <BannerItem
              key={banner.id}
              imageUrl={banner.imageUrl}
              title={`banner-${idx}`}
              link={banner.link}
            />
          ))}
        </EmblaCarousel>
      )}
    </div>
  );
};

export default HomeTopCarousel;
