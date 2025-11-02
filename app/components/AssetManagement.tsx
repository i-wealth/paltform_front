'use client'

import Image from 'next/image'

const actions = [
  { label: 'آی گلد', icon: '/images/cccc.png' },
  { label: 'آی کوین', icon: '/images/d86e202c5b376fdb02a7fae813bec08c-removebg-preview (1).png' },
  { label: 'آی فاند', icon: '/images/cc.png' },
  { label: 'آی بورس', icon: '/images/c.png' },
  { label: 'آی موند', icon: '/images/zz.png' },
  { label: 'آی ملک', icon: '/images/ccc.png' },
  { label: 'آی آرت', icon: '/images/zzz.png' },
  { label: 'تتر', icon: '/images/ccccc.png' },
]

export default function AssetManagement() {
  return (
    <div className="services-container">
      {actions.map((action) => (
        <div key={action.label} className="services-item">
          <div className="services-icon-wrapper">
            <Image src={action.icon} alt={action.label} width={40} height={40} />
          </div>
          <div className="services-label">{action.label}</div>
        </div>
      ))}
 <style jsx>{`
        .services-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
          padding: 24px;
          direction: rtl;
          font-family: 'yekan-bakh';
          background-color: #fff;
          justify-items: center; /* برای وسط چین کردن محتوا */
          align-items: center; /* برای وسط چین کردن عمودی */
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

        @media (max-width: 768px) {
          .services-container {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            padding: 16px;
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