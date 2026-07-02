// 카메라(줌) 래퍼 — 기기 전체(세로로 긴 KioskDevice)를 좌측 영역에 담고 줌인/줌아웃 연출.
// view 'screen'(줌인, 본체 + 증명서/지문 띠까지) / 'fingerprint'(S5 전용 중간 줌, 지문 띠 아래 여백 확보) / 'full'(줌아웃, 기기 전체)
// scale 예외: 최상위 뷰포트 fit + 이 카메라 연출 두 곳만 허용(DESIGN.md 명시).
import { colors, layout, timing } from '../../../tokens.js'

// 카메라 가시 영역 = 좌측 폭 x (높이-컨트롤 바 44px).
const CAMERA_HEIGHT = layout.kioskPanelHeight - layout.controlBarHeight
// 기기 자연 전체 높이: 캐노피 + 본체 + 증명서/지문 띠 + 은색 받침대.
const DEVICE_FULL_HEIGHT =
  layout.canopyHeight + layout.deviceTopHeight + layout.bandHeight + layout.baseHeight
// 줌인 프레임(FIX-H): 캐노피 + 본체 + 증명서/지문 띠까지 포함해야 S5 지문확인이 화면에 보인다.
const ZOOMIN_HEIGHT = layout.canopyHeight + layout.deviceTopHeight + layout.bandHeight
// 줌인: 위 범위가 가용 높이를 채우도록 스케일(좌우 여백은 밝은 stage-bg라 검정 몸체 실루엣이 또렷이 구분됨 — FIX-I).
const SCREEN_SCALE = CAMERA_HEIGHT / ZOOMIN_HEIGHT
// S5 전용(FIX-J): 줌인 범위 + 띠 아래 여백 100px → 지문확인 하드웨어가 화면 하단 끝에 붙지 않고 넉넉히 보임.
const FINGERPRINT_HEIGHT = ZOOMIN_HEIGHT + 100
const FINGERPRINT_SCALE = CAMERA_HEIGHT / FINGERPRINT_HEIGHT
// 줌아웃: 기기 전체가 가용 높이의 약 98%.
const FULL_SCALE = (CAMERA_HEIGHT * 0.98) / DEVICE_FULL_HEIGHT

const SCALE_BY_VIEW = { full: FULL_SCALE, fingerprint: FINGERPRINT_SCALE, screen: SCREEN_SCALE }

// 모바일(PROMPT 10): 스케일은 폭 기준 고정(기기가 화면 폭을 꽉 채움). view는 스케일이 아니라 크롭 높이만 바꿔
// 줌인(스크린+하드웨어+띠)→줌아웃(하단 받침대까지 세로로 반개)을 연출한다. 데스크톱 경로는 그대로.
const DEVICE_WIDTH = layout.leftPanelWidth
const CROP_BY_VIEW = { full: DEVICE_FULL_HEIGHT, fingerprint: FINGERPRINT_HEIGHT, screen: ZOOMIN_HEIGHT }

function KioskCamera({ view, children, mobile = false, availWidth = 0 }) {
  if (mobile) {
    const scale = availWidth / DEVICE_WIDTH
    const cropHeight = (CROP_BY_VIEW[view] ?? ZOOMIN_HEIGHT) * scale
    return (
      <div
        className="relative shrink-0 overflow-hidden"
        style={{
          width: availWidth,
          height: cropHeight,
          backgroundColor: colors.kiosk['stage-bg'],
          transition: `height ${timing.cameraMs}ms ease-in-out`,
        }}
      >
        <div style={{ width: DEVICE_WIDTH, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ backgroundColor: colors.kiosk['stage-bg'] }}
    >
      <div
        style={{
          transform: `scale(${SCALE_BY_VIEW[view] ?? SCREEN_SCALE})`,
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
