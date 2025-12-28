import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/Auth/authSlice'
import registerReducer from "./slices/Auth/registerSlice";
import AllMedReducer from "./slices/Doctors/allDoctors";
import contactReducer from "./slices/Contact/allContact"
import PatientReducer from "./slices/Patients/patientsSlice";
import DoctorConnectedReducer from './slices/Doctors/DoctorSpe'
import appointmentsReducer from './slices/Appointments/appointmentsSlice'
export const store=configureStore({
    reducer:{
        auth:authReducer,
        register: registerReducer,
        doctors:AllMedReducer,
        contacts:contactReducer,
        patients:PatientReducer,
        doctor:DoctorConnectedReducer,
        appointments:appointmentsReducer,
    }
})

