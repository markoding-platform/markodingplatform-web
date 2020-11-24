import IdeaCard from 'components/IdeaCard';
import { arrayOf, shape, string } from 'prop-types';
import FilterIdea from './Filter';
import SortIdea from './Sort';
import { ideasWrapper, ideaCardWrapper } from './style.module.scss';

const IdeaAndSolutionContainer = ({ items }) => {
  const dummies = [...items, ...items, ...items];
  return (
    <>
      <div className="d-flex justify-content-between">
        <h2>Galeri Ide Solusi</h2>
        <div className="d-flex">
          <SortIdea />
          <FilterIdea />
        </div>
      </div>
      <div className={ideasWrapper}>
        {dummies.map((idea) => {
          const { id, title, src, link, description } = idea;
          return (
            <div key={id} className={ideaCardWrapper}>
              <IdeaCard
                title={title}
                imageUrl={src}
                link={link}
                description={description}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

IdeaAndSolutionContainer.defaultProps = {
  items: [
    {
      id: 'one',
      title: 'Event One',
      src:
        'https://image.freepik.com/free-vector/back-school-sales_23-2148621951.jpg',
      link: '/idea/1',
      date: '25 April 2021',
      time: '2PM - 5PM',
      description: 'Terra, Social enterprise, manufatrues and sells...',
    },
    {
      id: 'two',
      title: 'Event Two',
      src:
        'https://image.freepik.com/free-psd/girl-doing-stretching-exercises_23-2148253770.jpg',
      link: '/idea/2',
      date: '3 Mei 2021',
      time: '1PM - 5PM',
      description: 'Terra, Social enterprise, manufatrues and sells...',
    },
    {
      id: 'three',
      title: 'Event Three',
      src:
        'https://image.freepik.com/free-photo/smiling-teacher-with-drink-classroom_23-2148201042.jpg',
      link: '/idea/3',
      date: '25 Jun 2021',
      time: '1PM - 4PM',
      description: 'Terra, Social enterprise, manufatrues and sells...',
    },
  ],
};
IdeaAndSolutionContainer.propTypes = {
  items: arrayOf(
    shape({
      id: string,
      title: string,
      src: string,
      link: string,
      date: string,
      time: string,
      description: string,
    })
  ),
};

export default IdeaAndSolutionContainer;
