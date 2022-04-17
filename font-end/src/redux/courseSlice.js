import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { publicRequest, userRequestText, userRequest } from "../request";

const initialState = {
  courses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  course: null,
}

//get all products
export const getCourseList = createAsyncThunk('courses/list', async (thunkAPI) => {
  try {
    const response = await publicRequest.get("/courses")
    return response.data
  } catch (error) {
    const message = error.response.data
    return thunkAPI.rejectWithValue(message)
  }
})

//get product by path
export const getCourse = createAsyncThunk('courses/path', async (coursePath, thunkAPI) => {
    try {
      const response = await publicRequest.get("/courses/findby/" + coursePath)
      return response.data
    } catch (error) {
      const message = error.response.data
      return thunkAPI.rejectWithValue(message)
    }
  })

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourseList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCourseList.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.courses = action.payload
      })
      .addCase(getCourseList.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.courses = null
      })
      .addCase(getCourse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.course = action.payload
      })
      .addCase(getCourse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.course = null
      })
  },
})

export const { reset } = courseSlice.actions
export default courseSlice.reducer