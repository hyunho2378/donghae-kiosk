// 키오스크 기기 전체 조립 (FIX-H: 실물 동해시청 무인민원발급기 — 검정 몸체, 세로로 긴 고정 크기)
// 세로 구성: 캐노피 → 본체(스크린 + 우측 하드웨어 컬럼) → 증명서/지문 띠 → 은색 받침대.
// 카메라(KioskCamera)가 이 컨테이너를 scale하여 줌인(본체+띠)/줌아웃(전체)한다.
import { chassisColors, layout } from '../../../tokens.js'
import KioskFrame from '../KioskFrame.jsx'
import Canopy from './Canopy.jsx'
import MoneyDisplay from './MoneyDisplay.jsx'
import CashInput from './CashInput.jsx'
import ReturnButton from './ReturnButton.jsx'
import CardReader from './CardReader.jsx'
import QRScanner from './QRScanner.jsx'
import CertificateOutlet from './CertificateOutlet.jsx'
import FingerprintScanner from './FingerprintScanner.jsx'
import ReceiptSlot from './ReceiptSlot.jsx'
import InfoSticker from './InfoSticker.jsx'
import AccessibilityKeypad from './AccessibilityKeypad.jsx'
import EarphoneJack from './EarphoneJack.jsx'

function KioskDevice({
  children,
  fingerprintActive,
  onFingerprint,
  fingerprintHighlight,
  issuePhase,
  onPaperClick,
  mainScreen = false,
}) {
  const { bodyMain, bodyGradTop, bodyGradBottom, baseSilver, baseSilverDark } = chassisColors
  return (
    <div
      className="flex flex-col"
      style={{
        width: layout.leftPanelWidth,
        height:
          layout.canopyHeight + layout.deviceTopHeight + layout.bandHeight + layout.baseHeight,
        backgroundColor: bodyMain,
      }}
    >
      {/* ── 상단 캐노피 ── */}
      <Canopy />

      {/* ── 본체 (검정 몸체): 스크린 컬럼 + 우측 하드웨어 컬럼 ── */}
      <div
        className="flex gap-4 p-4"
        style={{
          height: layout.deviceTopHeight,
          background: `linear-gradient(180deg, ${bodyGradTop} 0%, ${bodyMain} 55%, ${bodyGradBottom} 100%)`,
        }}
      >
        {/* 스크린 컬럼 */}
        <div className="flex w-[700px] shrink-0 items-center justify-center">
          <KioskFrame mainScreen={mainScreen}>{children}</KioskFrame>
        </div>

        {/* 우측 하드웨어 컬럼 (위→아래 실물 순서) */}
        <div className="flex flex-1 flex-col items-center justify-between py-6">
          <MoneyDisplay />
          <CashInput />
          <ReturnButton />
          <CardReader />
          <QRScanner />
        </div>
      </div>

      {/* ── 증명서 출구 + 지문확인 띠 (FIX-K: 본체와 같은 컬럼 정렬 — 스크린 폭 안에 나란히) ── */}
      <div
        className="relative z-20 flex gap-4 px-4 pt-3"
        style={{
          height: layout.bandHeight,
          backgroundColor: bodyMain,
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* 스크린 폭(700) 아래: 증명서(좌) + 지문확인(우) — 하단 스크린 확장부처럼 붙여서 */}
        <div className="flex w-[700px] shrink-0 items-start gap-6">
          <div className="flex-1">
            <CertificateOutlet issuePhase={issuePhase} onPaperClick={onPaperClick} />
          </div>
          <FingerprintScanner
            active={fingerprintActive}
            onScanComplete={onFingerprint}
            highlight={fingerprintHighlight}
          />
        </div>
        {/* 우측 하드웨어 컬럼 아래는 비움(증명서/지문이 그쪽을 침범하지 않게) */}
        <div className="flex-1" />
      </div>

      {/* ── 최하단 은색 받침대 ── */}
      <div
        className="relative z-10 flex items-center justify-between gap-6 px-8"
        style={{
          height: layout.baseHeight,
          background: `linear-gradient(180deg, ${baseSilver}, ${baseSilverDark})`,
          borderTop: '2px solid rgba(0,0,0,0.4)',
        }}
      >
        <ReceiptSlot />
        <InfoSticker />
        <AccessibilityKeypad />
        <EarphoneJack />
      </div>
    </div>
  )
}

export default KioskDevice
