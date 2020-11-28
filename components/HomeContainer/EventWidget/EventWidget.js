import React from 'react';
import { arrayOf, string, shape } from 'prop-types';

import SectionCardWrapper from 'components/SectionCardWrapper';
import EventCard from 'components/EventCard';

const EventWidget = ({ events }) => {
  return (
    <>
      <div className="pb-5">
        <SectionCardWrapper title="Event Terdekat" link="/event">
          {events.map((event) => (
            <EventCard
              key={event.id}
              imageUrl={event.src}
              title={`Event ${event.id}`}
              date={event.date}
              time={event.time}
              link={`/event/${event.id}`}
            />
          ))}
        </SectionCardWrapper>
      </div>
    </>
  );
};

EventWidget.propTypes = {
  events: arrayOf(
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

export default EventWidget;
