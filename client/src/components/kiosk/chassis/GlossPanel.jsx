// 검정 광택 패널 (배경 glossBlack + 좌상→우하 사선 하이라이트로 유리 반사).
import { chassisColors } from '../../../tokens.js'

function GlossPanel() {
  return (
    <div
      className="relative h-14 w-full overflow-hidden rounded-md"
      style={{ backgroundColor: chassisColors.glossBlack }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.04) 38%, rgba(255,255,255,0) 60%)',
        }}
      />
    </div>
  )
}

export default GlossPanel
