import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { publicRequest, userRequestText, userRequest } from "../request";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  enrollSuccess: false,
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
      console.log(response)
      return response.data
    } catch (error) {
      const message = error.response.data
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Login
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    const response = await publicRequest.post("/auth/login", user)
    const { accessToken, ...userData } = response.data
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('accessToken', JSON.stringify(accessToken))
    return response.data
  } catch (error) {
    const message = error.response.data
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
    const message = error.response.data
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
    const message = error.response.data
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
    const message = error.response.data
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
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
      state.enrollSuccess = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
      .addCase(enroll.pending, (state) => {
        state.isLoading = true
      })
      .addCase(enroll.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.enrollSuccess = true
      })
      .addCase(update.pending, (state) => {
        state.isLoading = true
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(google.pending, (state) => {
        state.isLoading = true
      })
      .addCase(google.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(google.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer