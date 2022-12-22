import React from "react";
import configs from "~/configs";

import Home from "~/pages/Home";
const Tickets = React.lazy(() => import("~/pages/Tickets"));
const TicketCheck = React.lazy(() => import("~/pages/TicketCheck"));
const ServicePack = React.lazy(() => import("~/pages/ServicePack"));

interface IRoutes {
    path: string;
    component:
        | React.LazyExoticComponent<() => JSX.Element>
        | (() => JSX.Element);
    layout?: JSX.Element;
}

export const routes: IRoutes[] = [
    {
        path: configs.routes.home,
        component: Home,
    },
    {
        path: configs.routes.tickets,
        component: Tickets,
    },
    {
        path: configs.routes.ticketCheck,
        component: TicketCheck,
    },
    {
        path: configs.routes.servicePack,
        component: ServicePack,
    },
];
