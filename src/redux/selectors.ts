import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

// Tickets:
export const ticketSelectors = (state: RootState) => state.tickets;
export const ticketFilterSelectors = (state: RootState) => state.tickets.filter;

// Ticket pack:
export const ticketPackSelectors = (state: RootState) => state.ticketPack;
