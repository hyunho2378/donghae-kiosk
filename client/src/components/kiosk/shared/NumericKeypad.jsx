// 숫자 키패드 (PATTERNS.md: 3열 그리드, 1-2-3 / 4-5-6 / 7-8-9 / 삭제-0-정정)
// S3(주민번호), S11(부수)에서 재사용.

const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['삭제', '0', '정정'],
]

function NumericKeypad({ onDigit, onDelete, onClear }) {
  function handleKey(key) {
    if (key === '삭제') return onDelete()
    if (key === '정정') return onClear()
    return onDigit(key)
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {KEYS.flat().map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => handleKey(key)}
          className="rounded-kiosk-button border border-kiosk-gray-border bg-kiosk-white py-4 text-kiosk-keypad text-kiosk-navy-header focus-visible:outline focus-visible:outline-2 focus-visible:outline-kiosk-blue-primary"
        >
          {key}
        </button>
      ))}
    </div>
  )
}

export default NumericKeypad
