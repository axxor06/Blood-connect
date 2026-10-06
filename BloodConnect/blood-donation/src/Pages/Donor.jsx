import React, { useEffect, useState } from 'react'
import { FaHeartbeat, FaUserEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
import EditProfile from '../Components/EditProfile'
import { allRequestsAPI, updateRequestAPI } from '../services/allAPI'

function Donor() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('loggedUser')))
  const [requests, setRequests] = useState([])
  const [showEdit, setShowEdit] = useState(false)

  useEffect(() => {
    getRequests()
  }, [user])

  const getRequests = async () => {
    try {
      const response = await allRequestsAPI()

      if (response.status == 200) {
        setRequests(
          response.data.filter((item) => item.bloodGroup === user.bloodGroup && item.status === 'pending')
        )
      }
    } catch (err) {
      console.log(err)
      toast.error('Server not reachable. Try again later')
    }
  }

  const handleRequest = async (request, status) => {
    try {
      const response = await updateRequestAPI(request.id, { ...request, donorId: user.id, status })

      if (response.status == 200) {
        toast.success(`Request ${status}`)
        getRequests()
      }
    } catch (err) {
      console.log(err)
      toast.error('Could not update the request')
    }
  }

  return (
    <div className="page-bg py-5">
      <div className="container">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold mb-1">Welcome, {user?.fullName}</h3>
            <p className="text-secondary mb-0">Blood Group: {user?.bloodGroup}</p>
          </div>

          <button className="btn btn-outline-red d-flex align-items-center gap-2" onClick={() => setShowEdit(true)}>
            <FaUserEdit /> Edit Profile
          </button>
        </div>

        <div className="text-center mb-5">
          <div className="icon-circle mb-3" style={{ width: '60px', height: '60px', fontSize: '28px' }}>
            <FaHeartbeat />
          </div>
          <h2 className="fw-bold">Blood <span className="text-red">Requests</span></h2>
          <p className="text-secondary">Requests matching your blood group</p>
        </div>

        {requests.length === 0 ? (
          <div className="bg-white rounded-4 shadow-sm p-5 text-center">
            <h5 className="fw-bold">No blood requests available</h5>
            <p className="text-secondary mb-0">There are no pending requests for your blood group.</p>
          </div>
        ) : (
          <div className="row">
            {requests.map((request) => (
              <div className="col-md-6 col-lg-4 mb-4" key={request.id}>
                <div className="card border-0 shadow-sm rounded-4 h-100" style={{ borderTop: '4px solid var(--red)' }}>
                  <div className="card-body p-4">

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold mb-0">Blood Required</h5>
                      <span className="badge rounded-pill icon-circle px-3 py-2">{request.bloodGroup}</span>
                    </div>

                    <p className="mb-2"><strong>Hospital:</strong> {request.hospital}</p>
                    <p className="mb-2"><strong>Location:</strong> {request.location}</p>
                    <p className="mb-2"><strong>Units:</strong> {request.unitsRequired}</p>
                    <p className="text-secondary">{request.message || 'No message'}</p>

                    <div className="d-flex gap-2 mt-4">
                      <button className="btn btn-red flex-grow-1" onClick={() => handleRequest(request, 'accepted')}>Accept</button>
                      <button className="btn btn-outline-red flex-grow-1" onClick={() => handleRequest(request, 'declined')}>Decline</button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <EditProfile show={showEdit} onHide={() => setShowEdit(false)} user={user} onProfileUpdated={setUser} />
    </div>
  )
}

export default Donor
