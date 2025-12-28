import React from 'react'
import Search from '../AdminDash/Search'
import PatientCard from './PatientCard'

function PatientsDashboard() {
  return (
    <div>
      <Search/>
      <PatientCard/>
    </div>
  )
}

export default PatientsDashboard