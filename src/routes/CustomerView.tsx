import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useStateValue, DELETE_CUSTOMER, store } from "../state";
import { Customer } from "../model";
import { GarbageIcon } from "../components/icons";

const { dialog } = require("electron").remote;

export const CustomerView = () => {
  const {
    state: { customers, projects },
    dispatch
  } = useStateValue();

  const dialogOptions = {
    type: "info",
    buttons: ["Delete", "Cancel"],
    message: "Are you sure you want to delete this item?"
  };

  const deleteItem = (id: string) => {
    const dispatchObj = { type: DELETE_CUSTOMER, payload: id };

    dialog.showMessageBox(dialogOptions, null).then(res => {
      if (res.response === 0) dispatch(dispatchObj);
    });
  };

  useEffect(() => {
    store.set("customers", [...customers]);
  }, [customers]);

  const noiProjects = (id: string) => {
    return projects.filter(p => p.customerId === id).length;
  };

  return (
    <div>
      <h2>Customers</h2>
      <div className="flex space-between">
        <h4>Customer</h4>
        <h4>Projects</h4>
      </div>
      <ul className="items-list">
        {customers.map((customer: Customer) => (
          <li key={customer.id}>
            <span><Link to={`/customers/${customer.id}`}>{customer.name}</Link></span>
            <span className="line-tag">{noiProjects(customer.id)}</span>
            <button onClick={() => deleteItem(customer.id)}>
              <GarbageIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
