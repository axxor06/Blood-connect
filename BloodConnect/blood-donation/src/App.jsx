import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Donor from './Pages/Donor'
import Receiver from './Pages/Receiver'
import Pnf from './Pages/Pnf'
import { ToastContainer } from 'react-toastify';

// only lets the logged-in user with the matching role open the page
const Access = ({ role, children }) => {
  const user = JSON.parse(localStorage.getItem('loggedUser'))
  return user?.role === role ? children : <Navigate to="/signin" replace />
}

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/donor" element={<Access role="donor"><Donor /></Access>} />
        <Route path="/receiver" element={<Access role="receiver"><Receiver /></Access>} />
        <Route path="*" element={<Pnf />} />
      </Routes>

      <Footer />

      <ToastContainer position="top-right" autoClose={1500} theme="colored" />
    </>
  )
}

export default App
