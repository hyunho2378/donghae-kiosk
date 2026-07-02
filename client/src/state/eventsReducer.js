// 대시보드 이벤트 목록 리듀서 (IA.md "대시보드 영역", "막힘 판정 로직")
// - 더미 이벤트 위에 실제 세션 이벤트 1개가 얹힌다.
// - activeEventId: 현재 틱으로 갱신되는 실제 이벤트 (S3 진입 시 생성, 완료 시 해제)

import { dummyEvents } from '../data/dummyEvents.js'
import { stuckThresholdMs } from '../tokens.js'

export const initialEventsState = {
  events: dummyEvents,
  selectedId: null,
  activeEventId: null,
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

    // 매초 경과 시간 갱신 + 8초 넘으면 진행중 → 막힘 (완료 이벤트는 갱신 안 함)
    case 'TICK': {
      return {
        ...state,
        events: state.events.map((e) => {
          if (e.id !== state.activeEventId || e.status === 'done') return e
          const elapsedMs = action.now - e.enteredAt
          const status =
            e.status === 'progress' && elapsedMs >= stuckThresholdMs ? 'stuck' : e.status
          return { ...e, elapsedMs, status }
        }),
      }
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
