// 경과 시간 판정 및 포맷 유틸
import { stuckThresholdMs } from '../tokens.js'

// IA.md 막힘 판정: 동일 화면 8초 이상 체류 시 true
export function isStuck(elapsedMs) {
  return elapsedMs >= stuckThresholdMs
}

// 경과 시간 → "N초" 또는 "N분 M초"
export function formatElapsed(ms) {
  const totalSec = Math.floor(ms / 1000)
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  return min > 0 ? `${min}분 ${sec}초` : `${sec}초`
}

function pad2(n) {
  return String(n).padStart(2, '0')
}

// 진입 시각 타임스탬프 → "HH:MM:SS"
export function formatClock(ts) {
  const d = new Date(ts)
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`
}
