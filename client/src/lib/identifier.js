// 강사용 개인별 기록 식별자 발급 유틸 (PROMPT 08)
// 형식 YYMMDD-A — 앞 6자리는 최초 방문일, 뒤 글자는 그날 발급 순서.
// 더미 데이터 생성용으로 함수 형태만 갖춰둔다(실제 자동발급 시 중복 체크 등은 나중에 추가).
// 한 번 부여된 식별자는 이후 방문에서도 그대로 재사용한다(재발급 로직 없음).

const SUFFIX_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

// date: Date 객체(최초 방문일), sameDayCount: 그날 이미 발급된 인원 수(0부터)
export function issueIdentifier(date, sameDayCount = 0) {
  const yy = String(date.getFullYear()).slice(2)
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const suffix = SUFFIX_LETTERS[sameDayCount] ?? 'A'
  return `${yy}${mm}${dd}-${suffix}`
}
