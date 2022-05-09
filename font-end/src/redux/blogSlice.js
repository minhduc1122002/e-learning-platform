import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { publicRequest, userRequest } from "../request";

const initialState = {
    blog: null,
    blogs: [],
    isError: [false, false, false, false, false, false, false],
    isSuccess: [false, false, false, false, false, false, false],
    isLoading: [false, false, false, false, false, false, false],
    message: ''
}

export const createBlog = createAsyncThunk("blog/create", async (req, ThunkAPI) => {
    try {
        const {navigate, ...blog} = req
        const response = await userRequest.post("/blogs/", blog)
        if (response.data) {
            navigate(`/blogs/${response.data._id}`)
        }
        return response.data
    } catch(error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) || error.message ||
            error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})

export const getBlog = createAsyncThunk("blogs/id", async (blogId, ThunkAPI) => {
    try {
        const response = await publicRequest.get(`/blogs/${blogId}`)
        return response.data
    } catch(error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) || error.message ||
            error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})


export const likeBlog = createAsyncThunk("blogs/like", async (req, ThunkAPI) => {
    try {
        const {blogId, userId} = req
        const response = await userRequest.put(`/blogs/like/${blogId}`, {userId})
        return response.data
    } catch(error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) || error.message ||
            error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})

export const commentBlog = createAsyncThunk("blogs/comment", async (req, ThunkAPI) => {
    try {
        const {blogId, ...comment} = req
        const response = await userRequest.put(`/blogs/comment/${blogId}`, comment)
        return response.data
    } catch(error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) || error.message ||
            error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})

export const updateBlog = createAsyncThunk("blogs/update", async (blog, ThunkAPI) => {
    try {
        const response = await userRequest.put(`/blogs/${blog._id}`, blog)
        return response.data
    } catch(error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) || error.message ||
            error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})

export const deleteBlog = createAsyncThunk("blogs/delete", async (blog, ThunkAPI) => {
    try {
        const response = await userRequest.delete(`/blogs/${blog._id}`)
        return response.data
    } catch(error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) || error.message ||
            error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})

export const getBlogList = createAsyncThunk("blogs/all", async (ThunkAPI) => {
    try {
        const response = await userRequest.get(`/blogs`)
        return response.data
    } catch(error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) || error.message ||
            error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = [false, false, false, false, false, false, false]
        state.isSuccess = [false, false, false, false, false, false, false]
        state.isError = [false, false, false, false, false, false, false]
        state.message = ''
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getBlog.pending, (state) => {
            state.isLoading[0] = true
        })
        .addCase(getBlog.fulfilled, (state, action) => {
            state.isLoading[0] = false
            state.isSuccess[0] = true
            state.blog = action.payload
        })
        .addCase(getBlog.rejected, (state, action) => {
            state.isLoading[0] = false
            state.isError[0] = true
            state.message = action.payload
            state.blog = null
        })
        .addCase(likeBlog.pending, (state) => {
            state.isLoading[1] = true
        })
        .addCase(likeBlog.fulfilled, (state, action) => {
            state.isLoading[1] = false
            state.isSuccess[1] = true
            state.blog = action.payload
        })
        .addCase(likeBlog.rejected, (state, action) => {
            state.isLoading[1] = false
            state.isError[1] = true
            state.message = action.payload
            state.blog = null
        })
        .addCase(commentBlog.pending, (state) => {
            state.isLoading[2] = true
        })
        .addCase(commentBlog.fulfilled, (state, action) => {
            state.isLoading[2] = false
            state.isSuccess[2] = true
            state.blog = action.payload
        })
        .addCase(commentBlog.rejected, (state, action) => {
            state.isLoading[2] = false
            state.isError[2] = true
            state.message[2] = action.payload
            state.blog = null
        })
        .addCase(createBlog.pending, (state) => {
            state.isLoading[3] = true
          })
        .addCase(createBlog.fulfilled, (state, action) => {
            state.isLoading[3] = false
            state.isSuccess[3] = true
            state.blogs.push(action.payload)
        })
        .addCase(createBlog.rejected, (state, action) => {
            state.isLoading[3] = false
            state.isError[3] = true
            state.message = action.payload
        })
        .addCase(updateBlog.pending, (state) => {
            state.isLoading[4] = true
          })
        .addCase(updateBlog.fulfilled, (state, action) => {
            state.isLoading[4] = false
            state.isSuccess[4] = true
            state.blog = action.payload
        })
        .addCase(updateBlog.rejected, (state, action) => {
            state.isLoading[4] = false
            state.isError[4] = true
            state.message = action.payload
        })
        .addCase(deleteBlog.pending, (state) => {
            state.isLoading[5] = true
          })
        .addCase(deleteBlog.fulfilled, (state, action) => {
            state.isLoading[5] = false
            state.isSuccess[5] = true
            state.blog = null
            state.message = action.payload
        })
        .addCase(deleteBlog.rejected, (state, action) => {
            state.isLoading[5] = false
            state.isError[5] = true
            state.message = action.payload
        })
        .addCase(getBlogList.pending, (state) => {
            state.isLoading[6] = true
          })
        .addCase(getBlogList.fulfilled, (state, action) => {
            state.isLoading[6] = false
            state.isSuccess[6] = true
            state.blogs = action.payload
        })
        .addCase(getBlogList.rejected, (state, action) => {
            state.isLoading[6] = false
            state.isError[6] = true
            state.message = action.payload
        })
    }
})

export const { reset } = blogSlice.actions
export default blogSlice.reducer