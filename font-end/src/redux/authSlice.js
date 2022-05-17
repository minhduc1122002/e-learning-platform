import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { publicRequest, userRequestText, userRequest } from "../request";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: [false, false, false, false, false],
  isSuccess: [false, false, false, false, false],
  isLoading: [false, false, false, false, false],
  message: ''
}

//Register
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      const response = await publicRequest.post("/auth/register", user)
      const { accessToken, ...userData } = response.data
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('accessToken', JSON.stringify(accessToken))
      return response.data
    } catch (error) {
      const message = (error.response &&
        (error.response.data ||
          error.response.data.message)) || error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Login
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    console.log(user)
    const response = await publicRequest.post("/auth/login", user)
    console.log(response)
    const { accessToken, ...userData } = response.data
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('accessToken', JSON.stringify(accessToken))
    return response.data
  } catch (error) {
    const message = (error.response &&
      (error.response.data ||
        error.response.data.message)) || error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const google = createAsyncThunk('auth/google', async (tokenId, thunkAPI) => {
  try {
    const response = await publicRequest.post("/auth/google", tokenId)
    const { accessToken, ...userData } = response.data
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('accessToken', JSON.stringify(accessToken))
    return response.data
  } catch (error) {
    const message = (error.response &&
      (error.response.data ||
        error.response.data.message)) || error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Enroll
export const enroll = createAsyncThunk('user/enroll', async (enroll, thunkAPI) => {
  try {
    const response = await userRequestText.put(`/users/enroll/${enroll.userId}`, enroll.coursePath)
    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
  } catch (error) {
    const message = (error.response &&
      (error.response.data ||
        error.response.data.message)) || error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Update
export const update = createAsyncThunk('user/update', async (user, thunkAPI) => {
  try {
    const response = await userRequest.put(`/users/${user._id}`, user)
    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
  } catch (error) {
    const message = (error.response &&
      (error.response.data ||
        error.response.data.message)) || error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
   localStorage.removeItem('user')
   localStorage.removeItem('accessToken')
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = [false, false, false, false, false]
      state.isSuccess = [false, false, false, false, false]
      state.isError = [false, false, false, false, false]
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading[0] = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading[0] = false
        state.isSuccess[0] = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading[0] = false
        state.isError[0] = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading[1] = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading[1] = false
        state.isSuccess[1] = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading[1] = false
        state.isError[1] = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
      .addCase(enroll.pending, (state) => {
        state.isLoading[2] = true
      })
      .addCase(enroll.fulfilled, (state, action) => {
        state.isLoading[2] = false
        state.isSuccess[2] = true
        state.user = action.payload
      })
      .addCase(update.pending, (state) => {
        state.isLoading[3] = true
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading[3] = false
        state.isSuccess[3] = true
        state.user = action.payload
      })
      .addCase(google.pending, (state) => {
        state.isLoading[4] = true
      })
      .addCase(google.fulfilled, (state, action) => {
        state.isLoading[4] = false
        state.isSuccess[4] = true
        state.user = action.payload
      })
      .addCase(google.rejected, (state, action) => {
        state.isLoading[4] = false
        state.isError[4] = true
        state.message = action.payload
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer