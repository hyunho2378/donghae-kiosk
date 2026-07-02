// S4 인증 방법 선택 (실제 사진 IMG_7876)
// 지문 카드만 클릭 가능 → S5. 모바일 신분증은 동일하게 렌더하되 무반응(S1 원칙).

import { Fingerprint, Smartphone, ArrowRight } from 'lucide-react'
import KioskTopBar from '../KioskTopBar.jsx'
import { iconSize } from '../../../tokens.js'
import { HELP_RING_CLASS } from '../../../data/helpHints.js'

function AuthCard({ icon, label, onClick, highlight = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 flex-col items-center gap-4 rounded-kiosk-button border border-kiosk-gray-border bg-kiosk-white px-6 py-8 text-kiosk-navy-header focus-visible:outline focus-visible:outline-2 focus-visible:outline-kiosk-blue-primary ${
        highlight ? HELP_RING_CLASS : ''
      }`}
    >
      {icon}
      <span className="text-kiosk-button">{label}</span>
      <ArrowRight size={iconSize.md} className="text-kiosk-blue-primary" />
    </button>
  )
}

function S4_AuthMethod({ onFingerprint, onBack, onHome, highlight = false }) {
  return (
    <div className="flex h-full flex-col bg-kiosk-white">
      <KioskTopBar title="인증 방법 선택" showBack onBack={onBack} onHome={onHome} />
      <div className="flex min-h-0 flex-1 flex-col px-6 py-8">
        <p className="mb-8 text-center text-kiosk-body font-semibold text-kiosk-blue-primary underline">
          증명서 발급을 위한 인증 방법을 선택하여 주십시오.
        </p>
        <div className="flex gap-4">
          <AuthCard
            icon={<Fingerprint size={iconSize.xl} className="text-kiosk-blue-primary" />}
            label="지문"
            onClick={onFingerprint}
            highlight={highlight}
          />
          {/* 모바일 신분증: 무반응 (onClick 없음) */}
          <AuthCard
            icon={<Smartphone size={iconSize.xl} className="text-kiosk-blue-primary" />}
            label="모바일 신분증"
          />
        </div>
      </div>
    </div>
  )
}

export default S4_AuthMethod
