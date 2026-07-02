// S7 시·도교육청 선택
// 17개 지역 버튼 전부 클릭 가능(같은 플로우 안의 데이터 입력). 아무거나 클릭 → S8.

import KioskTopBar from '../KioskTopBar.jsx'
import { HELP_RING_CLASS } from '../../../data/helpHints.js'

const REGIONS = [
  '서울', '광주', '전남', '부산',
  '대구', '인천', '대전', '울산',
  '세종', '경기', '강원', '충북',
  '충남', '전북', '경북', '경남',
  '제주',
]

function S7_EduOfficeSelect({ onSelectRegion, onBack, onHome, highlight = false }) {
  return (
    <div className="flex h-full flex-col bg-kiosk-white">
      <KioskTopBar title="시·도교육청 선택" showBack onBack={onBack} onHome={onHome} />
      <div className="flex min-h-0 flex-1 flex-col px-6 py-6">
        <p className="mb-2 text-center text-kiosk-body font-semibold text-kiosk-blue-primary underline">
          졸업한 학교의 시·도교육청을 선택하여 주십시오.
        </p>
        <p className="mb-6 text-center text-kiosk-body text-kiosk-gray-text">
          예) 부산의 동래고등학교 졸업 → 부산광역시 교육청 선택
        </p>
        <div className={`grid grid-cols-4 gap-3 ${highlight ? HELP_RING_CLASS : ''}`}>
          {REGIONS.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => onSelectRegion(region)}
              className="rounded-kiosk-button border border-kiosk-gray-border bg-kiosk-white py-4 text-kiosk-button text-kiosk-navy-header focus-visible:outline focus-visible:outline-2 focus-visible:outline-kiosk-blue-primary"
            >
              {region}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default S7_EduOfficeSelect
