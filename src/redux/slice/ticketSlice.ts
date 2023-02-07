import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface IFilter {
    from: string;
    to: string;
    status: string;
    gate: string[];
}

const initialState = {
    filter: {
        from: "",
        to: "",
        status: "Tất cả",
        gate: ["Tất cả"],
    },
};

const ticketSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<IFilter>) => {
            state.filter = action.payload;
        },
    },
    extraReducers: (builder) => {},
});

const fetchAllTicket = createAsyncThunk("fetchAllTicket", async () => {});

export default ticketSlice;
