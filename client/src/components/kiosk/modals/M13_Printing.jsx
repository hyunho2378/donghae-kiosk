// M13 인쇄중 (S12 위). timing.modalPrinting 후 S1로 리셋.

import { useEffect } from 'react'
import { Printer } from 'lucide-react'
import KioskModal from '../shared/KioskModal.jsx'
import { iconSize, timing } from '../../../tokens.js'

function M13_Printing({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, timing.modalPrinting)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <KioskModal>
      <div className="flex flex-col items-center gap-6">
        <span className="rounded-kiosk-button bg-kiosk-blue-primary px-4 py-2 text-kiosk-button text-kiosk-white">
          인쇄중
        </span>
        <p className="text-kiosk-body text-kiosk-gray-text">잠시만 기다려주십시오</p>
        <Printer size={iconSize.xl} className="animate-pulse text-kiosk-blue-primary" />
        <div className="flex flex-col gap-1">
          <p className="text-kiosk-body text-kiosk-gray-text">서식생성 중..</p>
          <p className="text-kiosk-body text-kiosk-gray-text">잠시만 기다려주세요.</p>
        </div>
      </div>
    </KioskModal>
  )
}

export default M13_Printing
