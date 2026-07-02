// 스크린 베젤 (PROMPT 05: 두꺼운 검정 베젤 + 큰 라운드)
// - 최대 높이 920px, 3:4 비율 → 폭 690px (tailwind w-device-frame / h-device-frame)
// - 검정 베젤(kiosk-black-frame) 20px 패딩 + radius 28px 안에 현재 화면을 렌더
// - 상단 고정 검정 바: 실제 사진의 잘린 상단 문구(도움말 티커) 재현
// - mainScreen(S1)일 때만 실물 재현 티커 바(재생/정지 + 안내 + 29/시간연장). 다른 화면은 기존 간단 바 그대로. (FIX-F)

import { Play, Pause } from 'lucide-react'
import { iconSize } from '../../tokens.js'

// S1 티커 바 장식 알약(흰 테두리, 투명 배경, 흰 글자). 순수 장식이라 span(클릭 무반응).
function TickerPill({ children }) {
  return (
    <span className="flex items-center gap-1 whitespace-nowrap rounded-full border border-kiosk-white px-2 py-0.5 text-dash-small text-kiosk-white">
      {children}
    </span>
  )
}

// S1 실물 재현 티커 바: 좌(재생/정지) · 중앙(안내 스크롤 텍스트) · 우(29 + 시간연장)
function MainTickerBar() {
  return (
    <div className="flex items-center gap-3 bg-kiosk-main-bar px-4 py-2 text-kiosk-white">
      <div className="flex items-center gap-1.5">
        <TickerPill>
          <Play size={iconSize.xs} />
          재생
        </TickerPill>
        <TickerPill>
          <Pause size={iconSize.xs} />
          정지
        </TickerPill>
      </div>
      <span className="min-w-0 flex-1 truncate text-center text-dash-small text-kiosk-white opacity-90">
        관련 : 무인발급기 이용이 어렵다면 033-
      </span>
      <div className="flex items-center gap-1.5">
        <span className="text-dash-small tabular-nums text-kiosk-white">29</span>
        <TickerPill>시간연장</TickerPill>
      </div>
    </div>
  )
}

function KioskFrame({ children, mainScreen = false }) {
  return (
    <div className="h-device-frame w-device-frame overflow-hidden rounded-[28px] bg-kiosk-black-frame p-5">
      <div className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-kiosk-white">
        {/* 상단 상태 티커 바 */}
        {mainScreen ? (
          <MainTickerBar />
        ) : (
          <div className="flex items-center gap-4 bg-kiosk-black-frame px-4 py-2 text-kiosk-white">
            <span className="text-dash-small opacity-80">재생</span>
            <span className="truncate text-dash-small opacity-80">
              관련 : 무인발급기 이용이 어렵다면 033-
            </span>
          </div>
        )}

        {/* 현재 화면 (모달 오버레이 기준점) */}
        <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  )
}

export default KioskFrame
