import { CalendarView } from './CalendarView';
import { CustomerView } from './CustomerView';
import { ProjectView } from './ProjectView';
import { SingleEvent } from './SingleEvent';
import { SingleCustomer } from './SingleCustomer';
import { SingleProject } from './SingleProject';


export const routes = [
    {
        path: '/',
        component: CalendarView,
        title: 'Calendar',
        exact: true
    },
    {
        path: '/customers',
        component: CustomerView,
        title: 'Customers',
        exact: true
    },
    {
        path: '/projects',
        component: ProjectView,
        title: 'Projects',
        exact: true
    },
    {
        path: '/events/:id',
        component: SingleEvent,
        exact: false
    },
    {
        path: '/customers/:id',
        component: SingleCustomer,
        exact: false
    }, 
    {
        path: '/projects/:id',
        component: SingleProject,
        exact: false
    }
]

export {
    CalendarView,
    CustomerView,
    ProjectView
}