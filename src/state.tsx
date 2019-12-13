import React, { createContext, useReducer, useContext } from "react";
import { Customer, Project, Event } from "./model";
import Store from 'electron-store';

// export const SET_CUSTOMERS = "SET_CUSTOMERS";
// export const SET_PROJECTS = "SET_PROJECTS";
export const SET_EVENTS = "SET_EVENTS";
export const ADD_EVENT = "ADD_EVENTS";
export const ADD_CUSTOMER = "ADD_CUSTOMER";
export const ADD_PROJECT = "ADD_PROJECT";
export const DELETE_EVENT = "DELETE_EVENT";
export const DELETE_PROJECT = "DELETE_PROJECT";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";

export const store = new Store();

const events: Event[] = store.get('events');
const customers: Customer[] = store.get('customers');
const projects: Project[] = store.get('projects');

export interface State {
  events: Event[];
  projects: Project[];
  customers: Customer[];
}

const initialState: State = {
  events: events || [],
  projects: projects || [],
  customers: customers || []
};

export interface Action {
  type: string;
  payload: any;
}

const updateOrAdd = (action: Action, state: State, type: string, identifier = 'id') => {
    const found:any = state[type].find(
        (item:any) => item[identifier] === action.payload[identifier]
    );
    if (!found) {
        return {
            ...state,
            [type]: [action.payload, ...state[type]]
        };
    }
    return Object.assign({}, state, {
        [type]: state[type].map(item => {
            return item[identifier] === action.payload[identifier] ? action.payload : item;
        })
    });
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ADD_EVENT:
      return updateOrAdd(action, state, 'events');
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: [...state.events.filter(ev => ev.id !== action.payload)]
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: [...state.projects.filter(p => p.id !== action.payload)]
      };
    case DELETE_CUSTOMER:
      return {
        ...state,
        customers: [...state.customers.filter(c => c.id !== action.payload)]
      };
    case ADD_CUSTOMER:
      return {
        ...state,
        customers: [...customers, action.payload]
      }
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...projects, action.payload]
    }
    default:
      return state;
  }
}

export type Dispatch = (action: Action) => void;

export const StateContext = createContext<{
  state: State;
  dispatch: Dispatch;
}>({
  state: initialState,
  dispatch: () => {}
});

export const StateProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  return (
    <StateContext.Provider value={value}>
      {props.children}
    </StateContext.Provider>
  );
};

// export const setCartAction = (payload: CartType) => {
//   return {
//     type: SET_CART,
//     payload
//   };
// };

export const useStateValue = () => useContext(StateContext);
