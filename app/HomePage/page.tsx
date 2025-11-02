import HeaderPage from '../components/HeaderPage';
import BenefitsSection from '../components/BenefitsSection';
import FAQSection from '../components/FAQSection';
import DescriptionSection from '../components/DescriptionSection';
import RiskAssessment from '../components/RiskAssessment'; 
import Footer from '../components/Footer'
import HeaderSelfManegment from '../components/HeaderSelfManegment'


export default function HomePage() {
  return (
  <div className="HomePage">
        <HeaderSelfManegment />
    <div className="bg-gradient-to-br from-gray-100 to-white min-h-screen px-6">
      <HeaderPage />
    </div>
      
    <div className="mt-12 px-6 max-w-screen-xl mx-auto">
        <DescriptionSection />
      </div>

      <div className="mt-12 px-6 max-w-screen-xl mx-auto">
        <BenefitsSection />
      </div>

      <div className="mt-12 px-6 max-w-screen-xl mx-auto">
        <RiskAssessment />
      </div>
      <div className="mt-12 px-6 max-w-screen-xl mx-auto">
        <FAQSection />
      </div>
       <div className="py-16 bg-gray-50">
             <Footer />
       </div>
    </div>
  );
}
