// 'use client'

// import axios from 'axios'
// import { createHTTPHeader } from './util'
// import Router from 'next/navigation'
// import { paramsObjectToQueryString } from './paramObjectToQuery'
// import { toast } from 'sonner'
// import { BASE_URL } from '../utility/constants'
// import secureLocalStorage from 'react-secure-storage'
// import { message } from 'antd'

// axios.interceptors.response.use(undefined, err => {
//   if (err.response.status != 200 || err.response.status != 201) {
//     if (err.code === 'ERR_NETWORK') {
//       message.error('Network Error, please try again')
//     }
//     if (err.response.status == 401) {
//       toast.error('Please login to continue')
//     } else {
//       console.log(err)
//     }
//   }
//   if (err.response.status == 401) {
//     Router.push('/')
//   }

//   return Promise.reject(err)
// })

// //   export const fetchTotalUsers = async (token) => {
// //     const headers = {
// //       Authorization: `Bearer ${token}`,
// //     };

// //     const response = await axios.get(`${BASE_URL}/admin/total-users`, { headers });
// //     return response.data;
// //   };

// //   export const fetchTotalAdminUsers = async (token) => {
// //     const headers = {
// //       Authorization: `Bearer ${token}`,
// //     };

// //     const response = await axios.get(`${BASE_URL}/admin/total-admin-users`, { headers });
// //     return response.data;
// //   };

// const api = {
//   // fetchAllIncidents: (token, query) => {
//   //   const headers = createHTTPHeader(token)
//   //   const url = `${BASE_URL}/incident/incidents`

//   //   return api.get(url, headers)
//   // },

//   // fetchIncidents: (token, query) => {
//   //   const headers = createHTTPHeader(token)
//   //   const url = `${BASE_URL}/incident/incident-statuses/16`

//   //   return api.get(url, headers)
//   // },

//   post: (url, body, headers = createHTTPHeader()) => {
//     return axios.post(url, body, { headers }).then(response => response.data)
//   },

//   post2: (url, body, headers = createHTTPHeader()) => {
//     return axios.post(url, body, { headers }).then(response => response.data)
//   },

//   put: (url, body, headers = createHTTPHeader()) => {
//     return axios.put(url, body, { headers }).then(response => response.data)
//   },
//   patch: (url, body, headers = createHTTPHeader()) => {
//     return axios.patch(url, body, { headers }).then(response => response.data)
//   },

//   get: (url, headers = createHTTPHeader()) => {
//     return axios.get(url, { headers }).then(response => response.data)
//   },
//   delete: (url, body, headers = createHTTPHeader()) => {
//     return axios.delete(url, { data: body }, { headers }).then(response => response.data)
//   },
//   postForget: body => {
//     const url = `${BASE_URL}/forgot`

//     return axios.post(url, body).then(response => response.data)
//   },
//   postReset: body => {
//     const url = `${BASE_URL}/reset`

//     return axios.post(url, body).then(response => response.data)
//   },
//   invite: body => {
//     const url = `${BASE_URL}/team-setup`

//     return axios.post(url, body).then(response => response.data)
//   }
// }

// export default api
