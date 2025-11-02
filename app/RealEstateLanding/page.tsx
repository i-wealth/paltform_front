'use client'

import RealstateHeroSection1 from '../components/RealstateHeroSection1'
import RealEstateProjects from '../components/RealEstateProjects'
import Footer from '../components/Footer'
import Header from '../components/Header'
import RealStateInvestmentCalculator from '../components/RealStateInvestmentCalculator'
import ConstructionToolsGrid from '../components/ConstructionToolsGrid'

export default function RealEstateLanding() {
  return (
    <div className="landing-page">
      <Header />
      <div>
        <RealstateHeroSection1 />
      </div>

      <div className="py-16 bg-gray-50">
        <RealEstateProjects />
      </div>

      <div className="py-16 bg-gray-50">
        <RealStateInvestmentCalculator />
      </div>

      <div className="py-16 bg-gray-50">
        <ConstructionToolsGrid />
      </div>

      <div className="py-16 bg-gray-50">
        <Footer />
      </div>
    </div>
  )
}
