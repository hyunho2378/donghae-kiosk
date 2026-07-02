// 데모 모드 상태 (PROMPT 07)
// helpOn: 도움말 오버레이, timeLimitOn: 30초 무입력 초기화(키오스크 동작 재현)
// 둘 다 OFF = 실제 동해 기기와 동일 조건

export const initialModeState = { helpOn: false, timeLimitOn: false }

export function modeReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_HELP':
      return { ...state, helpOn: !state.helpOn }
    case 'TOGGLE_TIME_LIMIT':
      return { ...state, timeLimitOn: !state.timeLimitOn }
    case 'SET_REAL_MODE': // 프리셋: 둘 다 OFF
      return { helpOn: false, timeLimitOn: false }
    default:
      return state
  }
}
