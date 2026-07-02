// S9 학교 선택
// 검색 결과는 항상 고정 1건("동명중학교(동명중학교)"). 우측 화살표는 장식(비활성). 항목 클릭 → S10.

import { ChevronUp, ChevronDown } from 'lucide-react'
import KioskTopBar from '../KioskTopBar.jsx'
import { iconSize } from '../../../tokens.js'
import { HELP_RING_CLASS } from '../../../data/helpHints.js'

function S9_SchoolSelect({ onSelectSchool, onBack, onHome, highlight = false }) {
  return (
    <div className="flex h-full flex-col bg-kiosk-white">
      <KioskTopBar title="학교 선택" showBack onBack={onBack} onHome={onHome} />
      <div className="flex min-h-0 flex-1 flex-col px-6 py-8">
        <p className="mb-2 text-center text-kiosk-body font-semibold text-kiosk-blue-primary underline">
          해당 학교를 선택해 주십시오.
        </p>
        <p className="mb-4 text-center text-kiosk-body text-kiosk-gray-text">
          총 1건 (1페이지 중 1페이지)
        </p>

        <div className="flex gap-3">
          {/* 결과 리스트 (고정 1건) */}
          <button
            type="button"
            onClick={onSelectSchool}
            className={`flex-1 rounded-kiosk-button border border-kiosk-gray-border bg-kiosk-white px-4 py-5 text-left text-kiosk-button text-kiosk-navy-header focus-visible:outline focus-visible:outline-2 focus-visible:outline-kiosk-blue-primary ${
              highlight ? HELP_RING_CLASS : ''
            }`}
          >
            동명중학교 (동명중학교)
          </button>

          {/* 스크롤 화살표 (장식, 비활성) */}
          <div className="flex flex-col gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-kiosk-button border border-kiosk-gray-border text-kiosk-gray-border">
              <ChevronUp size={iconSize.md} />
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-kiosk-button border border-kiosk-gray-border text-kiosk-gray-border">
              <ChevronDown size={iconSize.md} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default S9_SchoolSelect
