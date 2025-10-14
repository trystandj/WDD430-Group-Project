import { POST as postHandler } from '@/app/api/reviews/route'

type ReqLike = {
  method?: string
  body?: unknown
}

type ResLike = {
  status: (code: number) => ResLike
  json: (v: unknown) => void
  end: (s?: string) => void
}

export default async function handler(req: ReqLike, res: ResLike) {
  if (req.method === 'POST') {

    const body = (req.body ?? {}) as Record<string, unknown>
    const reqObj = new Request('http://localhost/api/reviews', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'content-type': 'application/json' },
    })
    const resp = await postHandler(reqObj as unknown as Request)
    const json = await resp.json()
    res.status(resp.status || 200).json(json)
    return
  }
  res.status(405).end('Method Not Allowed')
}
