import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHeartbeat, FaArrowRight } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { saveUserAPI } from '../services/allAPI'
import bloodGroups from '../assets/bloodGroups.json'

function SignUp() {
  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    fullName: '', email: '', phone: '', bloodGroup: '',
    age: '', gender: '', role: '', password: '', confirmPassword: ''
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

    if (userData.password !== userData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    const { confirmPassword, ...newUser } = userData

    try {
      const response = await saveUserAPI(newUser)

      if (response.status === 201) {
        toast.success('Account created successfully')
        navigate('/signin')
      }
    } catch (err) {
      console.log(err)
      toast.error('Server not reachable. Try again later')
    }
  }

  const field = (label, name, type = 'text', placeholder = '') => (
    <>
      <label className="form-label">{label}</label>
      <input type={type} name={name} placeholder={placeholder} className="form-control"
        min={type === 'number' ? 1 : undefined} value={userData[name]} onChange={handleChange} />
    </>
  )

  return (
    <div className="page-bg py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-9">
            <div className="panel shadow-sm p-4 p-md-5">

              <div className="text-center mb-4">
                <div className="icon-circle mb-3" style={{ width: '60px', height: '60px', fontSize: '28px' }}>
                  <FaHeartbeat />
                </div>
                <h2 className="fw-bold mb-2">Create Account</h2>
                <p className="text-secondary mb-0">Join Blood-Connect and help save lives</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">{field('Full Name', 'fullName', 'text', 'Enter your full name')}</div>

                <div className="row">
                  <div className="col-md-6 mb-3">{field('Email', 'email', 'email', 'Enter your email')}</div>
                  <div className="col-md-6 mb-3">{field('Phone', 'phone', 'tel', 'Enter your phone number')}</div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Blood Group</label>
                    <select name="bloodGroup" className="form-select" value={userData.bloodGroup} onChange={handleChange}>
                      <option value="">Select blood group</option>
                      {bloodGroups.map((group) => <option key={group} value={group}>{group}</option>)}
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">{field('Age', 'age', 'number', 'Enter age')}</div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Gender</label>
                    <select name="gender" className="form-select" value={userData.gender} onChange={handleChange}>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">I want to</label>
                  <select name="role" className="form-select" value={userData.role} onChange={handleChange}>
                    <option value="">Select role</option>
                    <option value="donor">Donate Blood</option>
                    <option value="receiver">Request Blood</option>
                  </select>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">{field('Password', 'password', 'password', 'Enter password')}</div>
                  <div className="col-md-6 mb-3">{field('Confirm Password', 'confirmPassword', 'password', 'Confirm password')}</div>
                </div>

                <button type="submit" className="btn btn-red w-100 py-2 d-flex align-items-center justify-content-center gap-2">
                  Create Account <FaArrowRight size={14} />
                </button>
              </form>

              <div className="text-center mt-4">
                <span className="text-secondary">Already have an account? </span>
                <Link to="/signin" className="text-decoration-none fw-semibold text-red">Sign In</Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
