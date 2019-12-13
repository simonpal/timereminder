import React from "react";
import { Modal } from "./modal";
import { EventTable } from "./EventTable";


interface Props {
  closeModal: () => void;
}

export const WeeklyModal = ({ closeModal }: Props) => {
  
  return (
    <Modal hideModal={closeModal}>
        <h2>Weekly</h2>
      <EventTable />
      <div className="buttons">
        <button className="secondary" onClick={closeModal}>Close</button>
      </div>
    </Modal>
  );
};
