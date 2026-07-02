// S11 부수 입력
// 숫자 1-9만(삭제/0/정정 없음, 실제 사진 그대로). 숫자 클릭 시 값 교체(누적 아님).
// 다음 버튼은 기본값(1부)부터 항상 활성 → S12.

import KioskTopBar from '../KioskTopBar.jsx'

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

function S11_CopiesInput({ copies, onSetCopies, onNext, onBack, onHome, highlight = false }) {
  return (
    <div className="flex h-full flex-col bg-kiosk-white">
      <KioskTopBar
        title="부수 입력"
        showBack
        onBack={onBack}
        showNext
        highlightNext={highlight}
        onNext={onNext}
        onHome={onHome}
      />
      <div className="flex min-h-0 flex-1 flex-col items-center px-6 py-8">
        <p className="mb-6 text-center text-kiosk-body font-semibold text-kiosk-blue-primary underline">
          발급할 부수를 입력한 후 다음버튼을 누르십시오.
        </p>

        {/* 현재 부수 */}
        <div className="mb-8 flex items-baseline gap-2">
          <span className="text-kiosk-keypad text-kiosk-blue-primary">{copies}</span>
          <span className="text-kiosk-body text-kiosk-gray-text">부</span>
        </div>

        {/* 숫자 키패드 1-9 */}
        <div className="grid w-full max-w-[300px] grid-cols-3 gap-2">
          {DIGITS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onSetCopies(Number(d))}
              className="rounded-kiosk-button border border-kiosk-gray-border bg-kiosk-white py-4 text-kiosk-keypad text-kiosk-navy-header focus-visible:outline focus-visible:outline-2 focus-visible:outline-kiosk-blue-primary"
            >
              {d}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default S11_CopiesInput
