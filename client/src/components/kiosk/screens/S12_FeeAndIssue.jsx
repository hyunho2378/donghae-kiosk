// S12 수수료 투입 (타이틀은 원본 그대로 "수수료 투입")
// 표(신청부수/1부당수수료/총수수료/현재금액) + 발급 버튼. 발급 클릭 → M13 모달.

import { Printer } from 'lucide-react'
import KioskTopBar from '../KioskTopBar.jsx'
import { iconSize } from '../../../tokens.js'
import { HELP_RING_CLASS } from '../../../data/helpHints.js'

function FeeRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-kiosk-gray-border px-4 py-3">
      <span className="text-kiosk-body text-kiosk-gray-text">{label}</span>
      <span className="text-kiosk-body text-kiosk-navy-header">{value}</span>
    </div>
  )
}

function S12_FeeAndIssue({ copies, onIssue, onBack, onHome, highlight = false }) {
  return (
    <div className="flex h-full flex-col bg-kiosk-white">
      <KioskTopBar title="수수료 투입" showBack onBack={onBack} onHome={onHome} />
      <div className="flex min-h-0 flex-1 flex-col px-6 py-8">
        <p className="mb-6 text-center text-kiosk-body font-semibold text-kiosk-blue-primary underline">
          발급하시려면 발급버튼을 누르십시오
        </p>

        {/* 수수료 표 */}
        <div className="mb-8 rounded-kiosk-button border border-kiosk-gray-border">
          <FeeRow label="신청부수" value={`${copies}부`} />
          <FeeRow label="1부당수수료" value="무료" />
          <FeeRow label="총수수료" value="무료" />
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-kiosk-body text-kiosk-gray-text">현재금액</span>
            <span className="text-kiosk-body text-kiosk-navy-header">0원</span>
          </div>
        </div>

        {/* 발급 버튼 */}
        <button
          type="button"
          onClick={onIssue}
          className={`flex items-center justify-center gap-3 rounded-kiosk-button bg-kiosk-blue-primary py-5 text-kiosk-button text-kiosk-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-kiosk-navy-header ${
            highlight ? HELP_RING_CLASS : ''
          }`}
        >
          <Printer size={iconSize.md} />
          발급
        </button>
      </div>
    </div>
  )
}

export default S12_FeeAndIssue
