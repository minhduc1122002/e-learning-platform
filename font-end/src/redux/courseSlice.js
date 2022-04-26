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

//add courses
export const addCourse = createAsyncThunk('courses/add', async (course, thunkAPI) => {
  try {
    const response = await userRequest.post("/courses/", course)
    return response.data
  }catch (error) {
    const message = error.response.data
    return thunkAPI.rejectWithValue(message)
  }
})

//update courses by path
// export const updateCoursebyPath = createAsyncThunk('/courses/updatePath', async (course, thunkAPI) => {
//   try {
//     const response = await publicRequest.put(`/courses/update/${course.path}`, course)
//     return response.data
//   }catch (error) {
//     const message = error.response.data
//     return thunkAPI.rejectWithValue(message)
//   }
// })

//update courses by id
export const updateCoursebyId = createAsyncThunk('courses/update', async (course, thunkAPI) => {
  try {
    console.log(course)
    const response = await userRequest.put(`/courses/update/${course._id}`, course)
    
    console.log(response.data)
   
    return response.data
  }catch (error) {
    const message = error.response.data
    return thunkAPI.rejectWithValue(message)
  }
})

//delete courses
export const deleteCourse = createAsyncThunk('courses/delete', async (course_id, thunkAPI) => {
  try {
    const response = await userRequest.delete("/courses/delete/" + course_id)
    return course_id
  }catch (error) {
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
      .addCase(addCourse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.courses.push(action.payload)
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
      })
      .addCase(updateCoursebyId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCoursebyId.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.courses[
          state.courses.findIndex(index => index._id === action.payload._id)
        ] = action.payload
      })
      .addCase(updateCoursebyId.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
      })
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.courses.splice(
          state.courses.findIndex(course => course._id === action.payload)
        )
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
      })
      
  },
})

export const { reset } = courseSlice.actions
export default courseSlice.reducer