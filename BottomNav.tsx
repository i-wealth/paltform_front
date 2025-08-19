'use client'

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <div>🏠</div>
      <div>💰</div>
      <div>⚙️</div>

      <style jsx>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 60px;
          background: #fff;
          border-top: 1px solid #ccc;
          display: flex;
          justify-content: space-around;
          align-items: center;
          z-index: 10;
        }
      `}</style>
    </nav>
  )
}
