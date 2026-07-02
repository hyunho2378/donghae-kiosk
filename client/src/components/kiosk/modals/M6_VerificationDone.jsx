// M6 본인확인 완료 (S5→S7 사이). timing.modalVerificationDone 후 자동 전환.

import { useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import KioskModal from '../shared/KioskModal.jsx'
import { iconSize, timing } from '../../../tokens.js'

function M6_VerificationDone({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, timing.modalVerificationDone)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <KioskModal>
      <div className="flex flex-col items-center gap-6">
        <p className="text-kiosk-title text-kiosk-navy-header">알림</p>
        <CheckCircle size={iconSize.xl} className="text-kiosk-alert-blue" />
        <p className="text-kiosk-body text-kiosk-gray-text">본인확인을 마쳤습니다.</p>
      </div>
    </KioskModal>
  )
}

export default M6_VerificationDone
