// 한글 자모 키패드 (S8 전용) — PATTERNS.md: 자음 5열, 모음 4열 별도 그리드 + 숫자
// 주의: 초성/중성/종성 조합 로직 없음. 클릭한 자모를 그대로 문자열에 이어붙인다.

const CONSONANTS = [
  'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ',
  'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ',
  'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', 'ㄲ',
  'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ',
]

const VOWELS = [
  'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ',
  'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ',
  'ㅡ', 'ㅣ', 'ㅐ', 'ㅒ',
  'ㅔ', 'ㅖ', 'ㅢ', 'ㅚ',
]

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

const KEY_CLASS =
  'rounded-kiosk-button border border-kiosk-gray-border bg-kiosk-white py-3 text-kiosk-button text-kiosk-navy-header focus-visible:outline focus-visible:outline-2 focus-visible:outline-kiosk-blue-primary'

function HangulKeypad({ onChar }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-5 gap-2">
        {CONSONANTS.map((c, i) => (
          <button key={`c-${i}`} type="button" onClick={() => onChar(c)} className={KEY_CLASS}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {VOWELS.map((v, i) => (
          <button key={`v-${i}`} type="button" onClick={() => onChar(v)} className={KEY_CLASS}>
            {v}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {DIGITS.map((d) => (
          <button key={`d-${d}`} type="button" onClick={() => onChar(d)} className={KEY_CLASS}>
            {d}
          </button>
        ))}
      </div>
    </div>
  )
}

export default HangulKeypad
