import { configureStore } from '@reduxjs/toolkit'
import patientsReducer from '../redux/slices/Patients/patientsSlice'

export const createTestStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      patients: patientsReducer,
    },
    preloadedState,
  })
