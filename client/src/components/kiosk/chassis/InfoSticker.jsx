// 하단 받침대 안내 스티커 (FIX-H) — 파란/검정 톤 사각 패널 + 상담 안내 소형 텍스트. 장식용.
import { chassisColors } from '../../../tokens.js'

function InfoSticker() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-0.5 rounded-md px-4 py-2"
      style={{
        backgroundColor: chassisColors.stickerBlue,
        border: '1px solid rgba(255,255,255,0.2)',
      }}
    >
      <span className="text-[10px] leading-none" style={{ color: chassisColors.labelText }}>
        무인민원발급기 상담
      </span>
      <span
        className="text-[13px] font-bold leading-none tabular-nums"
        style={{ color: chassisColors.labelText }}
      >
        1577-XXXX
      </span>
    </div>
  )
}

export default InfoSticker
