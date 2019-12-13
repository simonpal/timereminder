import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Autocomplete from "react-autocomplete";
import { genUuid } from "../utils";
import { Event, Customer, Project } from "../model";
import {
  useStateValue,
  ADD_EVENT,
  store,
  ADD_PROJECT,
  ADD_CUSTOMER
} from "../state";
import {saveEvent} from '../actions';
import moment from "moment";
import { EVENT_COLORS } from '../constants';

// import "react-datepicker/src/stylesheets/react-datepicker.scss";

interface Props {
  start: Date;
  end: Date;
  editEvent?: Event
  closeModal: () => void;
  resetEditEvent?: () => void
}

export const AddEventForm = ({ start, end, closeModal, editEvent, resetEditEvent = () => {} }: Props) => {
  const startEvent: Event = {
    id: genUuid(),
    start: start,
    end: end,
    title: "",
    allDay: false,
    color: EVENT_COLORS[0],
    resources: [{ customer: "", project: "" }]
  };
  const initialEvent = editEvent ? editEvent : startEvent;
  const {
    state: { customers, projects, events },
    dispatch
  } = useStateValue();
  const [eventObject, setEventObject] = useState<Event>(initialEvent);
  const [error, setError] = useState<string | undefined>();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [allDay, setAllDay] = useState<boolean>(false);
  const [validForm, setValidForm] = useState<boolean>(false);

  const updateEventObject = (val: any, key: string) => {
    if (key === "customer" || key === "project") {
      let newResources = { ...eventObject.resources[0] };
      newResources[key] = val;
      setEventObject({ ...eventObject, resources: [newResources] });
    } else if(key === 'allDay' && val) {
      const start = new Date(eventObject.start);
      const newStart = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 8, 0, 0)
      const newEnd = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 16, 0, 0)
      setEventObject({...eventObject, start: newStart, end: newEnd, allDay: val})
    } else {
      setEventObject({ ...eventObject, [key]: val });
    }
  };

  const handleSave = () => {
    saveEvent(eventObject, customers, projects)
      .then((dispatches: any) => dispatches.forEach(d => dispatch(d)))
      .then(() => resetEditEvent())
      .then(() => closeModal())
      .catch(err => console.error(err));
  };

  const isColorActive = (event: Event, color: string): boolean => {
    return event.color === color;
  }

  const requiredNotEmpty = (): boolean => {
    const reqFields = ['title', 'customer', 'project', 'start', 'end'];
    let invalid = [];
    for (const req of reqFields) {
      if(req === 'start' || req === 'end') {
        if(isNaN(new Date(eventObject[req]).getTime())) invalid.push(req);
      } else if (req === 'customer' || req === 'project') {
        if(eventObject.resources[0][req] === '') invalid.push(req); 
      } else {
        if(eventObject[req] === '') invalid.push(req); 
      }
    }
    return invalid.length !== 0;
  }

  useEffect(() => {
    if(eventObject.resources[0].customer !== '') {
        const foundCustomer = customers.find(c => c.name === eventObject.resources[0].customer);
        if(foundCustomer) 
            setFilteredProjects([...projects.filter(p => p.customerId === foundCustomer.id)]);
    }
    setValidForm(requiredNotEmpty());
  }, [eventObject]);

  // useEffect(() => {
  //   eventObject.allDay = allDay;
  //   if(allDay) {
  //     const start = new Date(eventObject.start);
  //     const newStart = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 8, 0, 0)
  //     const newEnd = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 16, 0, 0)
  //     setEventObject({...eventObject, start: newStart, end: newEnd})
  //   }
  // }, [allDay])

  return (
    <div className="add-event-form">
      {error && <p className="error">{error}</p>}
      <div className="mb1">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={eventObject.title}
          onChange={e => updateEventObject(e.target.value, "title")}
        />
      </div>
          <div>
            <label>
              All day?
              <input type="checkbox" checked={eventObject.allDay} onChange={() => updateEventObject(!eventObject.allDay, 'allDay')} />
            </label>
          </div>
      <div className="row mb1">
        <div>
          <label>From</label>
          <DatePicker
            selected={new Date(eventObject.start)}
            onChange={date => updateEventObject(moment(date), "start")}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy HH:mm"
            disabled={eventObject.allDay}
          />
        </div>
        <div>
          <label>To</label>
          <DatePicker
            selected={new Date(eventObject.end)}
            onChange={date => updateEventObject(moment(date), "end")}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy HH:mm"
            disabled={eventObject.allDay}
          />
        </div>
      </div>
      <div className="row mb1">
        <div className="auto-complete">
          <label htmlFor="customer">Customer</label>
          <Autocomplete
            getItemValue={item => item.name}
            items={customers}
            shouldItemRender={(item, value) =>
              item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
            }
            renderItem={(item, highlighted) => (
              <div
                key={item.id}
                style={{ backgroundColor: highlighted ? "#eee" : "transparent" }}
              >
                {item.name}
              </div>
            )}
            value={eventObject.resources[0].customer}
            onChange={e => updateEventObject(e.target.value, "customer")}
            onSelect={val => updateEventObject(val, "customer")}
          />
        </div>
        <div className="auto-complete">
          <label htmlFor="project">Project</label>
          <Autocomplete
            getItemValue={item => item.name}
            items={filteredProjects}
            shouldItemRender={(item, value) =>
              item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
            }
            renderItem={(item, highlighted) => (
              <div
                key={item.id}
                style={{ backgroundColor: highlighted ? "#eee" : "transparent" }}
              >
                {item.name}
              </div>
            )}
            value={eventObject.resources[0].project}
            onChange={e => updateEventObject(e.target.value, "project")}
            onSelect={val => updateEventObject(val, "project")}
          />
        </div>
      </div>
      <div>
        <ul className="color-list">
          {EVENT_COLORS.map((color: string, idx:number) => (
            <li key={color}>
              <button className={isColorActive(eventObject, color) ? 'active' : null} style={{backgroundColor: color}} onClick={() => updateEventObject(color, 'color')}></button>
            </li>
          ))}
        </ul>
      </div>
      <div className="row buttons">
        <div>
          <button onClick={() => closeModal()} className="secondary">Cancel</button>
        </div>
        <div className="justify-content-right flex">
          <button onClick={() => handleSave()} disabled={validForm}>Save</button>
        </div>
      </div>
    </div>
  );
};
