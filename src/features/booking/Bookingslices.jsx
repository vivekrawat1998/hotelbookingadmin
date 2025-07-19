import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BookingSrvices from "./Bookingservices";


export const getallBookings = createAsyncThunk(
    "bookings/get-all",
    async (_, thunkAPI) => {
        try {
            return await BookingSrvices.getallBookings();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const resetState = createAction("Reset_all");

const initialState = {
    blogs: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const bookingSlice = createSlice({
    name: "bookings",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getallBookings.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.bookings = action.payload;
            })
            .addCase(getallBookings.rejected, (state, action) => {
                state.message = action.error;
                state.isError = true;
            })
            .addCase(resetState, () => initialState);
    }
})

export default bookingSlice.reducer;