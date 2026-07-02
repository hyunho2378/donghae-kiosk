// 화면 ID별 도움말 힌트 (PROMPT 07). anchor는 강조 대상 식별자(참고용).
// helpOn일 때만 오버레이로 노출된다. 키오스크 화면 자체는 두 모드에서 동일.

export const helpHints = {
  S1: { text: '발급받을 증명서 종류를 눌러 주세요. 이번 연습은 졸업증명서입니다.', anchor: 'graduation-button' },
  S3: { text: '주민등록번호 13자리를 누른 뒤, 왼쪽 위 다음 버튼을 눌러 주세요.', anchor: 'next-button' },
  S4: { text: '지문 카드를 눌러 주세요.', anchor: 'fingerprint-card' },
  // position 'top': 강조 대상(지문확인)이 하단에 있어 말풍선을 상단으로 올려 가리지 않게 (FIX-J). 나머지 화면은 기본 'bottom'.
  S5: { text: '아래 지문확인 장치에 엄지를 대듯 눌러 주세요.', anchor: 'hardware-fingerprint', position: 'top' },
  S7: { text: '졸업한 학교가 있는 지역의 교육청을 눌러 주세요.', anchor: 'region-grid' },
  S8: { text: '학교 이름을 두 글자 이상 입력하고 다음을 눌러 주세요.', anchor: 'next-button' },
  S9: { text: '목록에서 학교 이름을 눌러 주세요.', anchor: 'school-item' },
  S10: { text: '뒷자리 공개 여부를 선택해 주세요. 비공개를 권장합니다.', anchor: 'private-card' },
  S11: { text: '발급 부수를 확인하고 다음을 눌러 주세요.', anchor: 'next-button' },
  S12: { text: '발급 버튼을 눌러 주세요. 수수료는 무료입니다.', anchor: 'issue-button' },
}

// 목표 요소 노란 실선 강조링 + 은은한 점멸 (각 화면/하드웨어가 highlight prop으로 자기 요소에 적용).
// FIX-G: 점선 2px → 실선 3px, 1초 주기 opacity 점멸(help-ring-blink 키프레임은 index.css).
export const HELP_RING_CLASS =
  'outline outline-[3px] outline-offset-2 outline-help-ring help-ring-blink'
