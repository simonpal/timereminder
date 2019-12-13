import { Event, Project, Customer } from "./model";
import { useStateValue, ADD_CUSTOMER, ADD_PROJECT, ADD_EVENT } from "./state";
import { genUuid } from "./utils";

export const saveEvent = (
  eventObject: Event,
  customers: Customer[],
  projects: Project[]
) => {
  return new Promise((resolve, reject) => {
    const dispatches = [];
    try {
      let customer: Customer = customers.find(
        c => c.name === eventObject.resources[0].customer
      );
      let project: Project = projects.find(
        p => p.name === eventObject.resources[0].project
      );
      if (!customer) {
        customer = {
          id: genUuid(),
          name: eventObject.resources[0].customer
        };
        dispatches.push({ type: ADD_CUSTOMER, payload: customer });
      }
      if (!project) {
        project = {
          id: genUuid(),
          name: eventObject.resources[0].project,
          customerId: customer.id
        };
        dispatches.push({ type: ADD_PROJECT, payload: project });
      }
      dispatches.push({ type: ADD_EVENT, payload: eventObject });
      resolve(dispatches);
    } catch (err) {
      reject(err);
    }
  });
};


// export const deleteEvent = (id: string) => {

// }