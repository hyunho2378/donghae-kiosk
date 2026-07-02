// 키오스크 공통 버튼 (DESIGN.md: 실물 재현, 아웃라인 스타일, radius 4px)
// variant: 'outline'(기본, 흰 배경 + 테두리) | 'primary'(kiosk-blue-primary 채움)

function KioskButton({ children, onClick, variant = 'outline', disabled = false, className = '' }) {
  // 좌측 키오스크: hover 강조 없음(FIX-A). focus-visible 아웃라인만 유지.
  const base =
    'rounded-kiosk-button text-kiosk-button px-4 py-3 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-kiosk-blue-primary'

  const variants = {
    outline: 'bg-kiosk-white border border-kiosk-gray-border text-kiosk-navy-header',
    primary: 'bg-kiosk-blue-primary text-kiosk-white border border-kiosk-blue-primary',
    disabled: 'bg-kiosk-blue-light border border-kiosk-gray-border text-kiosk-gray-border',
  }

  const style = disabled ? variants.disabled : variants[variant]

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${base} ${style} ${disabled ? 'cursor-default' : 'cursor-pointer'} ${className}`}
    >
      {children}
    </button>
  )
}

export default KioskButton
