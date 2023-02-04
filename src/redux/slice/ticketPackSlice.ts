import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { db } from "~/firebase/config";
import { IServicePack, IUpdate } from "~/interface";

interface IUpdateServicePack extends IServicePack {
    id: string;
}

const initialState = {
    loading: false as boolean,
    ticketPack: {} as IUpdateServicePack,
};

const ticketPackSlice = createSlice({
    name: "ticket-pack",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTicketPack.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTicketPack.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addTicketPack.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getTicketPackById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTicketPackById.fulfilled, (state, action) => {
                state.ticketPack = action.payload as IUpdateServicePack;
                state.loading = false;
            })
            .addCase(getTicketPackById.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateTicketPack.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTicketPack.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateTicketPack.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const addTicketPack = createAsyncThunk(
    "addTicketPack",
    async (payload: IServicePack) => {
        try {
            const res = await checkExistsCode(payload.packageCode);
            if (!res) {
                const docRef = await addDoc(collection(db, "service-pack"), {
                    ...payload,
                });
                return docRef.id;
            }
        } catch (e) {
            console.error("Error adding document: ", e);
            return undefined;
        }
    }
);

export const getTicketPackById = createAsyncThunk(
    "getTicketPackById",
    async (id: string) => {
        const docSnap = await getDoc(doc(db, "service-pack", id));

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data(),
            };
        }
    }
);

export const updateTicketPack = createAsyncThunk(
    "UpdateTicketPack",
    async ({ id, payload }: IUpdate) => {
        try {
            delete payload["id"];
            await updateDoc(doc(db, "service-pack", id), {
                ...payload,
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
);

const checkExistsCode = (code: string) => {
    return new Promise(async (resolve: (value: boolean) => void) => {
        const querySnapshot = await getDocs(collection(db, "service-pack"));
        querySnapshot.forEach((doc) => {
            if (doc.data().packageCode === code) resolve(true);
        });
        resolve(false);
    });
};

export default ticketPackSlice;
