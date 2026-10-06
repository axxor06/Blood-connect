import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify'
import { saveReceiverAPI, saveRequestAPI } from '../services/allAPI'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 640,
  maxWidth: '95vw',
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
}

const emptyForm = { location: '', hospital: '', address: '', unitsRequired: '', message: '' }

function RequestModal({ show, onHide, user, onRequestCreated }) {
  const [requestData, setRequestData] = useState(emptyForm)

  const handleChange = (e) => {
    setRequestData({ ...requestData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { location, hospital, address, unitsRequired, message } = requestData

    if (!location || !address || !hospital || !unitsRequired) {
      toast.error('Please fill all the required details')
      return
    }

    try {
      const receiverResponse = await saveReceiverAPI({
        userId: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        bloodGroup: user.bloodGroup,
        age: user.age,
        gender: user.gender,
        location,
        address,
        hospital
      })

      if (receiverResponse.status === 201) {
        const requestResponse = await saveRequestAPI({
          receiverId: user.id,
          bloodGroup: user.bloodGroup,
          unitsRequired,
          hospital,
          location,
          message,
          status: 'pending'
        })

        if (requestResponse.status === 201) {
          toast.success('Blood request sent successfully')
          setRequestData(emptyForm)
          onHide()
          onRequestCreated()
        }
      }
    } catch (err) {
      console.log(err)
      toast.error('Could not send the request')
    }
  }

  return (
    <Modal open={show} onClose={onHide} aria-labelledby="request-modal-title">
      <Box sx={style}>

        <Typography id="request-modal-title" variant="h5" component="h2" className="fw-bold mb-3">
          Request Blood
        </Typography>

        <div className="rounded-3 p-3 mb-4" style={{ backgroundColor: 'var(--bg)' }}>
          <h6 className="fw-bold mb-3">Your Details</h6>
          <div className="row g-3">
            <div className="col-md-6"><small className="text-secondary">Name</small><div className="fw-semibold">{user?.fullName}</div></div>
            <div className="col-md-6"><small className="text-secondary">Blood Group</small><div className="fw-bold text-red">{user?.bloodGroup}</div></div>
            <div className="col-md-6"><small className="text-secondary">Age</small><div className="fw-semibold">{user?.age}</div></div>
            <div className="col-md-6"><small className="text-secondary">Gender</small><div className="fw-semibold">{user?.gender}</div></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <h6 className="fw-bold mb-3">Request Details</h6>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Location</label>
              <input type="text" name="location" placeholder="Eg: Palakkad" className="form-control" value={requestData.location} onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Hospital</label>
              <input type="text" name="hospital" placeholder="Enter hospital name" className="form-control" value={requestData.hospital} onChange={handleChange} />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <input type="text" name="address" placeholder="Enter your address" className="form-control" value={requestData.address} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Units Required</label>
            <input type="number" min="1" name="unitsRequired" placeholder="Enter units" className="form-control" value={requestData.unitsRequired} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea rows={3} name="message" placeholder="Enter a message for donors" className="form-control" value={requestData.message} onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-red w-100 py-2">Send Blood Request</button>
        </form>

      </Box>
    </Modal>
  )
}

export default RequestModal
