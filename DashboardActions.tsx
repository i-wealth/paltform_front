'use client'

import { useState } from 'react'
import Image from 'next/image'
import WalletBalance from '../components/WalletBalance'
import WalletBalance2 from '../components/WalletBalance2'
import ExchangeBox from '../components/ExchangeBox'
import Giftgoldcoin from '../components/Giftgoldcoin'
import DistributionChart from '../components/DistributionChart'
import AutoInvestment from '../components/AutoInvestment'
import FinancialSummary from '../components/FinancialSummary'

const actions = [
  { label: 'کیف پول', icon: '/images/a240d148b87703ce5ddc7b3ace8dd974-removebg-preview.png' },
  { label: 'تبدیل دارایی', icon: '/images/exchange.png' },
  { label: 'سرمایه گذاری خودکار', icon: '/images/c6efdf66306dee02724baf2d262ecc4a-removebg-preview.png' },
  { label: 'گزارش', icon: '/images/48dfa253f03e3c9e177b682cc68691df-removebg-preview.png' },
]

export default function DashboardActions() {
  const [showModal, setShowModal] = useState<string | null>(null)
  const [step, setStep] = useState(1) // Track the current step
  const [bank, setBank] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const closeModal = () => {
    setShowModal(null)
    setStep(1) // Reset to step 1
  }

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      closeModal()
    }
  }

  return (
    <div style={{ fontFamily: "Sans" }}>
      <div className="services-container">
        {actions.map((action) => (
          <div
            style={{ fontFamily: "Sans" }}
            key={action.label}
            className="services-item"
            onClick={() => setShowModal(action.label)} // set the correct modal
          >
            <div className="services-icon-wrapper">
              <Image src={action.icon} alt={action.label} width={40} height={40} />
            </div>
            <div className="services-label">{action.label}</div>
          </div>
        ))}
      </div>

      {/* Modal برای سرمایه گذاری خودکار */}
      {showModal === 'سرمایه گذاری خودکار' && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3 className="text-lg font-semibold text-gray-800">سرمایه گذاری خودکار</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <AutoInvestment />
            </div>
          </div>
        </div>
      )}

      {/* Modal برای کیف پول */}
      {showModal === 'کیف پول' && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3 className="text-lg font-semibold text-gray-800">کیف پول</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="wallet-info">
                <div className="wallet-item"><WalletBalance /></div>
                <div className="wallet-item"><WalletBalance2 /></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal برای تبدیل دارایی */}
      {showModal === 'تبدیل دارایی' && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3 className="text-lg font-semibold text-gray-800">تبدیل دارایی</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="exchange-box">
                <ExchangeBox />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal برای گزارش */}
      {showModal === 'گزارش' && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3 className="text-lg font-semibold text-gray-800">گزارش</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              {/* نمایش خلاصه مالی و نمودار توزیع */}
              <FinancialSummary />
              <DistributionChart />

            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .services-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
          padding: 24px;
          direction: rtl;
          font-family: 'yekan-bakh';
          background-color: #fff;
          justify-items: center;
          align-items: center;
        }

        .services-item {
          width: 90px;
          height: 116px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          cursor: pointer;
        }

        .services-icon-wrapper {
          width: 88px;
          height: 88px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border-radius: 16px;
          background: linear-gradient(135deg, #f4f4f4, #e0e0e0);
        }

        .services-label {
          font-size: 12px;
          line-height: 19.92px;
          text-align: center;
          font-weight: 500;
          color: #222;
          width: 100%;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          animation: fadeIn 0.3s forwards;
        }

        .modal-container {
          background: #fff;
          border-radius: 10px;
          max-width: 600px;
          width: 100%;
          padding: 24px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transform: scale(0.95);
          animation: zoomIn 0.3s forwards;
          max-height: 90%;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 18px;
          color: #333;
          cursor: pointer;
        }

        .modal-body {
          padding: 10px 0;
          overflow-y: auto;
        }

        .wallet-info {
          padding: 20px;
          text-align: center;
          background: #f9f9f9;
          border-radius: 8px;
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .exchange-box {
          padding: 20px;
          background: #f9f9f9;
          border-radius: 8px;
          text-align: center;
        }

        .asset-equivalence {
          margin-top: 20px;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 8px;
          text-align: center;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @keyframes zoomIn {
          to {
            transform: scale(1);
          }
        }

        /* برای موبایل */
@media (max-width: 768px) {
  .services-container {
    grid-template-columns: repeat(2, 1fr); /* دو ستون برای موبایل */
    gap: 16px;
    padding: 12px;
  }
}

/* برای تبلت و صفحه‌های بزرگتر */
@media (min-width: 769px) and (max-width: 1024px) {
  .services-container {
    grid-template-columns: repeat(3, 1fr); /* سه ستون برای تبلت */
    gap: 20px;
    padding: 16px;
  }
}

/* برای دسکتاپ */
@media (min-width: 1025px) {
  .services-container {
    grid-template-columns: repeat(4, 1fr); /* چهار ستون برای دسکتاپ */
    gap: 24px;
    padding: 24px;
  }
}


          .services-item {
            width: 80px;
            height: 110px;
          }

          .services-icon-wrapper {
            width: 72px;
            height: 72px;
          }

          .services-label {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  )
}
