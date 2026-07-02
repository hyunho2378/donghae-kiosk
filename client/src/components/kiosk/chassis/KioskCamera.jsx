// 카메라(줌) 래퍼 — 기기 전체(세로로 긴 KioskDevice)를 좌측 영역에 담고 줌인/줌아웃 연출.
// view 'screen'(줌인, 상단부가 영역을 채움) / 'full'(줌아웃, 기기 전체가 높이 안에 들어옴)
// scale 예외: 최상위 뷰포트 fit + 이 카메라 연출 두 곳만 허용(DESIGN.md 명시).
import { chassisColors, layout, timing } from '../../../tokens.js'

// 카메라 가시 영역 = 좌측 폭 x (높이-컨트롤 바 44px).
const CAMERA_HEIGHT = layout.kioskPanelHeight - layout.controlBarHeight
const DEVICE_FULL_HEIGHT = layout.deviceTopHeight + layout.deviceBottomHeight
// 줌인: 상단부가 가용 높이를 채움. deviceTopHeight=CAMERA_HEIGHT라 배율 1 → 폭도 꽉 참(검정 여백 최소).
const SCREEN_SCALE = CAMERA_HEIGHT / layout.deviceTopHeight
// 줌아웃: 기기 전체가 가용 높이의 약 98%.
const FULL_SCALE = (CAMERA_HEIGHT * 0.98) / DEVICE_FULL_HEIGHT

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
          transition: `transform ${timing.cameraMs}ms ease-in-out`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default KioskCamera
