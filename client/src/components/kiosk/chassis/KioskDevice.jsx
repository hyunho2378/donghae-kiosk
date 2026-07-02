// 키오스크 기기 전체 조립 (금속 몸체 = 상단부 + 하단부, 세로로 긴 고정 크기)
// 상단부: 스크린 컬럼(검정 베젤) + 하드웨어 컬럼. 하단부: 증명서 출구 / 시각장애인키보드 / 거스름돈.
// 카메라(KioskCamera)가 이 컨테이너를 scale하여 줌인/줌아웃한다.
import { chassisColors, layout } from '../../../tokens.js'
import KioskFrame from '../KioskFrame.jsx'
import RedButton from './RedButton.jsx'
import GlossPanel from './GlossPanel.jsx'
import PaymentModule from './PaymentModule.jsx'
import FingerprintScanner from './FingerprintScanner.jsx'
import CardReader from './CardReader.jsx'
import EarphoneJack from './EarphoneJack.jsx'
import ReceiptSlot from './ReceiptSlot.jsx'
import CertificateOutlet from './CertificateOutlet.jsx'
import AccessibilityKeypad from './AccessibilityKeypad.jsx'
import ChangeTray from './ChangeTray.jsx'

function KioskDevice({
  children,
  fingerprintActive,
  onFingerprint,
  fingerprintHighlight,
  issuePhase,
  onPaperClick,
  mainScreen = false,
}) {
  return (
    <div
      className="flex flex-col"
      style={{
        width: layout.leftPanelWidth,
        height: layout.deviceTopHeight + layout.deviceBottomHeight,
        backgroundColor: chassisColors.bodyBottom, // 빈틈이 흰 배경으로 새지 않게 차콜 베이스
      }}
    >
      {/* ── 상단부 (금속 몸체) ── */}
      <div
        className="flex gap-4 p-4"
        style={{
          height: layout.deviceTopHeight,
          background: `linear-gradient(180deg, ${chassisColors.bodyLight} 0%, ${chassisColors.bodyDark} 50%, ${chassisColors.bodyLight} 100%)`,
        }}
      >
        {/* 스크린 컬럼 (약 70%) */}
        <div className="flex w-[700px] shrink-0 items-center justify-center">
          <KioskFrame mainScreen={mainScreen}>{children}</KioskFrame>
        </div>

        {/* 하드웨어 컬럼 (약 30%, 실물 순서) */}
        <div className="flex flex-1 flex-col items-center gap-3 pt-2">
          <RedButton />
          <GlossPanel />
          <PaymentModule />
          <div className="mt-1 flex w-full items-start gap-2">
            <div className="flex-1">
              <FingerprintScanner
                active={fingerprintActive}
                onScanComplete={onFingerprint}
                highlight={fingerprintHighlight}
              />
            </div>
            <div className="flex-1">
              <CardReader />
            </div>
          </div>
          <EarphoneJack />
          <ReceiptSlot />
        </div>
      </div>

      {/* ── 하단부 (어두운 차콜, 상단 회색부와 경계 seam) ── */}
      <div
        className="flex gap-6 p-6"
        style={{
          height: layout.deviceBottomHeight,
          backgroundColor: chassisColors.bodyBottom,
          borderTop: '2px solid rgba(0,0,0,0.35)',
        }}
      >
        {/* 증명서 나오는 곳 (좌측) */}
        <div className="flex-1">
          <CertificateOutlet issuePhase={issuePhase} onPaperClick={onPaperClick} />
        </div>

        {/* 시각장애인키보드(위) + 거스름돈(아래) (우측) */}
        <div className="flex flex-1 flex-col gap-6">
          <AccessibilityKeypad />
          <ChangeTray />
        </div>
      </div>
    </div>
  )
}

export default KioskDevice
