import { useReducer, useEffect, useRef, useCallback, useState } from 'react'
import { sessionReducer, initialSessionState } from './state/sessionReducer.js'
import { eventsReducer, initialEventsState } from './state/eventsReducer.js'
import { modeReducer, initialModeState } from './state/modeReducer.js'
import { layout, timing } from './tokens.js'
import { helpHints } from './data/helpHints.js'
import KioskDevice from './components/kiosk/chassis/KioskDevice.jsx'
import KioskCamera from './components/kiosk/chassis/KioskCamera.jsx'
import PaperReceiveOverlay from './components/kiosk/chassis/PaperReceiveOverlay.jsx'
import ModeControlBar from './components/controls/ModeControlBar.jsx'
import HelpOverlay from './components/controls/HelpOverlay.jsx'
import TimeoutWarning from './components/controls/TimeoutWarning.jsx'
import S1_MainMenu from './components/kiosk/screens/S1_MainMenu.jsx'
import S3_IdInput from './components/kiosk/screens/S3_IdInput.jsx'
import S4_AuthMethod from './components/kiosk/screens/S4_AuthMethod.jsx'
import S5_Fingerprint from './components/kiosk/screens/S5_Fingerprint.jsx'
import S7_EduOfficeSelect from './components/kiosk/screens/S7_EduOfficeSelect.jsx'
import S8_SchoolNameInput from './components/kiosk/screens/S8_SchoolNameInput.jsx'
import S9_SchoolSelect from './components/kiosk/screens/S9_SchoolSelect.jsx'
import S10_PrivacySelect from './components/kiosk/screens/S10_PrivacySelect.jsx'
import S11_CopiesInput from './components/kiosk/screens/S11_CopiesInput.jsx'
import S12_FeeAndIssue from './components/kiosk/screens/S12_FeeAndIssue.jsx'
import M2_ServerConnecting from './components/kiosk/modals/M2_ServerConnecting.jsx'
import M6_VerificationDone from './components/kiosk/modals/M6_VerificationDone.jsx'
import M13_Printing from './components/kiosk/modals/M13_Printing.jsx'
import DashboardPanel from './components/dashboard/DashboardPanel.jsx'
import AIPanel from './components/ai-panel/AIPanel.jsx'

// 화면 ID → 대시보드 단계명 (S12는 AI 목업 screenLabel과 동일하게 "수수료 투입 및 발급")
const SCREEN_LABELS = {
  S3: '주민등록번호 입력',
  S4: '인증 방법 선택',
  S5: '지문 인식',
  S7: '시·도교육청 선택',
  S8: '학교명 입력',
  S9: '학교 선택',
  S10: '주민등록번호 공시여부 선택',
  S11: '부수 입력',
  S12: '수수료 투입 및 발급',
}

// 8초 막힘 판정 대상 페이지 (S3~S12)
const FLOW_STEPS = Object.keys(SCREEN_LABELS)

