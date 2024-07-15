import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_URL } from 'src/configs/constanst'
import authConfig from 'src/configs/auth'

// ** Axios Imports
import axios from 'axios'

// ** Fetch Users
export const fetchData = createAsyncThunk('appUsers/fetchData', async params => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  console.log(storedToken)

  const response = await axios.get(`${BASE_URL}/admin/users`, {
    params,
    headers: {
      Authorization: `Bearer ${storedToken}`,
      'Content-Type': 'application/json' // Fixed typo 'content-Type' to 'Content-Type'
    }
  })
  .catch(error => {
    if (error.code == "ERR_NETWORK"){
      window.location.reload()
    }
   
    console.error('An error occurred:', error.code)
  })

  const users = response.data.users
  const total = response.data.usercount
  const allData = response.data.users
  console.log({
    allData: allData,
    users: users,
    params: params,
    total: total
  })
  console.log('ooooooooooo', response.data)

  return {
    allData: allData,
    users: users,
    params: params,
    total: total
  }

})

// ** Add User
export const addUser = createAsyncThunk('appUsers/addUser', async (data, { getState, dispatch }) => {
  const response = await axios.post('/apps/users/add-user', {
    data
  })
  dispatch(fetchData(getState().user.params))

  return response.data
})

// ** Delete User
export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { getState, dispatch }) => {
  const response = await axios.delete('/apps/users/delete', {
    data: id
  })
  dispatch(fetchData(getState().user.params))

  return response.data
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.users
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appUsersSlice.reducer
