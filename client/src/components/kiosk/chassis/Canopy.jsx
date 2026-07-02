// 상단 캐노피 (FIX-H) — 기기 최상단 은/흰 가로 패널 + 중앙 검정 굵은 글씨.
// 줌인 시에는 화면 상단에 얇게 걸치고, 줌아웃 시 전체가 보인다.
import { chassisColors, layout } from '../../../tokens.js'

function Canopy() {
  return (
    <div
      className="flex shrink-0 items-center justify-center"
      style={{
        height: layout.canopyHeight,
        background: `linear-gradient(180deg, ${chassisColors.canopy}, ${chassisColors.canopyEdge})`,
        borderBottom: '2px solid rgba(0,0,0,0.4)',
      }}
    >
      <span
        className="text-[26px] font-extrabold tracking-wide"
        style={{ color: chassisColors.canopyText }}
      >
        무인민원 발급창구
      </span>
    </div>
  )
}

export default Canopy
