import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
//import { dialog } from 'electron';
import { useStateValue, DELETE_PROJECT, store } from "../state";
import { Project } from "../model";
import { GarbageIcon } from "../components/icons";

const { dialog } = require("electron").remote;

export const ProjectView = () => {
  const {
    state: { projects, customers },
    dispatch
  } = useStateValue();

  const sortedProjects = () => {
    let sorted = [];
    try {
      sorted = projects
      .map(proj => {
        const cName = customers.find(c => c.id === proj.customerId);
        //const newObj = { ...proj, customerName: cName.name || null };
        if(cName && cName.name) return {...proj, customerName: cName.name};
        //return newObj;
      })
      .filter(p => p)
      .sort((a, b) => (a.customerName > b.customerName ? -1 : 1));
    } catch(e) {
      console.error(e);
    }
    return sorted;
  };

  const dialogOptions = {
    type: "info",
    buttons: ["Delete", "Cancel"],
    message: "Are you sure you want to delete this item?"
  };

  const deleteItem = (id: string) => {
    const dispatchObj = { type: DELETE_PROJECT, payload: id };
    
    dialog.showMessageBox(dialogOptions, null).then((res) => {
      if(res.response === 0) dispatch(dispatchObj);
    });
  };

  useEffect(() => {
    store.set("projects", [...projects]);
  }, [projects]);
  return (
    <div>
      <h2>Projects</h2>
      <div className="flex space-between">
        <h4>Project</h4>
        <h4>Customer</h4>
      </div>
      <ul className="items-list">
        {sortedProjects().map((project: any) => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`}>{project.name}</Link>
            <span>{project.customerName}</span>
            <button onClick={() => deleteItem(project.id)}>
              <GarbageIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
