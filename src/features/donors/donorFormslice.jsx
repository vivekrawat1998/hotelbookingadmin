import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ourDonorServices from "./donorForServices";

export const createOurDonor = createAsyncThunk(
    "ourDonor/create",
    async (donordata, thunkAPI) => {
        try {
            await ourDonorServices.addMainDonor(donordata);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

export const getOurDonor = createAsyncThunk(
    "ourDonor/all",
    async (thunkAPI) => {
        try {
            return await ourDonorServices.allMainDonor();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const getSinOurDonor = createAsyncThunk("ourDonor/get-single", async (id, thunkAPI) => {
    try {
        await ourDonorServices.singleMainDonor(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const updateOurDonor = createAsyncThunk("ourDonor/update-ourDonor", async (teamData, thunkAPI) => {
    try {
        await ourDonorServices.putMainDonor(teamData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deleteOurDonor = createAsyncThunk("ourDonor/delete-ourDonor", async (id, thunkAPI) => {
    try {
        await ourDonorServices.deleteMainDonor(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    ourDonor: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const ourDonorSlice = createSlice({
    name: "ourDonor",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOurDonor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOurDonor.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.done.OurDonor = action.payload;
            })
            .addCase(createOurDonor.rejected, (state, action) => {
                state.isError = true;
                state.message = action.error;
            })
            .addCase(getOurDonor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOurDonor.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.ourDonor = action.payload;
            })
            .addCase(getOurDonor.rejected, (state, action) => {
                state.message = action.error;
                state.isError = true;
            })
            .addCase(getSinOurDonor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSinOurDonor.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.otImages = action.payload.images;
                state.otName = action.payload.name;
                state.otPosition = action.payload.position;
            })
            .addCase(getSinOurDonor.rejected, (state, action) => {
                state.isError = true;
                state.message = action.error;
            })
            .addCase(updateOurDonor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOurDonor.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.updatedOurDonor = action.payload;
            })
            .addCase(updateOurDonor.rejected, (state, action) => {
                state.isError = true;
                state.message = action.error;
            })
            .addCase(deleteOurDonor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteOurDonor.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.deletedOurDonor = action.payload;
            })
            .addCase(deleteOurDonor.rejected, (state, action) => {
                state.isError = true;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    }
})

export default ourDonorSlice.reducer;