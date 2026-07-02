// M2 서버 접속 중 (S1→S3 사이). timing.modalServerConnecting 후 자동 전환.

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import KioskModal from '../shared/KioskModal.jsx'
import { iconSize, timing } from '../../../tokens.js'

function M2_ServerConnecting({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, timing.modalServerConnecting)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <KioskModal>
      <div className="flex flex-col items-center gap-6">
        <AlertCircle size={iconSize.xl} className="text-kiosk-alert-blue" />
        <p className="text-kiosk-title text-kiosk-gray-text">서버와 접속 중입니다.</p>
        <div className="h-2 w-full overflow-hidden rounded-kiosk-button bg-kiosk-blue-light">
          <div className="h-full w-2/3 animate-pulse rounded-kiosk-button bg-kiosk-blue-primary" />
        </div>
      </div>
    </KioskModal>
  )
}

export default M2_ServerConnecting
