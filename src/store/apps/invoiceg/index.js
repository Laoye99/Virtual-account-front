import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_URL } from 'src/configs/constanst'
import authConfig from 'src/configs/auth'

// ** Axios Imports
import axios from 'axios'

// ** Fetch Invoices
export const fetchData = createAsyncThunk('appInvoice/fetchData', async params => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  console.log(storedToken)

  const response = await axios.get(`${BASE_URL}/autoloan/loan/guarantor?page=1`, {
  //const response = await axios.get(`${BASE_URL}/autoloan/loan-approval`, {
    params,
    headers: {
      Authorization: `Bearer ${storedToken}`,
      'Content-Type': 'application/json' // Fixed typo 'content-Type' to 'Content-Type'
    }
  })
  const invoices = response.data.data
  const total = response.data.total
  const allData = response.data.data
  console.log({
    allData: allData,
    invoices: invoices,
    params: params,
    total: total
  })
  console.log(response.data)

  return {
    allData: allData,
    invoices: invoices,
    params: params,
    total: total
  }
})

export const deleteInvoice = createAsyncThunk('appInvoice/deleteData', async (id, { getState, dispatch }) => {
  const response = await axios.delete('/apps/invoice/delete', {
    data: id
  })
  await dispatch(fetchData(getState().invoice.params))

  return response.data
})

export const appInvoiceSlice = createSlice({
  name: 'appInvoice',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.invoices
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.total = action.payload.total
    })
  }
})

export default appInvoiceSlice.reducer
