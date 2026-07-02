// 스크린 베젤 (PROMPT 05: 두꺼운 검정 베젤 + 큰 라운드)
// - 최대 높이 920px, 3:4 비율 → 폭 690px (tailwind w-device-frame / h-device-frame)
// - 검정 베젤(kiosk-black-frame) 20px 패딩 + radius 28px 안에 현재 화면을 렌더
// - 상단 고정 검정 바: 실제 사진의 잘린 상단 문구(도움말 티커) 재현

function KioskFrame({ children }) {
  return (
    <div className="h-device-frame w-device-frame overflow-hidden rounded-[28px] bg-kiosk-black-frame p-5">
      <div className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-kiosk-white">
        {/* 상단 상태 티커 바 (실제 사진 상단 잘린 문구 재현) */}
        <div className="flex items-center gap-4 bg-kiosk-black-frame px-4 py-2 text-kiosk-white">
          <span className="text-dash-small opacity-80">재생</span>
          <span className="truncate text-dash-small opacity-80">
            관련 : 무인발급기 이용이 어렵다면 033-
          </span>
        </div>

        {/* 현재 화면 (모달 오버레이 기준점) */}
        <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  )
}

export default KioskFrame
