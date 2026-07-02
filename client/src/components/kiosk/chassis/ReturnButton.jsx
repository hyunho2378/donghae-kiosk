// 노란 원형 반환 버튼 + 은색 반환 레버 (FIX-H). 장식용(클릭 무반응).
import { chassisColors } from '../../../tokens.js'

function ReturnButton() {
  const { yellowReturn, metalSilver, baseSilverDark } = chassisColors
  return (
    <div className="flex w-full items-center justify-center gap-5 py-1">
      {/* 노란 원형 버튼 (상단 하이라이트 + 아래 그림자로 입체) */}
      <div
        className="h-14 w-14 rounded-full"
        style={{
          backgroundColor: yellowReturn,
          boxShadow:
            'inset 0 4px 5px rgba(255,255,255,0.55), inset 0 -5px 7px rgba(0,0,0,0.35), 0 4px 6px rgba(0,0,0,0.55)',
        }}
      />
      {/* 은색 반환 레버 */}
      <div
        className="relative h-14 w-6 rounded-sm"
        style={{ background: `linear-gradient(90deg, ${baseSilverDark}, ${metalSilver}, ${baseSilverDark})` }}
      >
        <div
          className="absolute left-1/2 top-1 h-4 w-4 -translate-x-1/2 rounded-full"
          style={{ backgroundColor: metalSilver, border: '1px solid rgba(0,0,0,0.4)' }}
        />
      </div>
    </div>
  )
}

export default ReturnButton
