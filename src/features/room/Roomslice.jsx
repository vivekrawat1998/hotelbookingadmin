import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import roomService from "../../features/room/Roomservices";

export const createRoom = createAsyncThunk("room/create", async (data, thunkAPI) => {
  try {
    return await roomService.addRoom(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const fetchRooms = createAsyncThunk("room/get-all", async (_, thunkAPI) => {
  try {
    return await roomService.getAllRooms();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const fetchSingleRoom = createAsyncThunk("room/get-one", async (id, thunkAPI) => {
  try {
    return await roomService.getSingleRoom(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const editRoom = createAsyncThunk("room/update", async (data, thunkAPI) => {
  try {
    return await roomService.updateRoom(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const removeRoom = createAsyncThunk("room/delete", async (id, thunkAPI) => {
  try {
    return await roomService.deleteRoom(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const resetRoomState = createAction("room/reset");

const initialState = {
  rooms: [],
  singleRoom: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRoom.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.rooms.push(action.payload);
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.rooms = action.payload.rooms;
      })
      .addCase(fetchSingleRoom.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.singleRoom = action.payload;
      })
      .addCase(editRoom.fulfilled, (state, action) => {
        const idx = state.rooms.findIndex(r => r.id === action.payload.id);
        if (idx !== -1) state.rooms[idx] = action.payload;
        state.isSuccess = true;
      })
      .addCase(removeRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter(r => r.id !== action.payload.id);
        state.isSuccess = true;
      })
      .addCase(resetRoomState, () => initialState)
      .addMatcher(
        (action) => action.type.startsWith("room/") && action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("room/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      );
  },
});

export default roomSlice.reducer;
