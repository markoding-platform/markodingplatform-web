import PropTypes from 'prop-types';
import EmblaCarousel from 'components/EmblaCarousel';
import BannerItem from 'components/BannerItem';
import Layout from '../components/Layout';

const Home = ({ banners }) => {
  return (
    <Layout>
      <div>
        <EmblaCarousel slideToScroll={1} withButton autoPlay>
          {banners.map(banner => (<BannerItem key={banner.id} imageUrl={banner.src} title={banner.title} link={banner.link} />))}
        </EmblaCarousel>
      </div>
    </Layout>
  );
};

Home.defaultProps = {
	banners: [{
		id: 'one',
		title: 'dummy one',
		src: 'https://image.freepik.com/free-photo/teacher-pointing-her-with-copy-space_23-2148668633.jpg',
		link: '/'
	},
		{
			id: 'two',
			title: 'dummy two',
			src: 'https://image.freepik.com/free-photo/back-school-concept-books-colored-pencils-clock_155003-9212.jpg',
			link: '/'
		},
		{
			id: 'three',
			title: 'dummy three',
			src: 'https://image.freepik.com/free-photo/young-schoolgirl-eyeglasses-holding-her-books-makes-confused-face_114579-14906.jpg',
			link: '/'
		}]
};

Home.propTypes = {
	banners: PropTypes.array
};

export default Home;
