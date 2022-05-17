import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { publicRequest, userRequest } from "../request";

const initialState = {
  courses: [],
  isError: [false, false, false, false],
  isSuccess: [false, false, false, false],
  isLoading: [false, false, false, false],
  message: '',
  course: null,
}

//get all products
export const getCourseList = createAsyncThunk('courses/list', async (thunkAPI) => {
  try {
    const response = await publicRequest.get("/courses")
    return response.data
  } catch (error) {
    const message = (error.response &&
      (error.response.data ||
        error.response.data.message)) || error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//get product by path
export const getCourse = createAsyncThunk('courses/path', async (coursePath, thunkAPI) => {
    try {
      const response = await publicRequest.get("/courses/findby/" + coursePath)
      return response.data
    } catch (error) {
      const message = (error.response &&
        (error.response.data ||
          error.response.data.message)) || error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

//add courses
export const addCourse = createAsyncThunk('courses/add', async (course, thunkAPI) => {
  try {
    const response = await userRequest.post("/courses/", course)
    return response.data
  }catch (error) {
    const message =  (error.response &&
      (error.response.data ||
        error.response.data.message)) || error.message ||
      error.toString()
    console.log(message)
    return thunkAPI.rejectWithValue(message)
  }
})

//update courses by id
export const updateCoursebyId = createAsyncThunk('courses/update', async (course, thunkAPI) => {
  try {
    const response = await userRequest.put(`/courses/update/${course._id}`, course)
    console.log(response.data)
    return response.data
  }catch (error) {
    console.log(error.response)
    const message = (error.response &&
      (error.response.data ||
      error.response.data.message)) || error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//delete courses
export const deleteCourse = createAsyncThunk('courses/delete', async (course_id, thunkAPI) => {
  try {
    const response = await userRequest.delete("/courses/" + course_id)
    return course_id
  }catch (error) {
    const message = (error.response &&
      (error.response.data ||
        error.response.data.message)) || error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = [false, false, false, false]
      state.isSuccess = [false, false, false, false]
      state.isError = [false, false, false, false]
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourseList.pending, (state) => {
        state.isLoading[3] = true
      })
      .addCase(getCourseList.fulfilled, (state, action) => {
        state.isLoading[3] = false
        state.isSuccess[3] = true
        state.courses = action.payload
      })
      .addCase(getCourseList.rejected, (state, action) => {
        state.isLoading[3] = false
        state.isError[3] = true
        state.isSuccess[3] = false
        state.message = action.payload
        state.courses = []
      })
      .addCase(getCourse.pending, (state) => {
        state.isLoading[3] = true
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        state.isLoading[3] = false
        state.isSuccess[3] = true
        state.course = action.payload
      })
      .addCase(getCourse.rejected, (state, action) => {
        state.isLoading[3] = false
        state.isError[3] = true
        state.isSuccess[3] = false
        state.message = action.payload
        state.course = null
      })
      .addCase(addCourse.pending, (state) => {
        state.isLoading[0] = true
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.isLoading[0] = false
        state.isError[0] = false
        state.isSuccess[0] = true
        state.courses.push(action.payload)
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.isLoading[0] = false
        state.isError[0] = true
        state.isSuccess[0] = false
        state.message = action.payload
      })
      .addCase(updateCoursebyId.pending, (state) => {
        state.isLoading[1] = true
      })
      .addCase(updateCoursebyId.fulfilled, (state, action) => {
        state.isLoading[1] = false
        state.isError[1] = false
        state.isSuccess[1] = true
        state.courses[
          state.courses.findIndex(index => index._id === action.payload._id)
        ] = action.payload
      })
      .addCase(updateCoursebyId.rejected, (state, action) => {
        state.isLoading[1] = false
        state.isError[1] = true
        state.isSuccess[1] = false
        state.message = action.payload
      })
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading[2] = true
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.isLoading[2] = false
        state.isError[2] = false
        state.isSuccess[2] = true
        state.courses.splice(
          state.courses.findIndex(course => course._id === action.payload)
        )
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.isLoading[2] = false
        state.isError[2] = true
        state.isSuccess[2] = false
        state.message = action.payload
      })
      
  },
})

export const { reset } = courseSlice.actions
export default courseSlice.reducer