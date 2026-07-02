// 상단 빨간 사각 버튼 (장식용, 클릭 무반응). 아래 그림자로 눌림 입체감.
import { chassisColors } from '../../../tokens.js'

function RedButton() {
  return (
    <div
      className="h-9 w-20 rounded-md"
      style={{
        backgroundColor: chassisColors.redButton,
        boxShadow: 'inset 0 -4px 0 rgba(0,0,0,0.30), 0 2px 4px rgba(0,0,0,0.45)',
      }}
    />
  )
}

export default RedButton