function App() {
  const [session, dispatch] = useReducer(sessionReducer, initialSessionState)
  const [eventsState, eventsDispatch] = useReducer(eventsReducer, initialEventsState)
  const [mode, modeDispatch] = useReducer(modeReducer, initialModeState)

  const prevStepRef = useRef(session.step)
  const activeEventIdRef = useRef(null)
  const eventCounterRef = useRef(0)
  const idleDeadlineRef = useRef(0)
  const [warnSeconds, setWarnSeconds] = useState(null)

  const selectedEvent =
    eventsState.events.find((e) => e.id === eventsState.selectedId) ?? null

  // 등장한 시니어만(시뮬레이션은 startDelay 지나야 appeared) A→F 순으로 정렬
  const visibleEvents = eventsState.events
    .filter((e) => e.appeared !== false)
    .sort((a, b) => a.avatar.localeCompare(b.avatar))

  // 1600x1000 고정 캔버스를 창 크기에 비율 유지로 축소(scale-to-fit).
  // 개별 UI 요소가 아니라 최상위 데모 뷰포트 스케일이므로 scale() 예외 허용(DESIGN.md 명시).
  const [scale, setScale] = useState(1)
  useEffect(() => {
    function updateScale() {
      setScale(
        Math.min(
          window.innerWidth / layout.viewportWidth,
          window.innerHeight / layout.viewportHeight,
        ),
      )
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  // 세션 화면 전환 → 대시보드 이벤트 동기화 (실제 이벤트 1개를 계속 재사용)
  useEffect(() => {
    const step = session.step
    if (step === prevStepRef.current) return
    prevStepRef.current = step

    if (step === 'S1') {
      eventsDispatch({ type: 'CLEAR_ACTIVE' })
      activeEventIdRef.current = null
      return
    }

    if (!SCREEN_LABELS[step]) return

    if (activeEventIdRef.current == null) {
      // S3 최초 진입 → 새 세션 이벤트 생성
      eventCounterRef.current += 1
      const id = `real-${eventCounterRef.current}`
      activeEventIdRef.current = id
      eventsDispatch({
        type: 'CREATE_EVENT',
        event: {
          id,
          screenId: step,
          screenLabel: SCREEN_LABELS[step],
          enteredAt: Date.now(),
          service: '졸업증명서 발급', // 시니어 A(실제 조작)의 서비스
          avatar: 'A',
        },
      })
    } else {
      // 이후 화면 전환 → 같은 이벤트를 현재 화면으로 갱신(타이머/분석 캐시 초기화)
      eventsDispatch({
        type: 'ADVANCE_SCREEN',
        id: activeEventIdRef.current,
        screenId: step,
        screenLabel: SCREEN_LABELS[step],
        now: Date.now(),
      })
    }
  }, [session.step])

  // 매초 TICK — 상시 구동(시뮬레이션 시니어 B~F는 키오스크와 무관하게 계속 진행).
  // 실제 세션(A)은 리듀서에서 activeEventId일 때만 갱신되므로 상시 틱이어도 안전.
  useEffect(() => {
    const timer = setInterval(() => {
      eventsDispatch({ type: 'TICK', now: Date.now() })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // ── 시간제한 모드(30초 무입력 초기화) — 8초 막힘 판정과 독립 ──
  // 발급 연출 구간(issuePhase !== idle)에는 적용하지 않는다(발표자 통제).
  const timeoutActive =
    mode.timeLimitOn && FLOW_STEPS.includes(session.step) && session.issuePhase === 'idle'

  // 무입력 30초 도달: 이벤트를 막힘으로 보존(경과 고정)한 채 S1 초기화
  const handleIdleTimeout = useCallback(() => {
    if (activeEventIdRef.current != null) {
      eventsDispatch({ type: 'SET_STATUS', id: activeEventIdRef.current, status: 'stuck' })
    }
    dispatch({ type: 'RESET' })
  }, [])

  // 아무 클릭이나 = 활동 → 타이머 리셋 + 경고 숨김
  const registerActivity = useCallback(() => {
    idleDeadlineRef.current = Date.now() + timing.idleResetMs
    setWarnSeconds(null)
  }, [])

  useEffect(() => {
    if (!timeoutActive) {
      setWarnSeconds(null)
      return undefined
    }
    idleDeadlineRef.current = Date.now() + timing.idleResetMs
    setWarnSeconds(null)
    const iv = setInterval(() => {
      const remain = idleDeadlineRef.current - Date.now()
      if (remain <= 0) {
        clearInterval(iv)
        handleIdleTimeout()
      } else if (remain <= 10000) {
        setWarnSeconds(Math.ceil(remain / 1000))
      } else {
        setWarnSeconds(null)
      }
    }, 250)
    return () => clearInterval(iv)
  }, [timeoutActive, session.step, handleIdleTimeout])

  // 모달 자동 dismiss 핸들러 (매초 리렌더로 타이머가 리셋되지 않도록 useCallback으로 고정)
  const handleM2Done = useCallback(() => dispatch({ type: 'DISMISS_MODAL' }), [])
  const handleM6Done = useCallback(() => dispatch({ type: 'DISMISS_MODAL' }), [])

  // M13(인쇄중) 타이머 종료 → 모달 닫고 종이 출력 시작(paperReady). 아직 완료 처리 안 함.
  const handlePrintingDone = useCallback(() => dispatch({ type: 'PRINTING_DONE' }), [])

  // 종이 클릭 → 수령 연출 시작(중앙 이동+확대). 완료 처리는 연출 종료 후.
  const handlePaperClick = useCallback(() => dispatch({ type: 'RECEIVE_START' }), [])

  // 수령 연출 종료(오버레이 onDone) → 이벤트 완료 처리 + 세션 초기화(줌인 복귀)
  const handlePaperReceive = useCallback(() => {
    if (activeEventIdRef.current != null) {
      eventsDispatch({ type: 'SET_STATUS', id: activeEventIdRef.current, status: 'done' })
    }
    dispatch({ type: 'RECEIVE_PAPER' })
  }, [])

  // 컨트롤 바 "시뮬레이터"(홈) = 전체 초기화: A 행 제거 + B~F 시뮬레이션도 startDelay부터 재시작.
  // 세션/발급연출/줌도 초기화. 모드 토글은 유지. (FIX-D: 대시보드는 항상 최대 6행)
  const handleSimulatorReset = useCallback(() => {
    dispatch({ type: 'RESET' })
    eventsDispatch({ type: 'RESET_ALL' })
    activeEventIdRef.current = null
    prevStepRef.current = 'S1'
  }, [])

  const goNext = () => dispatch({ type: 'GO_NEXT' })
  const goBack = () => dispatch({ type: 'GO_BACK' })
  const goHome = () => dispatch({ type: 'GO_HOME' })

  function renderScreen() {
    switch (session.step) {
      case 'S1':
        return (
          <S1_MainMenu
            onSelectGraduation={() => dispatch({ type: 'SELECT_CERTIFICATE' })}
            onHome={goHome}
            highlight={mode.helpOn}
          />
        )
      case 'S3':
        return (
          <S3_IdInput
            idNumber={session.idNumber}
            onDigit={(digit) => dispatch({ type: 'INPUT_DIGIT', digit })}
            onDelete={() => dispatch({ type: 'DELETE_DIGIT' })}
            onClear={() => dispatch({ type: 'CLEAR_INPUT' })}
            onNext={goNext}
            onBack={goBack}
            onHome={goHome}
            highlight={mode.helpOn}
          />
        )
      case 'S4':
        return (
          <S4_AuthMethod
            onFingerprint={goNext}
            onBack={goBack}
            onHome={goHome}
            highlight={mode.helpOn}
          />
        )
      case 'S5':
        // 화면은 안내만. 실제 진행은 하드웨어 지문인식기 클릭으로(위 KioskDevice).
        return <S5_Fingerprint onBack={goBack} onHome={goHome} />
      case 'S7':
        return (
          <S7_EduOfficeSelect
            onSelectRegion={goNext}
            onBack={goBack}
            onHome={goHome}
            highlight={mode.helpOn}
          />
        )
      case 'S8':
        return (
          <S8_SchoolNameInput
            onNext={goNext}
            onBack={goBack}
            onHome={goHome}
            highlight={mode.helpOn}
          />
        )
      case 'S9':
        return (
          <S9_SchoolSelect
            onSelectSchool={goNext}
            onBack={goBack}
            onHome={goHome}
            highlight={mode.helpOn}
          />
        )
      case 'S10':
        return (
          <S10_PrivacySelect
            onSelect={goNext}
            onBack={goBack}
            onHome={goHome}
            highlight={mode.helpOn}
          />
        )
      case 'S11':
        return (
          <S11_CopiesInput
            copies={session.copies}
            onSetCopies={(copies) => dispatch({ type: 'SET_COPIES', copies })}
            onNext={goNext}
            onBack={goBack}
            onHome={goHome}
            highlight={mode.helpOn}
          />
        )
      case 'S12':
        return (
          <S12_FeeAndIssue
            copies={session.copies}
            onIssue={() => dispatch({ type: 'ISSUE_START' })}
            onBack={goBack}
            onHome={goHome}
            highlight={mode.helpOn}
          />
        )
      default:
        return null
    }
  }

  function renderModal() {
    switch (session.activeModal) {
      case 'M2':
        return <M2_ServerConnecting onDone={handleM2Done} />
      case 'M6':
        return <M6_VerificationDone onDone={handleM6Done} />
      case 'M13':
        return <M13_Printing onDone={handlePrintingDone} />
      default:
        return null
    }
  }

  return (
    <div
      className="flex h-screen w-screen items-start justify-center overflow-hidden bg-kiosk-black-frame"
      onClick={registerActivity}
    >
      <div
        className="flex bg-kiosk-black-frame"
        style={{
          width: layout.viewportWidth,
          height: layout.viewportHeight,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        {/* 좌측: 데모 컨트롤 바 + 키오스크 기기(카메라 줌) */}
        <div
          className="flex flex-col"
          style={{ width: layout.leftPanelWidth, height: layout.kioskPanelHeight }}
        >
          <ModeControlBar mode={mode} dispatch={modeDispatch} onReset={handleSimulatorReset} />
          <div className="relative min-h-0 flex-1">
            <KioskCamera view={session.issuePhase === 'idle' ? 'screen' : 'full'}>
              <KioskDevice
                fingerprintActive={session.step === 'S5'}
                onFingerprint={() => dispatch({ type: 'SHOW_MODAL', modal: 'M6' })}
                fingerprintHighlight={mode.helpOn && session.step === 'S5'}
                issuePhase={session.issuePhase}
                onPaperClick={handlePaperClick}
                mainScreen={session.step === 'S1'}
              >
                {renderScreen()}
                {renderModal()}
              </KioskDevice>
            </KioskCamera>

            {/* 종이 수령 연출 (좌측 영역 중앙, 카메라 위) */}
            {session.issuePhase === 'receiving' && (
              <PaperReceiveOverlay onDone={handlePaperReceive} />
            )}

            {/* 도움말 말풍선 (기기 밖 오버레이, 발급 연출 중엔 숨김) */}
            {mode.helpOn && session.issuePhase === 'idle' && helpHints[session.step] && (
              <HelpOverlay text={helpHints[session.step].text} />
            )}

            {/* 시간제한 경고 (마지막 10초) */}
            {warnSeconds != null && <TimeoutWarning seconds={warnSeconds} />}
          </div>
        </div>

        {/* 우측: 대시보드(상단) + AI 패널(하단) */}
        <div
          className="flex flex-col"
          style={{ width: layout.rightPanelWidth, height: layout.kioskPanelHeight }}
        >
        <div style={{ height: layout.dashboardHeight }}>
          <DashboardPanel
            events={visibleEvents}
            selectedId={eventsState.selectedId}
            onSelect={(id) => eventsDispatch({ type: 'SELECT_EVENT', id })}
          />
        </div>
          <div
            className="border-t border-dash-border"
            style={{ height: layout.aiPanelHeight }}
          >
            <AIPanel selectedEvent={selectedEvent} dispatch={eventsDispatch} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
