import IdeaCard from 'components/IdeaCard';
import { arrayOf, shape, string } from 'prop-types';
import { ideasWrapper } from './styles.module.scss';

const IdeaAndSolutionContainer = ({ items }) => {
  return (
    <>
      <div className={ideasWrapper}>
        {items.map((idea) => {
          const { id, title, src, link, description } = idea;
          return (
            <IdeaCard
              key={id}
              title={title}
              imageUrl={src}
              link={link}
              description={description}
            />
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
