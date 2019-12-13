import React from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '../components/icons';
import { useStateValue } from '../state';

export const SingleCustomer = () => {
  const history = useHistory();
  const params = useParams();
  const { state: {customers, projects, events}} = useStateValue();
  const currentCustomer = customers.find(c => c.id === params.id);
  const filteredProjects = projects.filter(p => p.customerId === currentCustomer.id);
  return (
    <div>
      <div className="flex single-title">
        <button className="tertiary" onClick={() => history.goBack()}>
          <ArrowLeftIcon />
        </button>
        <h2>{currentCustomer.name}</h2>
      </div>
      <h3>Projects</h3>
        <ul className="event-list">
          {filteredProjects.map(proj => (
            <li key={proj.id}>
              <Link to={`/projects/${proj.id}`}>{proj.name}</Link>
            </li>
          ))}
        </ul>
    </div>
  )
}