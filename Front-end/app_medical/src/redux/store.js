import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/Auth/authSlice'
import registerReducer from "./slices/Auth/registerSlice";
import AllMedReducer from "./slices/Doctors/allDoctors";
import contactReducer from "./slices/Contact/allContact"
import PatientReducer from "./slices/Patients/patientsSlice";
import appointmentsReducer from './slices/Appointments/appointmentsSlice'
import myAppointmentsReducer from './slices/Appointments/myAppointmentsSlice'
import appointmentReducer from './slices/Appointments/appointmentSlice'
import messagesReducer from './slices/Chat/chatSlice'
import myDoctorSReducer from './slices/Doctors/myDoctorSlice'
import myPatientsReducer from "./slices/Doctors/myPatientsSlice";
import myAppointmentsDocReducer from "./slices/Doctors/myAppointmentsSlice";
import updateStatusDocReducer from './slices/Doctors/updateAppointmentStatus'
import doctorPatientsReducer from "./slices/Doctors/doctorPatients"
import updateDoctorReducer from './slices/Doctors/updateDoctorSlice'
import deleteDoctorSlice from './slices/Doctors/deleteDoctorSlice'
import createDoctorSlice from './slices/Doctors/addDoctors'
export const store=configureStore({
    reducer:{
        auth:authReducer,
        register: registerReducer,
        doctors:AllMedReducer,
        contacts:contactReducer,
        patients:PatientReducer,
        appointments:appointmentsReducer,
        myAppointments:myAppointmentsReducer,
        appointment:appointmentReducer,
        messages:messagesReducer, 
        myDoctor:myDoctorSReducer,
        myPatients: myPatientsReducer,
        myAppointmentsDoc: myAppointmentsDocReducer,
        updateStatusDoc:updateStatusDocReducer,
        doctorPatients:doctorPatientsReducer,
        updateDoctor: updateDoctorReducer,
        deleteDoctor:deleteDoctorSlice,
        createDoctor:createDoctorSlice,
    }
})

