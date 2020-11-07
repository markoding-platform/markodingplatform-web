import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image'

const BannerItem = props => {
	const {title, imageUrl, link} = props;
	return (
  <div className="banner-slide">
    <div className="banner-slide-inner">
      <Link href={link}>
        <Image src={imageUrl} alt={title} layout="fill" />
      </Link>
    </div>
  </div>
	);
};

BannerItem.defaultProps = {
	link: '/',
	width: '100%',
	height: 'auto'
};

BannerItem.propTypes = {
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	link: PropTypes.string,
	width: PropTypes.any,
	height: PropTypes.any
};

export default BannerItem;
