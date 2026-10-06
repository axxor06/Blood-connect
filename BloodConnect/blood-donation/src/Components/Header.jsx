import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHeartbeat, FaUserCircle } from 'react-icons/fa'
import { toast } from 'react-toastify'
import {
  allRequestsAPI, deleteRequestAPI,
  allDonorsAPI, deleteDonorAPI,
  allReceiversAPI, deleteReceiverAPI,
  deleteUserAPI
} from '../services/allAPI'

function Header() {
  useLocation() // re-reads the logged user on every page change
  const user = JSON.parse(localStorage.getItem('loggedUser'))
  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('loggedUser')
    setShowProfile(false)
    navigate('/signin')
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? All your requests will also be deleted.')) return

    try {
      const sameUser = (id) => String(id) === String(user.id)

      const requests = (await allRequestsAPI()).data.filter(
        (item) => sameUser(item.receiverId) || sameUser(item.donorId)
      )
      for (const request of requests) await deleteRequestAPI(request.id)

      const [getAll, remove] = user.role === 'donor'
        ? [allDonorsAPI, deleteDonorAPI]
        : [allReceiversAPI, deleteReceiverAPI]

      const profiles = (await getAll()).data.filter((item) => sameUser(item.userId))
      for (const profile of profiles) await remove(profile.id)

      await deleteUserAPI(user.id)

      localStorage.removeItem('loggedUser')
      setShowProfile(false)
      toast.success('Account deleted')
      navigate('/signin')
    } catch (err) {
      console.log(err)
      toast.error('Could not delete account. Try again later')
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#ffffff', color: '#17202a' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className="text-decoration-none text-red fw-bolder d-flex align-items-center gap-2">
              <FaHeartbeat /> Blood-Connect
            </Link>
          </Typography>

          <Link
            to={user ? `/${user.role}` : '/'}
            className="text-decoration-none text-dark fw-bolder mx-4"
          >
            Home
          </Link>

          {user ? (
            <div className="position-relative">
              <Button color="inherit" onClick={() => setShowProfile(!showProfile)} startIcon={<FaUserCircle />}>
                Profile
              </Button>

              {showProfile && (
                <div
                  className="position-absolute bg-white shadow rounded-3 p-3"
                  style={{ right: 0, top: '48px', width: '230px', zIndex: 1000, border: '1px solid var(--line)' }}
                >
                  <div className="mb-3">
                    <div className="fw-bold">{user.fullName}</div>
                    <small className="text-capitalize text-red">{user.role}</small>
                  </div>
                  <button className="btn btn-outline-red w-100 mb-2" onClick={handleDeleteAccount}>Delete Account</button>
                  <button className="btn btn-dark w-100" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signin" className="btn btn-red px-4">Sign In</Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
