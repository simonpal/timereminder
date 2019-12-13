export interface Event {
    id: string;
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    color?: string;
    resources?: Resource[];
}

export interface Resource {
    customer: string;
    project: string;
}

export interface Customer {
    id: string;
    name: string;
}

export interface Project {
    id: string;
    name: string;
    customerId: string;
}