import CryptoHeader from '../components/CryptoHeader'
import HeroSection from '../components/HeroSection'
import CryptoExchange from '../components/CryptoExchange'



export default function CryptoPage() {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-white min-h-screen px-6 ">
      {/* بخش header */}
      <CryptoHeader />
      
      {/* بخش Hero */}
      <HeroSection />
      
      
      {/* بخش Crypto Exchange */}
      <div className="mt-12">
        <CryptoExchange />
      </div>

      
      
    </div>
  )
}
