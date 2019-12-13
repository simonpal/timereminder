import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '../components/icons';
import { useStateValue } from '../state';
import moment from 'moment';
import { Event } from '../model';
import { EventList } from '../components/EventList';

export const SingleProject = () => {
  const history = useHistory();
  const params = useParams();
  const { state: {customers, projects, events}} = useStateValue();
  const currentProject = projects.find(c => c.id === params.id);

  const getProjectEvents = () => {
    return events.filter(ev => ev.resources[0].project === currentProject.name)
    //.sort((a, b) => new Date(a.start) - new Date(b.start));
  }

  
  return (
    <div>
        <div className="flex single-title">
          <button className="tertiary" onClick={() => history.goBack()}>
            <ArrowLeftIcon />
          </button>
          {currentProject && <h2>{currentProject.name}</h2>}
      </div>
      <h3>Events</h3>
        { currentProject &&
          <EventList events={getProjectEvents()} />
        }
    </div>
  )
}