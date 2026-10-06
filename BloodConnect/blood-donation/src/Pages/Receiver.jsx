import React, { useEffect, useState } from 'react'
import { FaHeartbeat, FaPlus, FaTint, FaUserEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
import RequestModal from '../Components/RequestModal'
import RequestHistory from '../Components/RequestHistory'
import EditProfile from '../Components/EditProfile'
import { allRequestsAPI } from '../services/allAPI'

function Receiver() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('loggedUser')))
  const [showModal, setShowModal] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [requests, setRequests] = useState([])

  useEffect(() => {
    getRequests()
  }, [user])

  const getRequests = async () => {
    try {
      const response = await allRequestsAPI()

      if (response.status == 200) {
        setRequests(response.data.filter((item) => item.receiverId === user.id))
      }
    } catch (err) {
      console.log(err)
      toast.error('Server not reachable. Try again later')
    }
  }

  return (
    <div className="page-bg py-5">
      <div className="container">

        <div className="panel p-4 p-md-5 mb-4 shadow-sm">
          <div className="row align-items-center">

            <div className="col-lg-8">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="icon-circle" style={{ width: '55px', height: '55px', fontSize: '25px' }}>
                    <FaHeartbeat />
                  </div>
                  <div>
                    <p className="text-secondary mb-1">Welcome back</p>
                    <h2 className="fw-bold mb-0">{user?.fullName}</h2>
                  </div>
                </div>

                <button className="btn btn-outline-red d-flex align-items-center gap-2" onClick={() => setShowEdit(true)}>
                  <FaUserEdit /> Edit Profile
                </button>
              </div>

              <h4 className="fw-bold mt-4">Find the blood you need.</h4>
              <p className="text-secondary mb-4">
                Send a blood request and connect with available donors who can help you.
              </p>

              <button className="btn btn-red px-4 py-2 d-inline-flex align-items-center gap-2" onClick={() => setShowModal(true)}>
                <FaPlus size={14} /> Request Blood
              </button>
            </div>

            <div className="col-lg-4 text-center mt-4 mt-lg-0">
              <div className="icon-circle" style={{ width: '150px', height: '150px', fontSize: '65px' }}>
                <FaTint />
              </div>
            </div>

          </div>
        </div>

        <RequestHistory requests={requests} onRequestDeleted={getRequests} />

      </div>

      <RequestModal show={showModal} onHide={() => setShowModal(false)} user={user} onRequestCreated={getRequests} />
      <EditProfile show={showEdit} onHide={() => setShowEdit(false)} user={user} onProfileUpdated={setUser} />
    </div>
  )
}

export default Receiver
