import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import categoryService from "../../features/category/Categoryservices";

// Create
export const createCategory = createAsyncThunk("category/create", async (data, thunkAPI) => {
  try {
    return await categoryService.addCategory(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Get all
export const fetchCategories = createAsyncThunk("category/get-all", async (_, thunkAPI) => {
  try {
    return await categoryService.getAllCategories();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Get one
export const fetchSingleCategory = createAsyncThunk("category/get-one", async (id, thunkAPI) => {
  try {
    return await categoryService.getSingleCategory(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Update
export const editCategory = createAsyncThunk("category/update", async (data, thunkAPI) => {
  try {
    return await categoryService.updateCategory(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Delete
export const removeCategory = createAsyncThunk("category/delete", async (id, thunkAPI) => {
  try {
    return await categoryService.deleteCategory(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const resetCategoryState = createAction("category/reset");

const initialState = {
  categories: [],
  singleCategory: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get all
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get single
      .addCase(fetchSingleCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleCategory = action.payload;
      })
      .addCase(fetchSingleCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update
      .addCase(editCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedIndex = state.categories.findIndex(c => c.id === action.payload.id);
        if (updatedIndex !== -1) {
          state.categories[updatedIndex] = action.payload;
        }
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete
      .addCase(removeCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = state.categories.filter(cat => cat.id !== action.payload.id);
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Reset
      .addCase(resetCategoryState, () => initialState);
  },
});

export default categorySlice.reducer;
