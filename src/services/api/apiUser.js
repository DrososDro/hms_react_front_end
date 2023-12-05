import { setItemLocalStorage } from '../../helpers/localStorage'
import api from './api'

export { getToken, getUser, createUser, activate }
async function getToken(payload) {
  const res = await api.post('/accounts/token/', payload)
  const data = await res.data
  if (data) {
    setItemLocalStorage('actb', data.access)
    setItemLocalStorage('rftb', data.refresh)
  }
  return data
}

async function getUser() {
  const res = await api.get('/accounts/my-account/')
  const data = await res.data
  return data
}

async function createUser(payload) {
  const res = await api.post('/accounts/create-user/', payload)
  const data = await res.data
  return data
}

async function activate(uidb, token) {
  const res = await api.post(`/accounts/activate/${uidb}/${token}/`)
  const data = await res.data
  return data
}
