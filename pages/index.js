import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import EmblaCarousel from 'components/EmblaCarousel';
import BannerItem from 'components/BannerItem';
import SectionCardWrapper from 'components/SectionCardWrapper';
import EventCard from 'components/EventCard';
import IdeaCard from 'components/IdeaCard';
import CoursesCard from 'components/CoursesCard';
import BlogCard from 'components/BlogCard';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import Layout from '../components/Layout';

const Home = ({ banners, dataDummy }) => {
	const [alertShow, setAlertShow] = useState(true);

  return (
    <Layout>
      <div className="home">
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="inner-section">
          <Alert show={alertShow} variant="primary" onClose={() => setAlertShow(false)} dismissible>
            <p className="mb-0">
              Lengkapi Profile mu
            </p>
          </Alert>
        </div>
        <div className="inner-full-section pb-5">
          <EmblaCarousel slideToScroll={1} withButton>
            {banners.map(banner => (<BannerItem key={banner.id} imageUrl={banner.src} title={banner.title} link={banner.link} />))}
          </EmblaCarousel>
        </div>
        <div className="pb-5">
          <SectionCardWrapper title="Event Terdekat" link="/events">
            {dataDummy.map(event => (<EventCard key={event.id} imageUrl={event.src} title={event.title} date={event.date} time={event.time} link={event.link} />))}
          </SectionCardWrapper>
        </div>
        <div className="pb-5">
          <SectionCardWrapper title="Galeri Ide Solusi" link="/idea">
            {dataDummy.map(idea => (<IdeaCard key={idea.id} link={idea.link} imageUrl={idea.src} title={idea.title} description={idea.description} />))}
          </SectionCardWrapper>
        </div>
        <div className="pb-5">
          <SectionCardWrapper title="Kelas Online" link="/skilvul">
            {dataDummy.map(course => (<CoursesCard key={course.id} imageUrl={course.src} title={course.title} description={course.description} link={course.link} />))}
          </SectionCardWrapper>
        </div>
        <div className="pb-5">
          <SectionCardWrapper title="Cerita Markoding" link="/blog">
            {dataDummy.map(blog => (<BlogCard key={blog.id} imageUrl={blog.src} title={blog.title} description={blog.description} date={blog.date} link={blog.link} />))}
          </SectionCardWrapper>
        </div>
      </div>
    </Layout>
  );
};

Home.defaultProps = {
	banners: [{
		id: 'one',
		title: 'dummy one',
		src: 'https://image.freepik.com/free-photo/teacher-pointing-her-with-copy-space_23-2148668633.jpg',
		link: '/todo'
	},
		{
			id: 'two',
			title: 'dummy two',
			src: 'https://image.freepik.com/free-photo/back-school-concept-books-colored-pencils-clock_155003-9212.jpg',
			link: '/todo'
		},
		{
			id: 'three',
			title: 'dummy three',
			src: 'https://image.freepik.com/free-photo/young-schoolgirl-eyeglasses-holding-her-books-makes-confused-face_114579-14906.jpg',
			link: '/todo'
		}],
	dataDummy: [{
		id: 'one',
		title: 'Event One',
		src: 'https://image.freepik.com/free-vector/back-school-sales_23-2148621951.jpg',
		link: '/todo',
		date: '25 April 2021',
		time: '2PM - 5PM',
		description: 'Terra, Social enterprise, manufatrues and sells...'
	},
		{
			id: 'two',
			title: 'Event Two',
			src: 'https://image.freepik.com/free-psd/girl-doing-stretching-exercises_23-2148253770.jpg',
			link: '/todo',
			date: '3 Mei 2021',
			time: '1PM - 5PM',
			description: 'Terra, Social enterprise, manufatrues and sells...'
		},
		{
			id: 'three',
			title: 'Event Three',
			src: 'https://image.freepik.com/free-photo/smiling-teacher-with-drink-classroom_23-2148201042.jpg',
			link: '/todo',
			date: '25 Jun 2021',
			time: '1PM - 4PM',
			description: 'Terra, Social enterprise, manufatrues and sells...'
		}]
};

Home.propTypes = {
	banners: PropTypes.array,
	dataDummy: PropTypes.array,
};

export default Home;
