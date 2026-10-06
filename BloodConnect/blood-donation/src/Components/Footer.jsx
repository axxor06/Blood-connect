import React from 'react'
import { Link } from 'react-router-dom'
import { FaHeartbeat, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'

function Footer() {
  return (
    <footer style={{ backgroundColor: '#171c24', color: 'white' }}>
      <div className="container py-5">
        <div className="row g-4">

          <div className="col-lg-5 col-md-6">
            <div className="fw-bold fs-4 mb-3 d-flex align-items-center gap-2">
              <span className="icon-circle" style={{ width: '38px', height: '38px' }}><FaHeartbeat /></span>
              Blood<span className="text-red">-Connect</span>
            </div>
            <p className="text-secondary" style={{ maxWidth: '350px' }}>
              Connecting blood donors with people in need. One donation can make a difference in someone's life.
            </p>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <div className="d-flex flex-column gap-2">
              <Link to="/" className="text-secondary text-decoration-none">Home</Link>
              <Link to="/signin" className="text-secondary text-decoration-none">Sign In</Link>
              <Link to="/signup" className="text-secondary text-decoration-none">Create Account</Link>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <h6 className="fw-bold mb-3">Contact</h6>
            <div className="d-flex flex-column gap-3 text-secondary">
              <div className="d-flex align-items-center gap-2"><FaPhoneAlt className="text-red" /> +91 98765 43210</div>
              <div className="d-flex align-items-center gap-2"><FaEnvelope className="text-red" /> support@bloodconnect.com</div>
            </div>
          </div>

        </div>

        <hr className="border-secondary my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <small className="text-secondary">© 2026 Blood-Connect. All rights reserved.</small>
          <small className="text-secondary">Donate blood. Save lives. ❤️</small>
        </div>
      </div>
    </footer>
  )
}

export default Footer
