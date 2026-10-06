import React from 'react'
import { FaHistory, FaCheckCircle, FaClock, FaTimesCircle, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { deleteRequestAPI } from '../services/allAPI'

const statusView = {
  accepted: { cls: 'text-bg-success', icon: <FaCheckCircle className="me-1" />, label: 'Accepted' },
  declined: { cls: 'text-bg-danger', icon: <FaTimesCircle className="me-1" />, label: 'Declined' },
  pending: { cls: 'text-bg-warning', icon: <FaClock className="me-1" />, label: 'Pending' },
}

function RequestHistory({ requests = [], onRequestDeleted }) {

  const removeRequest = async (id) => {
    if (!window.confirm('Are you sure you want to remove this request?')) return

    try {
      const response = await deleteRequestAPI(id)

      if (response.status == 200) {
        toast.success('Request removed')
        onRequestDeleted()
      }
    } catch (err) {
      console.log(err)
      toast.error('Could not remove the request')
    }
  }

  return (
    <div className="panel p-4 shadow-sm">
      <div className="d-flex align-items-center gap-2 mb-4">
        <FaHistory className="text-red" />
        <h5 className="fw-bold mb-0">Request History</h5>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-5">
          <FaHistory size={35} className="mb-3 text-red" />
          <h6 className="fw-semibold">No blood requests yet</h6>
          <p className="text-secondary mb-0">Your blood request history will appear here.</p>
        </div>
      ) : (
        requests.slice().reverse().map((request) => {
          const status = statusView[request.status] || statusView.pending

          return (
            <div key={request.id} className="border rounded-3 p-3 mb-3">

              <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                <div>
                  <h6 className="fw-bold mb-1">{request.hospital}</h6>
                  <p className="text-secondary mb-1">{request.location}</p>
                  <small className="text-secondary">{request.unitsRequired} unit(s)</small>
                </div>
                <span className={`badge ${status.cls} align-self-start`}>{status.icon}{status.label}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <small className="text-secondary">Blood Group: {request.bloodGroup}</small>

                <button className="btn btn-outline-red btn-sm d-flex align-items-center gap-2" onClick={() => removeRequest(request.id)}>
                  <FaTrash size={12} /> Remove Request
                </button>
              </div>

              {request.message && (
                <p className="mt-3 mb-0 small"><strong>Message:</strong> {request.message}</p>
              )}

            </div>
          )
        })
      )}
    </div>
  )
}

export default RequestHistory
