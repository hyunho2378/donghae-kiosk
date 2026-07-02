// S1 메인 카테고리 메뉴 (IA.md / 실제 사진 재현 — FIX-F: 검정 배경 + 흰 글자 + 노랑 타이틀)
// - 증명서 버튼 9개(왼쪽 5 + 오른쪽 4) 2열. 투명 배경 + 흰 테두리 아웃라인.
// - IA.md "S1 클릭 제한": "졸업증명서(국문, 영문), 졸업예정증명서" 버튼만 onClick으로 S3 전환.
//   나머지 8개는 onClick 없음. 회색/비활성/커서 구분 없이 동일하게 렌더(실제 사진에 구분 없음).
// - 상단 티커 바(재생/정지·29/시간연장)는 KioskFrame이 mainScreen일 때 렌더한다.
// - 하단 실물 요소: 처음으로(좌) / 무인민원발급기 워터마크(중앙) / 현금·카드(좌)·휠체어(우).

import { Home, Accessibility } from 'lucide-react'
import { iconSize } from '../../../tokens.js'
import { HELP_RING_CLASS } from '../../../data/helpHints.js'

// 왼쪽 열 5개, 오른쪽 열 4개(+ 마지막에 유일하게 동작하는 졸업증명서)
const LEFT_COLUMN = [
  '검정고시 성적증명서\n(국문, 영문)',
  '검정고시 합격증명서\n(국문, 영문)',
  '성적증명서',
  '학교생활기록부',
  '교육급여 수급자 증명서',
]

const RIGHT_COLUMN = [
  '검정고시 과목합격증명서',
  '제적(정원외관리)증명서',
  '교육비납입증명서',
]

// 유일하게 S3로 전환되는 버튼
const GRADUATION_LABEL = '졸업증명서(국문, 영문),\n졸업예정증명서'

// 증명서 버튼: 투명 배경 + 흰 테두리 1px + radius 8px + 흰 글자, 높이 통일(FIX-A), hover 없음.
// cursor-pointer는 9개 전부 동일(IA.md: 클릭 가능/불가 구분 없이 동일 렌더).
const CERT_BTN_CLASS =
  'flex min-h-[76px] cursor-pointer items-center justify-center whitespace-pre-line rounded-kiosk-card border border-kiosk-white bg-transparent px-4 py-3 text-kiosk-button text-kiosk-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-kiosk-white'

// 흰 테두리 알약(투명 배경 + 흰 글자) — 처음으로/휠체어 공통
const PILL_CLASS =
  'flex items-center gap-2 rounded-full border border-kiosk-white bg-transparent px-4 py-2 text-kiosk-button text-kiosk-white'

function S1_MainMenu({ onSelectGraduation, onHome, highlight = false }) {
  return (
    <div className="flex h-full flex-col bg-kiosk-main-bg px-6 py-6">
      {/* 타이틀 / 안내문 */}
      <h1 className="mb-2 text-center text-kiosk-title text-kiosk-yellow-title">교육제증명 서비스</h1>
      <p className="mb-6 text-center text-kiosk-body text-kiosk-white">
        발급을 원하는 증명서를 선택해 주세요
      </p>

      {/* 증명서 버튼 2열 */}
      <div className="grid w-full grid-cols-2 gap-3">
        <div className="flex flex-col gap-3">
          {LEFT_COLUMN.map((label) => (
            <button type="button" key={label} className={CERT_BTN_CLASS}>
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {RIGHT_COLUMN.map((label) => (
            <button type="button" key={label} className={CERT_BTN_CLASS}>
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={onSelectGraduation}
            className={`${CERT_BTN_CLASS} ${highlight ? HELP_RING_CLASS : ''}`}
          >
            {GRADUATION_LABEL}
          </button>
        </div>
      </div>

      {/* 하단 영역: 처음으로 / 워터마크 / 현금·카드·휠체어 */}
      <div className="mt-6 flex flex-1 flex-col">
        {/* 처음으로 (좌하단) — S1 초기화 동작 유지 */}
        <button type="button" onClick={onHome} className={`${PILL_CLASS} cursor-pointer self-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-kiosk-white`}>
          <Home size={iconSize.sm} />
          처음으로
        </button>

        {/* 무인민원발급기 워터마크 (그리드 아래~하단 라벨 위 공간 중앙, 순수 장식) */}
        <div className="flex flex-1 items-center justify-center">
          <span className="text-kiosk-watermark text-kiosk-white/80">무인민원발급기</span>
        </div>

        {/* 하단 라벨: 좌(현금·카드, 하늘색) / 우(휠체어, 장식용 알약) */}
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-4 text-kiosk-cash text-kiosk-main-accent-blue">
            <span>현금가능</span>
            <span>카드가능</span>
          </div>
          <span className={PILL_CLASS}>
            <Accessibility size={iconSize.sm} />
            휠체어 사용자 보기
          </span>
        </div>
      </div>
    </div>
  )
}

export default S1_MainMenu
