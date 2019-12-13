import React, { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route, Link, useHistory} from 'react-router-dom';
import { useStateValue, store, DELETE_EVENT } from "./state";
import { routes, CustomerView, ProjectView, CalendarView} from "./routes";
import { Navigation } from './components/navigation';

export const App = () => {
  const {
    state: { events, customers, projects },
    dispatch
  } = useStateValue();

  return (
    <Router>
    <Navigation />    
    
    <div className="content">
      <Switch>
        {routes.map((route: any, idx: number) => 
          route.exact ? <Route key={`route-${idx}`} path={route.path} component={route.component} exact />
          : <Route key={`route-${idx}`} path={route.path} component={route.component} />
          
        )}
        {/* <Route exact path="/" component={CalendarView} />
        <Route path="/customers" component={CustomerView} />
        <Route path="/projects" component={ProjectView} /> */}
        
      </Switch>
    </div>
    </Router>
  );
};
