import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHeartbeat, FaArrowRight } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { allUsersAPI } from '../services/allAPI'

function SignIn() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!userData.email || !userData.password) {
      toast.error('Please enter email and password')
      return
    }

    try {
      const response = await allUsersAPI()

      const user = response.data.find(
        (item) =>
          item.email.toLowerCase() === userData.email.toLowerCase() &&
          item.password === userData.password
      )

      if (!user) {
        toast.error('Invalid email or password')
        return
      }

      if (user.role !== 'donor' && user.role !== 'receiver') {
        toast.error('User role not found')
        return
      }

      localStorage.setItem('loggedUser', JSON.stringify(user))
      toast.success('Login successful')
      navigate(`/${user.role}`)
    } catch (err) {
      console.log(err)
      toast.error('Server not reachable. Try again later')
    }
  }

  return (
    <div className="page-bg d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-7 col-lg-5">
            <div className="panel p-4 p-md-5 shadow-sm">

              <div className="text-center mb-4">
                <div className="icon-circle mb-3" style={{ width: '60px', height: '60px', fontSize: '28px' }}>
                  <FaHeartbeat />
                </div>
                <h2 className="fw-bold mb-2">Welcome to Blood<span className="text-red">-Connect</span></h2>
                <p className="text-secondary mb-0">Sign in to continue</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input type="email" name="email" placeholder="Enter your email" className="form-control py-2"
                    value={userData.email} onChange={handleChange} />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Password</label>
                  <input type="password" name="password" placeholder="Enter your password" className="form-control py-2"
                    value={userData.password} onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-red w-100 py-2 d-flex align-items-center justify-content-center gap-2">
                  Sign In <FaArrowRight size={14} />
                </button>
              </form>

              <div className="text-center mt-4">
                <span className="text-secondary">Don't have an account? </span>
                <Link to="/signup" className="fw-semibold text-decoration-none text-red">Create Account</Link>
              </div>

              <div className="text-center mt-3">
                <Link to="/" className="text-secondary text-decoration-none small">← Back to Home</Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
