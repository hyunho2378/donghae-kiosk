// S5 지문 인식 (실제 사진 IMG_7878)
// 다음 버튼 없음. 화면은 안내만(실물처럼) — 실제 진행은 하드웨어 지문인식기 클릭으로(PROMPT 05).
// "잘못된 위치"의 빨간색은 키오스크 팔레트에 없어 유일한 빨강 토큰인 dash-status-stuck 재사용.

import { Fingerprint, Check, X } from 'lucide-react'
import KioskTopBar from '../KioskTopBar.jsx'
import { iconSize } from '../../../tokens.js'

function PositionSample({ label, tone, icon }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`flex h-24 w-24 items-center justify-center rounded-full border-2 ${tone}`}
      >
        <Fingerprint size={iconSize.lg} />
        {icon}
      </div>
      <span className="text-kiosk-body text-kiosk-gray-text">{label}</span>
    </div>
  )
}

function S5_Fingerprint({ onBack, onHome }) {
  return (
    <div className="flex h-full flex-col bg-kiosk-white">
      <KioskTopBar title="지문 인식" showBack onBack={onBack} onHome={onHome} />
      <div className="flex min-h-0 flex-1 flex-col items-center px-6 py-6">
        {/* 스텝 표시 배지 (장식) */}
        <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-kiosk-blue-primary text-kiosk-keypad text-kiosk-white">
          8
        </span>

        {/* 올바른 / 잘못된 위치 */}
        <div className="mb-6 flex gap-8">
          <PositionSample
            label="올바른 위치"
            tone="border-kiosk-alert-blue text-kiosk-alert-blue"
            icon={<Check size={iconSize.sm} className="text-kiosk-alert-blue" />}
          />
          <PositionSample
            label="잘못된 위치"
            tone="border-dash-status-stuck text-dash-status-stuck"
            icon={<X size={iconSize.sm} className="text-dash-status-stuck" />}
          />
        </div>

        <p className="mb-6 text-center text-kiosk-body text-kiosk-gray-text">
          입김을 불어 중앙 그림과 같이 지문이 중앙상단에 오도록 엄지손가락을 지문인식기에 대어
          주십시오.
        </p>

        {/* 지문 스캐너 안내 그래픽 (클릭 요소 아님, 실물 지문인식기는 기기 우측 하드웨어) */}
        <div className="flex h-32 w-full max-w-[280px] flex-col items-center justify-center gap-2 rounded-kiosk-button border-2 border-kiosk-blue-primary bg-kiosk-blue-light text-kiosk-blue-primary">
          <Fingerprint size={iconSize.xl} />
          <span className="text-kiosk-body">지문인식기에 대어 주십시오</span>
        </div>
      </div>
    </div>
  )
}

export default S5_Fingerprint
