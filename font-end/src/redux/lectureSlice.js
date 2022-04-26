import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { publicRequest, userRequestText, userRequest } from "../request";

const initialState = {
    lectures: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
  }

//get products by course path
export const getLectureofCourse = createAsyncThunk("lectures/path", async (coursePath,ThunkAPI) => {
    try {
        const response = await publicRequest.get('/lectures/findby/' + coursePath)
        return response.data
    }catch(err) {
        const message = err.response.data
        return ThunkAPI.rejectWithValue(message)
    }
})

//get all product
export const getLectureList = createAsyncThunk("lectures/list", async (ThunkAPI) => {
    try {
        const response = await publicRequest.get('/lectures/')
        return response.data
    }catch(err) {
        const message = err.response.data
        return ThunkAPI.rejectWithValue(message)
    }
})

//add a lecture
export const addLecture = createAsyncThunk("lectures/add", async (lecture,ThunkAPI) => {
    try {
        const response = await publicRequest.post("/lectures/", lecture)
        console.log(response.data)
        return response.data
    }catch(err) {
        const message = err.response.data
        return ThunkAPI.rejectWithValue(message)
    }
})

//update a lecture
export const updateLecture = createAsyncThunk("lectures/update", async (lecture,ThunkAPI) => {
    try {
        const response = await userRequest.put(`/lectures/${lecture._id}`, lecture)
        return response.data
    }catch(err) {
        const message = err.response.data
        return ThunkAPI.rejectWithValue(message)
    }
})

//delete a lecture
export const deleteLecture = createAsyncThunk("lectures/delete", async (lecture_id,ThunkAPI) => {
    try {
        const response = await userRequest.delete('/lectures/' + lecture_id)
        return lecture_id
    }catch(err) {
        const message = err.response.data
        return ThunkAPI.rejectWithValue(message)
    }
})

//add a lesson for a lecture
export const addLessontoLecture = createAsyncThunk("lectures/addLesson", async (lesson,ThunkAPI) => {
    try {
        const {lectureId, ...others} = lesson
        const response = await userRequest.put('/lectures/lessons' + lectureId, others)
        return response.data
    }catch(err) {
        const message = err.response.data
        return ThunkAPI.rejectWithValue(message)
    }
})

//update a lesson of a lecture
export const updateLessontoLecture = createAsyncThunk("lectures/updateLesson", async (lesson, ThunkAPI) => {
    try {
        const {lectureId, ...others} = lesson
        const response = await userRequest.put(`/lectures/lessons/update/${lectureId}/${others._id}`, others)
        return response.data
    }catch(err) {
        const message = err.response.data
        return ThunkAPI.rejectWithValue(message)
    }
})

//delete a lesson of a lecture
export const deleteLessontoLecture = createAsyncThunk("lectures/deleteLesson", async (lesson, ThunkAPI) => {
    try {
        const {lectureId, ...others} = lesson
        const response = await userRequest.put(`/lectures/lessons/delete/${lectureId}/${others._id}`)
        return response.data
    }catch(err) {
        const message = err.response.data
        return ThunkAPI.rejectWithValue(message)
    }
})

export const lectureSlice= createSlice({
    name: 'lecture',
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
        .addCase(getLectureofCourse.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getLectureofCourse.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.lectures = action.payload
        })
        .addCase(getLectureofCourse.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.lectures = null
        })

        .addCase(getLectureList.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getLectureList.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.lectures = action.payload
        })
        .addCase(getLectureList.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.lectures = null
        })

        .addCase(addLecture.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addLecture.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.lectures.push(action.payload)
        })
        .addCase(addLecture.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.isSuccess = false
        })

        .addCase(updateLecture.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateLecture.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.lectures[
                state.lectures.findIndex(index => index._id === action.payload._id)
              ] = action.payload
        })
        .addCase(updateLecture.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.isSuccess = false
          })
        
        .addCase(deleteLecture.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteLecture.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.lectures.splice(
                state.lectures.findIndex(lecture => lecture._id === action.payload), 
            )
        })
        .addCase(deleteLecture.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.isSuccess = false
        })  

        .addCase(addLessontoLecture.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addLessontoLecture.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.lectures[
                state.lectures.findIndex(index => index._id === action.payload.lectureId)
              ] = action.payload
        })
        .addCase(addLessontoLecture.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.isSuccess = false
        })
        
        .addCase(updateLessontoLecture.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateLessontoLecture.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.lectures[
                state.lectures.findIndex(index => index._id === action.payload.lectureId)
              ] = action.payload
        })
        .addCase(updateLessontoLecture.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.isSuccess = false
        })
        
        .addCase(deleteLessontoLecture.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteLessontoLecture.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.lectures[
                state.lectures.findIndex(index => index._id === action.payload.lectureId)
              ] = action.payload
        })
        .addCase(deleteLessontoLecture.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.isSuccess = false
        })
    }
})

export const { reset } = lectureSlice.actions
export default lectureSlice.reducer