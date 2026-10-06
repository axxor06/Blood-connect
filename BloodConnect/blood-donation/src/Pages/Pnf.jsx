import React from 'react'
import { Link } from 'react-router-dom'

function Pnf() {
  return (
    <div className="page-bg d-flex flex-column align-items-center justify-content-center text-center">
      <h1 className="text-red fw-bold">404 - Page Not Found Error</h1>
      <Link to="/" className="btn btn-red mt-3 px-4">Back to Home</Link>
    </div>
  )
}

export default Pnf
