'use client'

export default function Card() {
  return (
    <div className="card-wrapper">
      <div className="bank-card">
        <div className="card-header">
          <div className="logo-circle" />
          <span className="balance-label">موجودی فعلی</span>
        </div>
        <div className="amount">10000 تومان</div>
        <div className="info-row">
          <div>
            <div className="info-label">نام صاحب حساب</div>
            <div className="info-value">جان دو</div>
          </div>
          <div>
            <div className="info-label">انقضا</div>
            <div className="info-value">03/21</div>
          </div>
          <div>
            <div className="info-label">CVV</div>
            <div className="info-value">552</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .card-wrapper {
          width: 100%;
          padding: 24px 16px 12px;
        }

        .bank-card {
          background: #2f66ff;
          border-radius: 22px;
          padding: 24px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
          color: white;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: radial-gradient(circle, #ff914d, #ff2d55);
        }

        .balance-label {
          font-size: 15px;
          opacity: 0.9;
        }

        .amount {
          font-size: 30px;
          font-weight: bold;
          margin-top: 20px;
          margin-bottom: 24px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }

        .info-label {
          opacity: 0.7;
          margin-bottom: 4px;
        }

        .info-value {
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}
