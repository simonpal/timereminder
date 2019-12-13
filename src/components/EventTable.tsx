import React from "react";
import { Event } from "../model";
import moment from "moment";
import { useStateValue } from "../state";

export const EventTable = () => {
  const {
    state: { events }
  } = useStateValue();

  const from_date = moment().startOf('week');
  const to_date = moment().endOf("week");
  const weeklyEvents = events.filter(
    ev =>
      new Date(ev.start) > new Date(from_date.toString()) &&
      new Date(ev.start) < new Date(to_date.toString())
  );
 
  const getCustomers = () => {
    const customers = weeklyEvents.map(ev => ev.resources[0].customer);
    return [...new Set(customers)];
  };
  const getDuration = (ev: Event) => {
    return moment.duration(moment(ev.end).diff(moment(ev.start))).asHours();
  };
  return (
    <>
      {getCustomers().map(customer => (
        <React.Fragment key={customer}>
          <div className="flex space-between">
            <h3>{customer}</h3>
            <h3>
                Total:&nbsp;
                {weeklyEvents
                    .filter(ev => ev.resources[0].customer === customer)
                    .reduce((sum, curr) => sum + getDuration(curr), 0)
                }
            </h3>
            {/* <span className="line-tag">
              {weeklyEvents
                .filter(ev => ev.resources[0].customer === customer)
                .reduce((sum, curr) => sum + getDuration(curr), 0)}
            </span> */}
          </div>
          <table className="event-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Start</th>
                <th>End</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {weeklyEvents
                .filter(ev => ev.resources[0].customer === customer)
                .map((ev: Event, idx: number) => (
                  <tr key={`${ev.id}-${idx}`}>
                    <td>{ev.resources[0].project}</td>
                    <td>{moment(ev.start).format("Do MMM YYYY, HH:mm")}</td>
                    <td>{moment(ev.end).format("Do MMM YYYY, HH:mm")}</td>
                    <td>
                      <span className="line-tag">{getDuration(ev)}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </React.Fragment>
      ))}
    </>
  );
};
