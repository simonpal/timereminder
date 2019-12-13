import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Modal } from "../components/modal";
import { Event } from "../model";
import { AddEventForm } from "../components/addEventForm";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useStateValue, store, DELETE_EVENT, ADD_EVENT } from "../state";
import { dialogOptions } from "../utils";
import { WeeklyModal } from "../components/WeeklyModal";
import { ECONNRESET } from "constants";
import { EVENT_COLORS } from "../constants";

//moment.tz.setDefault('Europe/Stockholm');
moment.locale("sv");
const localizer = momentLocalizer(moment); // or globalizeLocalizer
const DragAndDropCalendar = withDragAndDrop(Calendar);

const { dialog } = require("electron").remote;

export const CalendarView = () => {
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [weeklyModalVisible, setWeeklyModalVisible] = useState<boolean>(false);
  const [clickedEvent, setClickedEvent] = useState<Event | undefined>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [editEvent, setEditEvent] = useState<Event | undefined>();
  const {
    state: { events, customers, projects },
    dispatch
  } = useStateValue();

  const handleEventClick = (event: Event) => {
    setClickedEvent(event as Event);
    setInfoModalVisible(!infoModalVisible);
  };

  const handleSelect = ({ start, end }) => {
    setStartDate(start);
    setEndDate(end);
    setAddModalVisible(true);
  };

  const deleteEvent = () => {
    const dispatchObj = { type: DELETE_EVENT, payload: clickedEvent.id };

    dialog.showMessageBox(dialogOptions, null).then(res => {
      if (res.response === 0) dispatch(dispatchObj);
    });

    setInfoModalVisible(false);
  };

  const getDuration = () => {
    return moment
      .duration(moment(clickedEvent.end).diff(moment(clickedEvent.start)))
      .asHours();
  };
  const handleModalClose = () => {
    setEditEvent(undefined);
    setAddModalVisible(false);
  };

  const doEditEvent = () => {
    setEditEvent(clickedEvent);
    setInfoModalVisible(false);
    setAddModalVisible(true);
  };

  const resizeEvent = ({ event, start, end }) => {
    const newEv = { ...event, start: start, end: end };
    dispatch({
      type: ADD_EVENT,
      payload: newEv
    });
  };

  const eventStyleGetter = event => {
    const style = {
      backgroundColor: event && event.color ? event.color : EVENT_COLORS[0]
    };
    return {
      style: style
    };
  };

  useEffect(() => {
    store.set("events", [...events]);
    store.set("customers", [...customers]);
    store.set("projects", [...projects]);
  }, [events]);

  return (
    <>
      <div className="flex space-between">
        <h2>Calendar</h2>
        <button
          className="secondary"
          onClick={() => setWeeklyModalVisible(true)}
        >
          This week
        </button>
      </div>
      {weeklyModalVisible && (
        <WeeklyModal closeModal={() => setWeeklyModalVisible(false)} />
      )}
      <DragAndDropCalendar
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView={Views.WEEK}
        events={events}
        min={new Date(0, 0, 0, 6, 0, 0)}
        max={new Date(0, 0, 0, 19, 0, 0)}
        startAccessor={event => {
          return new Date(event.start);
        }}
        endAccessor={event => {
          return new Date(event.end);
        }}
        onSelectEvent={event => handleEventClick(event)}
        onSelectSlot={handleSelect}
        draggableAccessor={event => true}
        onEventResize={resizeEvent}
        onEventDrop={resizeEvent}
        eventPropGetter={event => eventStyleGetter(event)}
      />
      {infoModalVisible && (
        <Modal hideModal={() => setInfoModalVisible(false)}>
          {clickedEvent && (
            <>
              <div className="event-title">
                <h2>{clickedEvent.title}</h2>
                
              </div>
              <div className="event-info">
                <div>
                  <div className="flex space-between mb1">
                    <div className="half-col">
                      <label>Start: </label>
                      {moment(clickedEvent.start).format("Do MMM YYYY, HH:mm")}
                    </div>
                    <div className="half-col">
                      <label>End: </label>
                      {moment(clickedEvent.end).format("Do MMM YYYY, HH:mm")}
                    </div>
                  </div>
                  <div className="flex space-between mb1">
                    <div className="half-col">
                      <label>Customer: </label>
                      {clickedEvent.resources[0].customer}
                    </div>
                    <div className="half-col">
                      <label>Project: </label>
                      {clickedEvent.resources[0].project}
                    </div>
                  </div>
                </div>
                <div className="duration-tag">
                  <label>Duration:</label>
                  <span className="number">{getDuration()}</span>
                  <span className="ending">
                    {getDuration() < 2 ? "hour" : "hours"}
                  </span>
                </div>
              </div>
              <div className="buttons row space-between">
                <div>
                  <button
                    className="secondary"
                    onClick={() => setInfoModalVisible(false)}
                  >
                    Close
                  </button>
                </div>
                <div className="justify-content-right flex">
                  <button className="tertiary" onClick={() => deleteEvent()}>
                    Delete event
                  </button>
                  <button onClick={() => doEditEvent()}>Edit event</button>
                </div>
              </div>
            </>
          )}
        </Modal>
      )}
      {addModalVisible && (
        <Modal hideModal={() => setAddModalVisible(false)}>
          <h2>Add event</h2>
          <AddEventForm
            closeModal={() => handleModalClose()}
            start={startDate}
            end={endDate}
            editEvent={editEvent}
            resetEditEvent={() => setEditEvent(undefined)}
          />
        </Modal>
      )}
    </>
  );
};
