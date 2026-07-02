// 키오스크 상단바 (COMPONENTS.md: 이전 / 다음 / 홈 아이콘 + 화면 타이틀)
// 실물 기준(FIX-A): 거의 검정 회색 헤더바(kiosk-header-bar).
// 레이아웃: [이전][다음] 좌측에 작게 나란히 ... 타이틀(절대 중앙, 흰색) ... [홈] 우측.
// hover 강조 없음(실물 키오스크엔 hover 없음). focus-visible 아웃라인은 유지.

import { ChevronLeft, ChevronRight, Home } from 'lucide-react'
import { iconSize } from '../../tokens.js'
import { HELP_RING_CLASS } from '../../data/helpHints.js'

// 작은 헤더 버튼 공통 스타일 (연한 회색 배경, 테두리 최소, 라운드 약간, 작은 폰트)
const HEADER_BTN =
  'flex items-center gap-0.5 rounded-kiosk-button px-2 py-1 text-dash-small focus-visible:outline focus-visible:outline-2 focus-visible:outline-kiosk-white'

// FIX-A(6): 이전/다음은 항상 활성 외형(비활성 회색 없음). 조건 미충족 시 전환 안 되는 로직은
// 화면 쪽 onNext에서 처리한다(외형과 동작 분리).
function KioskTopBar({
  title,
  showBack = false,
  onBack,
  showNext = false,
  onNext,
  onHome,
  highlightNext = false,
}) {
  return (
    <div className="relative flex items-center bg-kiosk-header-bar px-3 py-2">
      {/* 좌측 그룹: 이전 + 다음 (나란히, 작게) */}
      <div className="flex items-center gap-1">
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            className={`${HEADER_BTN} cursor-pointer bg-kiosk-gray-border text-kiosk-gray-text`}
          >
            <ChevronLeft size={iconSize.xs} />
            이전
          </button>
        )}
        {showNext && (
          <button
            type="button"
            onClick={onNext}
            className={`${HEADER_BTN} cursor-pointer bg-kiosk-gray-border text-kiosk-gray-text ${
              highlightNext ? HELP_RING_CLASS : ''
            }`}
          >
            다음
            <ChevronRight size={iconSize.xs} />
          </button>
        )}
      </div>

      {/* 가운데: 화면 타이틀 (절대 중앙) */}
      <h1 className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-kiosk-title text-kiosk-white">
        {title}
      </h1>

      {/* 우측: 홈 */}
      <button
        type="button"
        onClick={onHome}
        aria-label="처음으로"
        className={`${HEADER_BTN} ml-auto cursor-pointer bg-kiosk-gray-border text-kiosk-gray-text`}
      >
        <Home size={iconSize.xs} />
      </button>
    </div>
  )
}

export default KioskTopBar
