import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/landing/HeroSection'
import ContentSpotlightSection from '../components/landing/ContentSpotlightSection'

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ContentSpotlightSection />
      </main>
    </div>
  )
}

export default LandingPage