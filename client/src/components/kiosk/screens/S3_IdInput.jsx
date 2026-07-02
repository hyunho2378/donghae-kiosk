// S3 주민등록번호 입력 (IA.md / 실제 사진 IMG_7875 재현)
// - 상단바: 이전/다음/홈. 13자리 입력 완료 시에만 "다음" 활성.
// - 안내문: 파란색 강조(밑줄).
// - 마스킹 입력 필드: 6자리 - 7자리, 입력된 자리만 * 표시.
// - 숫자 키패드 재사용.

import KioskTopBar from '../KioskTopBar.jsx'
import NumericKeypad from '../shared/NumericKeypad.jsx'

const ID_LENGTH = 13
const FRONT_LENGTH = 6

function maskGroup(idNumber, start, end) {
  let out = ''
  for (let i = start; i < end; i += 1) {
    out += i < idNumber.length ? '*' : '·'
  }
  return out
}

function S3_IdInput({ idNumber, onDigit, onDelete, onClear, onNext, onBack, onHome, highlight = false }) {
  const complete = idNumber.length === ID_LENGTH
  const front = maskGroup(idNumber, 0, FRONT_LENGTH)
  const back = maskGroup(idNumber, FRONT_LENGTH, ID_LENGTH)

  return (
    <div className="flex h-full flex-col bg-kiosk-white">
      <KioskTopBar
        title="주민등록번호 입력"
        showBack
        onBack={onBack}
        showNext
        highlightNext={highlight}
        // 다음은 항상 활성 외형. 13자리 완료 시에만 실제 전환(FIX-A 6).
        onNext={() => {
          if (complete) onNext()
        }}
        onHome={onHome}
      />

      <div className="flex min-h-0 flex-1 flex-col items-center px-6 py-8">
        {/* 발급 기관 */}
        <div className="mb-6 flex w-full items-center justify-end gap-2 text-kiosk-gray-text">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-kiosk-blue-primary text-dash-small text-kiosk-white">
            강
          </span>
          <span className="text-kiosk-body">강원특별자치도교육청</span>
        </div>

        {/* 안내문 (파란 강조 + 밑줄) */}
        <p className="mb-6 text-center text-kiosk-body font-semibold text-kiosk-blue-primary underline">
          주민등록번호 13자리를 입력한 후 다음버튼을 누르십시오.
        </p>

        {/* 마스킹 입력 필드 */}
        <div className="mb-8 flex w-full items-center justify-center gap-3 rounded-kiosk-button bg-kiosk-blue-primary px-6 py-5">
          <span className="text-kiosk-keypad tracking-[0.3em] text-kiosk-white">{front}</span>
          <span className="text-kiosk-keypad text-kiosk-white">-</span>
          <span className="text-kiosk-keypad tracking-[0.3em] text-kiosk-white">{back}</span>
        </div>

        {/* 숫자 키패드 */}
        <div className="w-full max-w-[360px]">
          <NumericKeypad onDigit={onDigit} onDelete={onDelete} onClear={onClear} />
        </div>
      </div>
    </div>
  )
}

export default S3_IdInput
