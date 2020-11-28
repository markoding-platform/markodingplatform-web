import React from 'react';
import { arrayOf, string, shape } from 'prop-types';

import SectionCardWrapper from 'components/SectionCardWrapper';
import IdeaCard from 'components/IdeaCard';

const GalleryIdeaWidget = ({ ideas }) => {
  return (
    <>
      <div className="pb-5">
        <SectionCardWrapper title="Galeri Ide Solusi" link="/idea">
          {ideas.map((idea) => (
            <IdeaCard
              key={idea.id}
              imageUrl={idea.src}
              title={`Ide Solusi ${idea.id}`}
              date={idea.date}
              time={idea.time}
              link={`/idea/${idea.id}`}
            />
          ))}
        </SectionCardWrapper>
      </div>
    </>
  );
};

GalleryIdeaWidget.propTypes = {
  ideas: arrayOf(
    shape({
      id: string,
      title: string,
      src: string,
      link: string,
      date: string,
      time: string,
      description: string,
    })
  ).isRequired,
};

export default GalleryIdeaWidget;
