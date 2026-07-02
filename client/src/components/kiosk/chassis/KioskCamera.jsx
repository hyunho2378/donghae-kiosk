// 카메라(줌) 래퍼 — 기기 전체(세로로 긴 KioskDevice)를 좌측 영역에 담고 줌인/줌아웃 연출.
// view 'screen'(줌인, 상단부가 영역을 채움) / 'full'(줌아웃, 기기 전체가 높이 안에 들어옴)
// scale 예외: 최상위 뷰포트 fit + 이 카메라 연출 두 곳만 허용(DESIGN.md 명시).
import { chassisColors, layout } from '../../../tokens.js'

// 카메라 가시 높이 = 좌측 영역 - 컨트롤 바(44px). 이 높이에 맞춰 스케일 계산(기기 잘림 방지).
const CAMERA_HEIGHT = layout.kioskPanelHeight - layout.controlBarHeight
const DEVICE_FULL_HEIGHT = layout.deviceTopHeight + layout.deviceBottomHeight
const SCREEN_SCALE = CAMERA_HEIGHT / layout.deviceTopHeight // 줌인: 상단부가 가득
const FULL_SCALE = (CAMERA_HEIGHT * 0.95) / DEVICE_FULL_HEIGHT // 줌아웃: 기기 전체가 가용 높이의 약 95%

function KioskCamera({ view, children }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ backgroundColor: chassisColors.bodyBottom }}
    >
      <div
        style={{
          transform: `scale(${view === 'full' ? FULL_SCALE : SCREEN_SCALE})`,
          transformOrigin: 'top center',
          transition: 'transform 0.9s ease-in-out',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default KioskCamera
