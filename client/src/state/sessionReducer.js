// 키오스크 세션 상태머신 (IA.md "키오스크 영역 — 13개 화면 상태" 그대로).
//
// 페이지 상태 10개: S1, S3, S4, S5, S7, S8, S9, S10, S11, S12
// 모달 상태 3개(오버레이): M2(서버접속중), M6(본인확인완료), M13(인쇄중)
//   → 페이지 위에 뜨는 오버레이이므로 step이 아니라 activeModal 플래그로 표현한다.
//
// IA.md 상태머신 다이어그램:
//   S1 --(증명서 선택)--> [M2] --(자동)--> S3
//   S3 --(다음)--> S4 --(지문)--> S5 --(지문인식)--> [M6] --(자동)--> S7
//   S7 --(지역)--> S8 --(다음)--> S9 --(학교)--> S10 --(공개/비공개)--> S11 --(다음)--> S12
//   S12 --(발급)--> [M13] --(자동)--> S1 (초기화)
//
// 모달은 현재 step 위에 얹히고, DISMISS_MODAL 시 다음 페이지로 전환된다.

// 이전/다음 버튼이 이동하는 선형 페이지 순서(모달 제외)
export const PAGE_ORDER = ['S1', 'S3', 'S4', 'S5', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12']

export const initialSessionState = {
  step: 'S1', // 현재 페이지 상태
  activeModal: null, // null | 'M2' | 'M6' | 'M13'
  idNumber: '', // S3 주민등록번호 최대 13자리 누적
  copies: 1, // S11 발급 부수 (S12에서 표시)
  issuePhase: 'idle', // 발급 연출: 'idle' | 'printing' | 'paperReady' | 'receiving'
}

export function sessionReducer(state, action) {
  switch (action.type) {
    // S1: 졸업증명서 선택 → M2 모달 표시 (자동 dismiss 시 S3)
    case 'SELECT_CERTIFICATE': {
      if (state.step !== 'S1') return state
      return { ...state, activeModal: 'M2', idNumber: '' }
    }

    // S3 숫자 입력 (최대 13자리)
    case 'INPUT_DIGIT': {
      if (state.step !== 'S3' || state.idNumber.length >= 13) return state
      return { ...state, idNumber: state.idNumber + action.digit }
    }

    // S3 삭제: 마지막 한 자리
    case 'DELETE_DIGIT': {
      if (state.step !== 'S3') return state
      return { ...state, idNumber: state.idNumber.slice(0, -1) }
    }

    // S3 정정: 전체 초기화
    case 'CLEAR_INPUT': {
      if (state.step !== 'S3') return state
      return { ...state, idNumber: '' }
    }

    // S11 부수 설정 (1~9, 교체 방식)
    case 'SET_COPIES': {
      if (state.step !== 'S11') return state
      return { ...state, copies: action.copies }
    }

    // 선형 다음 페이지로 전환 (S3/S4/S7/S8/S9/S10/S11 등 모달 없는 전환)
    case 'GO_NEXT': {
      const i = PAGE_ORDER.indexOf(state.step)
      if (i === -1 || i === PAGE_ORDER.length - 1) return state
      return { ...state, step: PAGE_ORDER[i + 1] }
    }

    // 이전 버튼: 직전 페이지로 (S1은 이전 없음). S1로 돌아가면 입력값 초기화.
    case 'GO_BACK': {
      const i = PAGE_ORDER.indexOf(state.step)
      if (i <= 0) return state
      const prev = PAGE_ORDER[i - 1]
      return { ...state, step: prev, idNumber: prev === 'S1' ? '' : state.idNumber }
    }

    // 모달 표시 (S5 지문인식 → M6)
    case 'SHOW_MODAL':
      return { ...state, activeModal: action.modal }

    // 모달 닫힘(자동 전환) 라우팅: M2→S3, M6→S7 (M13은 발급 연출로 별도 처리)
    case 'DISMISS_MODAL': {
      const nextStep =
        state.activeModal === 'M2' ? 'S3' : state.activeModal === 'M6' ? 'S7' : state.step
      return { ...state, step: nextStep, activeModal: null }
    }

    // S12 발급 클릭: 인쇄중(M13) + 줌아웃(카메라 full)
    case 'ISSUE_START': {
      if (state.step !== 'S12') return state
      return { ...state, issuePhase: 'printing', activeModal: 'M13' }
    }

    // M13 타이머 종료: 모달 닫고 종이 출력 시작(paperReady)
    case 'PRINTING_DONE':
      return { ...state, activeModal: null, issuePhase: 'paperReady' }

    // 종이 클릭: 수령 연출 시작(중앙 이동+확대). 슬롯 종이는 사라지고 App 오버레이가 이어받는다.
    case 'RECEIVE_START':
      if (state.issuePhase !== 'paperReady') return state
      return { ...state, issuePhase: 'receiving' }

    // 수령 연출 종료: 전체 초기화(줌인 복귀는 App에서 카메라 view로 처리)
    case 'RECEIVE_PAPER':
      return { ...initialSessionState }

    // 처음으로 / 세션 초기화
    case 'GO_HOME':
    case 'RESET':
      return { ...initialSessionState }

    default:
      return state
  }
}
