// 대시보드 이벤트 목록 리듀서 (IA.md "대시보드 영역", "막힘 판정 로직")
// - 시니어 A(실제 키오스크 세션) + B~F(시뮬레이션)이 한 목록에 실시간으로.
// - activeEventId: 실제 세션(A) 이벤트. B~F는 kind 'sim'으로 TICK이 스크립트대로 구동.

import { simulatedSeniors } from '../data/simulatedSeniors.js'
import { stuckThresholdMs } from '../tokens.js'

export const initialEventsState = {
  events: simulatedSeniors, // B~F 사전 로드(appeared:false, startDelay 후 등장)
  selectedId: null,
  activeEventId: null,
  demoStartAt: null, // 첫 TICK 시각 → 시뮬레이션 시계 기준점
}

// 시뮬레이션 시니어 1명을 현재 시각(now) 기준으로 한 스텝 전진
function advanceSim(e, now, demoStartAt) {
  // 아직 등장 전
  if (!e.appeared) {
    if (now >= demoStartAt + e.startDelay * 1000) {
      return { ...e, appeared: true, enteredAt: now, elapsedMs: 0, status: 'progress' }
    }
    return e
  }
  if (e.status === 'done') return e

  const dwell = now - e.enteredAt
  const lastIndex = e.steps.length - 1

  // 마지막 단계: 완료 시니어는 이미 done 처리됨. 막힘 시니어는 8초 후 막힘(계속 카운트).
  if (e.stepIndex >= lastIndex) {
    const status = e.outcome === '막힘' && dwell >= stuckThresholdMs ? 'stuck' : e.status
    return { ...e, elapsedMs: dwell, status }
  }

  // 중간 단계: timeline 체류 시간 경과 시 다음 단계로
  const stepDwellMs = e.timeline[e.stepIndex] * 1000
  if (dwell >= stepDwellMs) {
    const nextIndex = e.stepIndex + 1
    const nextStep = e.steps[nextIndex]
    const reachedTerminal = nextIndex === lastIndex
    // 완료 시니어가 마지막 '발급 완료' 단계 도달 → 완료(경과 고정)
    if (reachedTerminal && e.outcome === '완료') {
      return {
        ...e,
        stepIndex: nextIndex,
        screenId: nextStep.key,
        screenLabel: nextStep.label,
        status: 'done',
        elapsedMs: dwell, // 마지막 단계 체류값으로 고정
      }
    }
    return {
      ...e,
      stepIndex: nextIndex,
      screenId: nextStep.key,
      screenLabel: nextStep.label,
      status: 'progress',
      enteredAt: now,
      elapsedMs: 0,
      analysisStatus: 'idle',
      analysis: null,
    }
  }
  return { ...e, elapsedMs: dwell }
}

export function eventsReducer(state, action) {
  switch (action.type) {
    // 화면 진입 시 실제 이벤트 생성 (이미 활성 이벤트가 있으면 중복 생성 방지)
    case 'CREATE_EVENT': {
      if (state.activeEventId != null) return state
      const event = {
        ...action.event,
        kind: 'real',
        status: 'progress',
        elapsedMs: 0,
        analysisStatus: 'idle',
        analysis: null,
      }
      return { ...state, events: [...state.events, event], activeEventId: event.id }
    }

    // 화면 전환 시 같은 이벤트를 새 화면으로 갱신: 8초 타이머 재시작 + 분석 캐시 초기화
    // (새 행을 만들지 않고 실제 이벤트 1개를 계속 재사용)
    case 'ADVANCE_SCREEN': {
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.id
            ? {
                ...e,
                screenId: action.screenId,
                screenLabel: action.screenLabel,
                enteredAt: action.now,
                elapsedMs: 0,
                status: 'progress',
                analysisStatus: 'idle',
                analysis: null,
              }
            : e,
        ),
      }
    }

    // 매초: 실제 세션(A) 경과 갱신 + 8초 막힘 판정 / 시뮬레이션 시니어(B~F) 스크립트 전진
    case 'TICK': {
      const now = action.now
      const demoStartAt = state.demoStartAt ?? now
      const events = state.events.map((e) => {
        if (e.kind === 'sim') return advanceSim(e, now, demoStartAt)
        // 실제 세션(A): 활성 이벤트만, 완료는 갱신 안 함
        if (e.id !== state.activeEventId || e.status === 'done') return e
        const elapsedMs = now - e.enteredAt
        const status = e.status === 'progress' && elapsedMs >= stuckThresholdMs ? 'stuck' : e.status
        return { ...e, elapsedMs, status }
      })
      return { ...state, events, demoStartAt }
    }

    // 상태 강제 지정 (다음 클릭 시 완료). 완료된 실제 이벤트는 더 이상 틱 대상 아님.
    case 'SET_STATUS': {
      const events = state.events.map((e) =>
        e.id === action.id ? { ...e, status: action.status } : e,
      )
      const activeEventId =
        action.id === state.activeEventId && action.status === 'done'
          ? null
          : state.activeEventId
      return { ...state, events, activeEventId }
    }

    // AI 분석 요청 시작 → 로딩
    case 'REQUEST_ANALYSIS':
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.id ? { ...e, analysisStatus: 'loading' } : e,
        ),
      }

    // AI 분석 응답 도착 → 완료 + 캐시 저장
    case 'RECEIVE_ANALYSIS':
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.id ? { ...e, analysisStatus: 'done', analysis: action.analysis } : e,
        ),
      }

    // 항목 선택
    case 'SELECT_EVENT':
      return { ...state, selectedId: action.id }

    // 세션 이탈(처음으로/S1 복귀) 시 활성 이벤트 해제 → 다음 진입 때 새 이벤트 생성
    case 'CLEAR_ACTIVE':
      return { ...state, activeEventId: null }

    default:
      return state
  }
}
