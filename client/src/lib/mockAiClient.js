// 목업 AI 클라이언트. 실제 Gemini API를 호출하지 않는다.
// 1.5~2.5초 랜덤 딜레이 후 화면 ID별 문구 풀에서 랜덤으로 1개씩 골라 반환한다.
// 나중에 실제 API로 교체하기 쉽도록 시그니처는 실제 클라이언트처럼 유지(내부만 목업).

import { aiMockResponses } from '../data/aiMockResponses.js'
import { timing } from '../tokens.js'

function randomIndex(length) {
  return Math.floor(Math.random() * length)
}

export function getAnalysis({ screenId, elapsedSeconds }) {
  const entry = aiMockResponses[screenId]

  // aiMockResponses에 없는 화면(S1 등) 방어 처리
  if (!entry) {
    return Promise.reject(new Error(`no mock analysis for screen: ${screenId}`))
  }

  // 0.6~1.2초 랜덤 (FIX-B, 토큰 기반)
  const delayMs =
    timing.aiMockDelayMin + Math.random() * (timing.aiMockDelayMax - timing.aiMockDelayMin)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        screenLabel: entry.screenLabel,
        cause: entry.causes[randomIndex(entry.causes.length)],
        suggestion: entry.suggestions[randomIndex(entry.suggestions.length)],
        elapsedSeconds,
        generatedAt: Date.now(),
      })
    }, delayMs)
  })
}
