import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import ticketSlice from "./slice/ticketSlice";
import ticketPackSlice from "./slice/ticketPackSlice";

export const store = configureStore({
    reducer: {
        tickets: ticketSlice.reducer,
        ticketPack: ticketPackSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
