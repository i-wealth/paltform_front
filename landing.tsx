'use client'

import HeroSection1 from '../components/HeroSection1'
import ModulesGrid from '../components/ModulesGrid'
import LivePricesBar from '../components/LivePricesBar'
import FeaturesSection2 from '../components/FeaturesSection2'
import AboutMeSection from '../components/AboutMeSection'
import Giftgoldcoin from '../components/Giftgoldcoin'
import Footer from '../components/Footer'
import Header from '../components/Header'
export default function Landing() {
  return (
    <div className="landing-page">
      <Header />
      {/* Hero Section */}
      <div>
        <HeroSection1 />
      </div>
      
      {/* Modules Grid */}
      <div className="py-16">
        <ModulesGrid />
      </div>

      {/* Live Prices Bar */}
      <div className="py-16 bg-gray-50">
        <LivePricesBar />
      </div>

      {/* Features Section 2 */}
      <div className="py-16">
        <FeaturesSection2 />
      </div>

      {/* About Me Section */}
      <div className="py-16 bg-gray-50">
        <AboutMeSection />
      </div>
      
      {/* gift gold/coin */}
      <div className="py-16 bg-gray-50">
      <Giftgoldcoin />
      </div>
      {/* gift gold/coin */}
      <div className="py-16 bg-gray-50">
      <Footer />
      </div>
    </div>
  )
}
