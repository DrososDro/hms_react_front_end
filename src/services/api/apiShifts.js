import api from './api'

export {
  getShifts,
  getWorkDay,
  createShift,
  getWorkDayId,
  deleteShift,
  deleteWorkDay,
  createWorkDay,
  getShiftId,
  getWorkdayCalcApi,
}
async function getShifts() {
  try {
    const res = await api.get('/worktime/shift/')
    const data = await res.data
    return data
  } catch {
    throw new Error("Can't load Data")
  }
}

async function getWorkDay() {
  try {
    const res = await api.get('/worktime/workday/')
    const data = await res.data
    return data
  } catch {
    throw new Error("Can't load Data")
  }
}

async function createShift(payload) {
  const res = await api.post('/worktime/shift/', payload)
  const data = res.data
  return data
}

async function deleteShift(payload) {
  const res = await api.delete(`/worktime/shift/${payload}/`)
  const data = await res.data
  return data
}
async function deleteWorkDay(payload) {
  const res = await api.delete(`/worktime/workday/${payload}/`)
  const data = await res.data
  return data
}

async function createWorkDay(payload) {
  const res = await api.post('/worktime/workday/', payload)
  const data = await res.data
  return data
}
async function getWorkDayId(id) {
  const res = await api.get(`/worktime/workday/${id}/`)
  const data = await res.data
  return data
}

async function getShiftId(payload) {
  const res = await api.get(`/worktime/shift/${payload}/`)
  const data = await res.data
  return data
}
async function getWorkdayCalcApi(payload) {
  const res = await api.post('/worktime/workCalc/', payload)
  const data = await res.data
  return data
}
