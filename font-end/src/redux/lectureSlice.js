import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { publicRequest, userRequest } from "../request";

const initialState = {
    lectures: [],
    isError: [false, false, false, false, false, false, false],
    isSuccess: [false, false, false, false, false, false, false],
    isLoading: [false, false, false, false, false, false, false],
    message: ''
  }

//get products by course path
export const getLectureofCourse = createAsyncThunk("lectures/path", async (coursePath, ThunkAPI) => {
    try {
        const response = await publicRequest.get('/lectures/findby/' + coursePath)
        return response.data
    } catch(error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) || error.message ||
            error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})

//get all product
export const getLectureList = createAsyncThunk("lectures/list", async (ThunkAPI) => {
    try {
        const response = await userRequest.get('/lectures/')
        return response.data
    } catch(error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) || error.message ||
            error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})

//add a lecture
export const addLecture = createAsyncThunk("lectures/add", async (lecture, ThunkAPI) => {
    try {
        const response = await userRequest.post("/lectures/", lecture)
        return response.data
    } catch(error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) || error.message ||
            error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})

//update a lecture
export const updateLecture = createAsyncThunk("lectures/update", async (lecture, ThunkAPI) => {
    try {
        const response = await userRequest.put(`/lectures/${lecture._id}`, lecture)
        return response.data
    } catch(error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) || error.message ||
            error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})

//delete a lecture
export const deleteLecture = createAsyncThunk("lectures/delete", async (lecture_id, ThunkAPI) => {
    try {
        const response = await userRequest.delete('/lectures/' + lecture_id)
        return lecture_id
    } catch(error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) || error.message ||
            error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})

//add a lesson for a lecture
export const addLessontoLecture = createAsyncThunk("lectures/addLesson", async (lesson, ThunkAPI) => {
    try {
        const {lectureId, ...others} = lesson
        const response = await userRequest.put('/lectures/lessons/' + lectureId, others)
        return response.data
    } catch(error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) || error.message ||
            error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})

//update a lesson of a lecture
export const updateLessontoLecture = createAsyncThunk("lectures/updateLesson", async (lesson, ThunkAPI) => {
    try {
        const response = await userRequest.put(`/lectures/lessons/update/${lesson._id}`, lesson)
        return response.data
    } catch(error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) || error.message ||
            error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})

//delete a lesson of a lecture
export const deleteLessontoLecture = createAsyncThunk("lectures/deleteLesson", async (lessonId, ThunkAPI) => {
    try {
        const response = await userRequest.put(`/lectures/lessons/delete/${lessonId}`)
        return response.data
    } catch(error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) || error.message ||
            error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})

export const lectureSlice= createSlice({
    name: 'lecture',
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
        .addCase(getLectureofCourse.pending, (state) => {
          state.isLoading[1] = true
        })
        .addCase(getLectureofCourse.fulfilled, (state, action) => {
            state.isLoading[1] = false
            state.isSuccess[1] = true
            state.lectures = action.payload
        })
        .addCase(getLectureofCourse.rejected, (state, action) => {
            state.isLoading[1] = false
            state.isError[1] = true
            state.message = action.payload
            state.lectures = null
        })

        .addCase(getLectureList.pending, (state) => {
            state.isLoading[1] = true
        })
        .addCase(getLectureList.fulfilled, (state, action) => {
            state.isLoading[1] = false
            state.isSuccess[1] = true
            state.lectures[1] = action.payload
        })
        .addCase(getLectureList.rejected, (state, action) => {
            state.isLoading[1] = false
            state.isError[1] = true
            state.message = action.payload
            state.lectures = []
        })

        .addCase(addLecture.pending, (state) => {
            state.isLoading[0] = true
        })
        .addCase(addLecture.fulfilled, (state, action) => {
            state.isError[0] = false
            state.isLoading[0] = false
            state.isSuccess[0] = true
            state.lectures.push(action.payload)
        })
        .addCase(addLecture.rejected, (state, action) => {
            state.isLoading[0] = false
            state.isError[0] = true
            state.message = action.payload
            state.isSuccess[0] = false
        })

        .addCase(updateLecture.pending, (state) => {
            state.isLoading[2] = true
        })
        .addCase(updateLecture.fulfilled, (state, action) => {
            state.isLoading[2] = false
            state.isSuccess[2] = true
            state.lectures[
                state.lectures.findIndex(index => index._id === action.payload._id)
              ] = action.payload
        })
        .addCase(updateLecture.rejected, (state, action) => {
            state.isLoading[2] = false
            state.isError[2] = true
            state.message = action.payload
            state.isSuccess[2] = false
          })
        
        .addCase(deleteLecture.pending, (state) => {
            state.isLoading[3] = true
        })
        .addCase(deleteLecture.fulfilled, (state, action) => {
            state.isLoading[3] = false
            state.isSuccess[3] = true
            state.lectures.splice(
                state.lectures.findIndex(lecture => lecture._id === action.payload), 1
            )
        })
        .addCase(deleteLecture.rejected, (state, action) => {
            state.isLoading[3] = false
            state.isError[3] = true
            state.message = action.payload
            state.isSuccess[3] = false
        })  

        .addCase(addLessontoLecture.pending, (state) => {
            state.isLoading[[4]] = true
        })
        .addCase(addLessontoLecture.fulfilled, (state, action) => {
            state.isLoading[4] = false
            state.isSuccess[4] = true
            state.lectures[
                state.lectures.findIndex(index => index._id === action.payload._id)
            ] = action.payload
        })
        .addCase(addLessontoLecture.rejected, (state, action) => {
            state.isLoading[4] = false
            state.isError[4] = true
            state.message = action.payload
            state.isSuccess[4] = false
        })
        
        .addCase(updateLessontoLecture.pending, (state) => {
            state.isLoading[5] = true
        })
        .addCase(updateLessontoLecture.fulfilled, (state, action) => {
            state.isLoading[5] = false
            state.isSuccess[5] = true
            state.lectures[
                state.lectures.findIndex(index => index._id === action.payload._id)
              ] = action.payload
        })
        .addCase(updateLessontoLecture.rejected, (state, action) => {
            state.isLoading[5] = false
            state.isError[5] = true
            state.message = action.payload
            state.isSuccess[5] = false
        })
        
        .addCase(deleteLessontoLecture.pending, (state) => {
            state.isLoading[6] = true
        })
        .addCase(deleteLessontoLecture.fulfilled, (state, action) => {
            state.isLoading[6] = false
            state.isSuccess[6] = true
            state.lectures[
                state.lectures.findIndex(index => index._id === action.payload._id)
              ] = action.payload
        })
        .addCase(deleteLessontoLecture.rejected, (state, action) => {
            state.isLoading[6] = false
            state.isError[6] = true
            state.message = action.payload
            state.isSuccess[6] = false
        })
    }
})

export const { reset } = lectureSlice.actions
export default lectureSlice.reducer