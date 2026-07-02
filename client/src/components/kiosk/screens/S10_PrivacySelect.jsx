// S10 주민등록번호 공시여부 선택
// 공개 / 비공개 카드 둘 다 클릭 가능 → S11.

import KioskTopBar from '../KioskTopBar.jsx'
import { HELP_RING_CLASS } from '../../../data/helpHints.js'

function PrivacyCard({ title, sample, onClick, highlight = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 flex-col items-center gap-3 rounded-kiosk-button border border-kiosk-gray-border bg-kiosk-white px-6 py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-kiosk-blue-primary ${
        highlight ? HELP_RING_CLASS : ''
      }`}
    >
      <span className="text-kiosk-button text-kiosk-navy-header">{title}</span>
      <span className="text-kiosk-keypad text-kiosk-gray-text">{sample}</span>
    </button>
  )
}

function S10_PrivacySelect({ onSelect, onBack, onHome, highlight = false }) {
  return (
    <div className="flex h-full flex-col bg-kiosk-white">
      <KioskTopBar title="주민등록번호 공시여부 선택" showBack onBack={onBack} onHome={onHome} />
      <div className="flex min-h-0 flex-1 flex-col px-6 py-8">
        <p className="mb-8 text-center text-kiosk-body font-semibold text-kiosk-blue-primary underline">
          주민등록번호 뒷자리 공개 여부를 선택하여 주십시오.
        </p>
        <div className="flex gap-4">
          <PrivacyCard title="공개" sample="880101-1234567" onClick={onSelect} />
          <PrivacyCard title="비공개" sample="880101-*******" onClick={onSelect} highlight={highlight} />
        </div>
      </div>
    </div>
  )
}

export default S10_PrivacySelect
