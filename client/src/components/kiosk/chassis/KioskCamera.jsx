// 카메라(줌) 래퍼 — 기기 전체(세로로 긴 KioskDevice)를 좌측 영역에 담고 줌인/줌아웃 연출.
// view 'screen'(줌인, 본체 + 증명서/지문 띠까지) / 'full'(줌아웃, 기기 전체가 높이 안에 들어옴)
// scale 예외: 최상위 뷰포트 fit + 이 카메라 연출 두 곳만 허용(DESIGN.md 명시).
import { chassisColors, layout, timing } from '../../../tokens.js'

// 카메라 가시 영역 = 좌측 폭 x (높이-컨트롤 바 44px).
const CAMERA_HEIGHT = layout.kioskPanelHeight - layout.controlBarHeight
// 기기 자연 전체 높이: 캐노피 + 본체 + 증명서/지문 띠 + 은색 받침대.
const DEVICE_FULL_HEIGHT =
  layout.canopyHeight + layout.deviceTopHeight + layout.bandHeight + layout.baseHeight
// 줌인 프레임(FIX-H): 캐노피 + 본체 + 증명서/지문 띠까지 포함해야 S5 지문확인이 화면에 보인다.
const ZOOMIN_HEIGHT = layout.canopyHeight + layout.deviceTopHeight + layout.bandHeight
// 줌인: 위 범위가 가용 높이를 채우도록 스케일(폭은 검정 몸체와 배경이 같아 여백이 자연스레 묻힌다).
const SCREEN_SCALE = CAMERA_HEIGHT / ZOOMIN_HEIGHT
// 줌아웃: 기기 전체가 가용 높이의 약 98%.
const FULL_SCALE = (CAMERA_HEIGHT * 0.98) / DEVICE_FULL_HEIGHT

function KioskCamera({ view, children }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ backgroundColor: chassisColors.bodyMain }}
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
