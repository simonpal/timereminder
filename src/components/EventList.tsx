import React from "react";
import { Event } from "../model";
import moment from "moment";

interface Props {
  events: Event[];
}

export const EventList = ({ events }: Props) => {
  const getDuration = (ev: Event) => {
    return moment.duration(moment(ev.end).diff(moment(ev.start))).asHours();
  };
  return (
    <ul className="event-list">
      {events.map(ev => (
        <li key={ev.id}>
          <span>{ev.title}</span>
          <span>{moment(ev.start).format("Do MMM YYYY, HH:mm")}</span>
          <span>{moment(ev.end).format("Do MMM YYYY, HH:mm")}</span>
          <span className="line-tag">{getDuration(ev)}</span>
        </li>
      ))}
    </ul>
  );
};
