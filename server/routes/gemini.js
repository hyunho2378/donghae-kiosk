import { Router } from 'express'

const router = Router()

// TODO(PROGRESS.md 6단계): 행동 로그를 받아 Gemini API 호출 후
// { cause, suggestion } 형태의 JSON으로 응답한다.
router.post('/', async (req, res) => {
  res.status(501).json({ error: 'not implemented yet' })
})

export default router
