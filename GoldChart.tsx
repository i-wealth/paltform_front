'use client'

export default function GoldChart() {
  return (
    <section className="chart-section">
      <h2>نمودار لحظه‌ای قیمت طلا</h2>
      <div className="price-info">
        <span className="price">۷,۳۲۱,۰۰۰ تومان</span>
        <span className="percent">٪۰.۸+</span>
      </div>
      <img src="/mock-chart.png" alt="نمودار" className="chart-img" />

      <div className="chart-tabs">
        <button>۲۴ ساعت اخیر</button>
        <button>هفتگی</button>
        <button className="active">ماهانه</button>
      </div>

      <style jsx>{`
        .chart-section {
          background: white;
          padding: 16px;
          border-radius: 12px;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
          margin-bottom: 24px;
        }

        h2 {
          font-size: 16px;
          margin-bottom: 8px;
        }

        .price-info {
          font-size: 18px;
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 16px;
        }

        .percent {
          color: green;
          font-size: 14px;
        }

        .chart-img {
          width: 100%;
          height: auto;
          border-radius: 10px;
          background: #eee;
        }

        .chart-tabs {
          display: flex;
          gap: 8px;
          margin-top: 12px;
        }

        .chart-tabs button {
          padding: 6px 12px;
          border-radius: 8px;
          border: none;
          background: #f1f1f1;
          font-size: 13px;
          cursor: pointer;
        }

        .chart-tabs .active {
          background: #ffd700;
        }
      `}</style>
    </section>
  )
}
