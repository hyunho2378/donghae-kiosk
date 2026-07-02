// S8 학교명 입력
// 한글 조합 없이 클릭한 자모를 그대로 이어붙인다(로컬 상태). 2자 이상일 때만 다음 활성 → S9.

import { useState } from 'react'
import KioskTopBar from '../KioskTopBar.jsx'
import HangulKeypad from '../shared/HangulKeypad.jsx'

function S8_SchoolNameInput({ onNext, onBack, onHome, highlight = false }) {
  const [schoolName, setSchoolName] = useState('')
  const canProceed = schoolName.length >= 2

  return (
    <div className="flex h-full flex-col bg-kiosk-white">
      <KioskTopBar
        title="학교명 입력"
        showBack
        onBack={onBack}
        showNext
        highlightNext={highlight}
        // 다음은 항상 활성 외형. 2자 이상일 때만 실제 전환(FIX-A 6).
        onNext={() => {
          if (canProceed) onNext()
        }}
        onHome={onHome}
      />
      <div className="flex min-h-0 flex-1 flex-col px-6 py-6">
        <p className="mb-4 text-center text-kiosk-body font-semibold text-kiosk-blue-primary underline">
          학교명을 2자 이상 입력하신 후 다음버튼을 누르십시오.
        </p>

        {/* 입력창 + 삭제/정정 */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-14 flex-1 items-center rounded-kiosk-button border border-kiosk-gray-border bg-kiosk-white px-4 text-kiosk-keypad text-kiosk-navy-header">
            {schoolName}
          </div>
          <button
            type="button"
            onClick={() => setSchoolName((s) => s.slice(0, -1))}
            className="rounded-kiosk-button border border-kiosk-gray-border bg-kiosk-white px-3 py-3 text-kiosk-button text-kiosk-navy-header focus-visible:outline focus-visible:outline-2 focus-visible:outline-kiosk-blue-primary"
          >
            삭제
          </button>
          <button
            type="button"
            onClick={() => setSchoolName('')}
            className="rounded-kiosk-button border border-kiosk-gray-border bg-kiosk-white px-3 py-3 text-kiosk-button text-kiosk-navy-header focus-visible:outline focus-visible:outline-2 focus-visible:outline-kiosk-blue-primary"
          >
            정정
          </button>
        </div>

        <HangulKeypad onChar={(ch) => setSchoolName((s) => s + ch)} />
      </div>
    </div>
  )
}

export default S8_SchoolNameInput
