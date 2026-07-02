// 슬롯에서 슬라이드 출력되는 종이. 클릭하면 수령 연출 시작(onReceive).
// 수령 시 중앙 확대/유지/소멸은 App의 PaperReceiveOverlay가 담당(FIX-D).
import { timing } from '../../../tokens.js'
import CertificateCard from './CertificateCard.jsx'

function CertificatePaper({ onReceive }) {
  return (
    <button
      type="button"
      onClick={() => onReceive?.()}
      aria-label="증명서 수령"
      className="paper-entering block cursor-pointer"
      style={{
        boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
        animationDuration: `${timing.paperSlideMs}ms`, // 슬라이드 출력 시간(토큰)
      }}
    >
      <CertificateCard />
    </button>
  )
}

export default CertificatePaper
