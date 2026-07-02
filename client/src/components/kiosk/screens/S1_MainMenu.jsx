// S1 메인 카테고리 메뉴 (IA.md / 실제 사진 IMG_7872 재현)
// - 증명서 버튼 9개(왼쪽 5 + 오른쪽 4) 2열 배치. 하단에 "처음으로" 홈 버튼.
// - IA.md "S1 클릭 제한": "졸업증명서(국문, 영문), 졸업예정증명서" 버튼만 onClick으로 S3 전환.
//   나머지 8개는 onClick 없음. 회색/비활성/커서 구분 없이 동일하게 렌더(실제 사진에 구분 없음).

import { Home } from 'lucide-react'
import KioskButton from '../shared/KioskButton.jsx'
import { iconSize } from '../../../tokens.js'
import { HELP_RING_CLASS } from '../../../data/helpHints.js'

// 왼쪽 열 5개, 오른쪽 열 4개(+ 마지막에 유일하게 동작하는 졸업증명서)
const LEFT_COLUMN = [
  '검정고시 성적증명서\n(국문, 영문)',
  '검정고시 합격증명서\n(국문, 영문)',
  '성적증명서',
  '학교생활기록부',
  '교육급여 수급자 증명서',
]

const RIGHT_COLUMN = [
  '검정고시 과목합격증명서',
  '제적(정원외관리)증명서',
  '교육비납입증명서',
]

// 유일하게 S3로 전환되는 버튼
const GRADUATION_LABEL = '졸업증명서(국문, 영문),\n졸업예정증명서'

// 줄 수와 무관하게 버튼 높이 통일 + 텍스트 세로/가로 중앙 (FIX-A)
const CERT_BTN_CLASS = 'flex min-h-[76px] items-center justify-center whitespace-pre-line'

function S1_MainMenu({ onSelectGraduation, onHome, highlight = false }) {
  return (
    <div className="flex h-full flex-col items-center bg-kiosk-white px-6 py-8">
      {/* 타이틀 / 안내문 */}
      <h1 className="mb-2 text-kiosk-title text-kiosk-yellow-title">교육제증명 서비스</h1>
      <p className="mb-8 text-kiosk-body text-kiosk-gray-text">
        발급을 원하는 증명서를 선택해 주세요
      </p>

      {/* 증명서 버튼 2열 */}
      <div className="grid w-full grid-cols-2 gap-3">
        <div className="flex flex-col gap-3">
          {LEFT_COLUMN.map((label) => (
            <KioskButton key={label} className={CERT_BTN_CLASS}>
              {label}
            </KioskButton>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {RIGHT_COLUMN.map((label) => (
            <KioskButton key={label} className={CERT_BTN_CLASS}>
              {label}
            </KioskButton>
          ))}
          <KioskButton
            className={`${CERT_BTN_CLASS} ${highlight ? HELP_RING_CLASS : ''}`}
            onClick={onSelectGraduation}
          >
            {GRADUATION_LABEL}
          </KioskButton>
        </div>
      </div>

      {/* 처음으로 */}
      <button
        type="button"
        onClick={onHome}
        className="mt-8 flex items-center gap-2 rounded-kiosk-button border border-kiosk-gray-border bg-kiosk-white px-4 py-3 text-kiosk-button text-kiosk-navy-header focus-visible:outline focus-visible:outline-2 focus-visible:outline-kiosk-blue-primary"
      >
        <Home size={iconSize.sm} />
        처음으로
      </button>
    </div>
  )
}

export default S1_MainMenu
