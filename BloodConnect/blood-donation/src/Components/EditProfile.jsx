import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify'
import { updateUserAPI } from '../services/allAPI'
import bloodGroups from '../assets/bloodGroups.json'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 520,
  maxWidth: '95vw',
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
}

function EditProfile({ show, onHide, user, onProfileUpdated }) {
  const [userData, setUserData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    age: user?.age || '',
    gender: user?.gender || '',
    bloodGroup: user?.bloodGroup || ''
  })

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (Object.values(userData).some((value) => !value)) {
      toast.error('Please fill all fields')
      return
    }

    try {
      const response = await updateUserAPI(user.id, { ...user, ...userData })

      if (response.status === 200) {
        localStorage.setItem('loggedUser', JSON.stringify(response.data))
        toast.success('Profile updated successfully')
        onProfileUpdated(response.data)
        onHide()
      }
    } catch (err) {
      console.log(err)
      toast.error('Could not update profile')
    }
  }

  return (
    <Modal open={show} onClose={onHide} aria-labelledby="edit-profile-title">
      <Box sx={style}>

        <Typography id="edit-profile-title" variant="h5" component="h2" className="fw-bold mb-4">
          Edit Profile
        </Typography>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" name="fullName" className="form-control" value={userData.fullName} onChange={handleChange} />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-control" value={userData.email} onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Phone</label>
              <input type="tel" name="phone" className="form-control" value={userData.phone} onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Age</label>
              <input type="number" min="1" name="age" className="form-control" value={userData.age} onChange={handleChange} />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Blood Group</label>
              <select name="bloodGroup" className="form-select" value={userData.bloodGroup} onChange={handleChange}>
                <option value="">Select</option>
                {bloodGroups.map((group) => <option key={group} value={group}>{group}</option>)}
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Gender</label>
              <select name="gender" className="form-select" value={userData.gender} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-red w-100 py-2">Save Changes</button>
        </form>

      </Box>
    </Modal>
  )
}

export default EditProfile
