// 모달 오버레이 공통 wrapper (PATTERNS.md 모달)
// 부모 화면 중앙 고정폭 오버레이, 배경 딤 rgba(0,0,0,0.35), 버튼 없음.
// 부모(KioskFrame 화면 영역)가 relative여야 inset-0로 덮인다.

import { modalDim } from '../../../tokens.js'

function KioskModal({ children }) {
  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center px-6"
      style={{ backgroundColor: modalDim }}
    >
      <div className="w-full max-w-[420px] rounded-kiosk-button bg-kiosk-white px-8 py-10 text-center">
        {children}
      </div>
    </div>
  )
}

export default KioskModal
