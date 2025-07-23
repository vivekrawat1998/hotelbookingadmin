import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from "./Blogservice";

export const createBlogThunk = createAsyncThunk(
    "blog/create", 
    async(blogData, thunkAPI) => {
        try {
            await blogService.addBlog(blogData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
});

export const getBlogThunk = createAsyncThunk(
    "blog/get-all",
    async (thunkAPI) => {
      try {
        return await blogService.allBlog();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const getSingleBlogThunk = createAsyncThunk("blog/get-single", async(id, thunkAPI) => {
    try {
        await blogService.singleBlog(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const updateBlogThunk = createAsyncThunk("blog/update-blog", async(blogData, thunkAPI) => {
    try {
        await blogService.putBlog(blogData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deleteBlogThunk = createAsyncThunk("blog/delete-blog", async(id, thunkAPI) => {
    try {
        await blogService.deleteBlog(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    blogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const blogSlice = createSlice({
    name: "blogs",
    initialState: initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createBlogThunk.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(createBlogThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.doneBlog = action.payload;
        })
        .addCase(createBlogThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getBlogThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getBlogThunk.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.blogs = action.payload;
        })
        .addCase(getBlogThunk.rejected,(state, action) => {
            state.message = action.error;
            state.isError = true;
        })
        .addCase(getSingleBlogThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSingleBlogThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.blogImages = action.payload.images;
            state.blogHeading = action.payload.heading;
            state.blogContent = action.payload.content;
            state.blogDate = action.payload.date;
            state.blogAuthor = action.payload.author;
        })
        .addCase(getSingleBlogThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updateBlogThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateBlogThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.updatedBlog = action.payload;
        })
        .addCase(updateBlogThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(deleteBlogThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteBlogThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.deletedBlog = action.payload;
        })
        .addCase(deleteBlogThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    }
})

export default blogSlice.reducer;