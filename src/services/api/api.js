import axios from 'axios'
import {
  getItemLocalStorage,
  setItemLocalStorage,
} from '../../helpers/localStorage'
const BASE_URL = 'http://127.0.0.1:8000'
export { BASE_URL }

let api = axios.create({
  baseURL: BASE_URL,
})

api.interceptors.request.use(
  function (config) {
    const token = getItemLocalStorage('actb')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      !originalRequest.retry &&
      error.response.data.detail !== 'Token is invalid or expired'
    ) {
      const token = await getRefreshToken()
      if (token) {
        originalRequest.retry = true
        originalRequest.headers.Authorization = 'Bearer ' + token
        return api(originalRequest)
      }
    }
    return Promise.reject(error)
  },
)

async function getRefreshToken() {
  const res = await api.post('/accounts/token/refresh/', {
    refresh: getItemLocalStorage('rftb'),
  })
  const data = await res.data
  setItemLocalStorage('actb', data.access)
  return data.access
}
export default api
