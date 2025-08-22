import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HeroSection: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      // Navigate to signup page with email pre-filled
      navigate('/signup', { state: { email: email.trim() } })
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="mb-12 lg:mb-0">
            <h1 className="text-[40px] sm:text-5xl lg:text-6xl font-heading font-bold text-darkText leading-tight mb-6 text-center">
              Create company-tailored training at scale
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed text-center">
              Turn knowledge into training with an authoring tool anyone can use.
            </p>

            <div className="bg-white p-6 rounded-xl">
              <form className="flex flex-col sm:flex-row" onSubmit={handleSubmit}>
                <div className="flex-1">
                  <label htmlFor="email" className="sr-only">Business Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Business Email"
                    className="form-input rounded-r-none border-black"
                    required
                  />
                </div>
                <button
                  type="submit"
                  style={{ backgroundImage: 'none'}}
                  className="btn-primary whitespace-nowrap rounded-l-none !bg-black"
                  aria-label="Get started with your business email"
                >
                  Try free for 14 days
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection