
import React from 'react'
import DoctorInfosDash from './DoctorInfosDash'
import Search from '../../Admin/AdminDash/Search'

function DoctorDashboard() {
  return (
    <div>
      <Search/>
      <DoctorInfosDash/> 
    </div>
  )
}

export default DoctorDashboard