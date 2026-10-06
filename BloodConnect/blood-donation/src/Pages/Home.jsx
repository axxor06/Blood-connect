import React from 'react'
import { Link } from 'react-router-dom'
import { FaHeartbeat, FaArrowRight } from 'react-icons/fa'
import bgImage from '../assets/Bg.png'

const steps = [
  { title: 'Send a Request', text: 'Receivers can create a blood request with their blood group and required details.' },
  { title: 'Find a Match', text: 'Matching donors can view blood requests based on blood group and location.' },
  { title: 'Accept & Connect', text: 'The donor accepts the request and the receiver gets an acceptance message.' },
]

function Home() {
  return (
    <div style={{ color: '#17202a' }}>

      {/* Hero */}
      <section
        className="d-flex align-items-center"
        style={{
          minHeight: '650px',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <div className="col-lg-6 py-5">
            <span className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill fw-semibold small mb-4 icon-circle">
              <FaHeartbeat /> Every Drop Matters
            </span>

            <h1 className="fw-bold display-3 mb-4" style={{ letterSpacing: '-2px' }}>
              One Donation <br />
              <span className="text-red">Can Save a Life</span>
            </h1>

            <p className="fs-5 text-secondary mb-4" style={{ maxWidth: '500px', lineHeight: '1.6' }}>
              Be the reason someone gets another tomorrow. Connect with blood donors and people in need when every second matters.
            </p>

            <Link to="/signin" className="btn btn-red px-4 py-3 d-inline-flex align-items-center gap-2">
              Get Started <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-5">
        <div className="container py-5">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '650px' }}>
            <span className="fw-bold small text-red" style={{ letterSpacing: '2px' }}>HOW IT WORKS</span>
            <h2 className="fw-bold mt-2">Making Blood Donation Simple</h2>
            <p className="text-secondary mt-3">
              A simple connection between people who need blood and those who are ready to donate.
            </p>
          </div>

          <div className="row g-4">
            {steps.map((step, index) => (
              <div className="col-md-4" key={step.title}>
                <div className="border rounded-4 p-4 h-100">
                  <div className="fw-bold mb-3 text-red">0{index + 1}</div>
                  <h5 className="fw-bold">{step.title}</h5>
                  <p className="text-secondary mb-0">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="pb-5">
        <div className="container">
          <div
            className="rounded-4 p-5 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4"
            style={{ backgroundColor: '#fff1f3' }}
          >
            <div>
              <span className="fw-bold small text-red">MAKE A DIFFERENCE</span>
              <h2 className="fw-bold mt-2 mb-0">Your One Decision Can Help Save a Life.</h2>
            </div>

            <Link to="/signin" className="btn btn-red px-4 py-3 d-flex align-items-center gap-2" style={{ whiteSpace: 'nowrap' }}>
              Get Started <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
