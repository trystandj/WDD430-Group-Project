import { GET as getHandler } from '@/app/api/reviews/[productId]/route'
import type { NextRequest } from 'next/server'

type ReqLike = {
  method?: string
  query?: Record<string, unknown>
}

type ResLike = {
  status: (code: number) => ResLike
  json: (v: unknown) => void
  end: (s?: string) => void
}

type RouteContext = { params: Promise<{ productId: string }> }

export default async function handler(req: ReqLike, res: ResLike) {
  if (req.method === 'GET') {
    const productId = req.query?.productId ?? ''
    const url = `http://localhost/api/reviews/${encodeURIComponent(String(productId))}`
    const reqObj = new Request(url, { method: 'GET' })
   
    const resp = await getHandler(
      reqObj as unknown as NextRequest,
      { params: Promise.resolve({ productId: String(productId) }) } as unknown as RouteContext,
    )
    const json = await resp.json()
    res.status(resp.status || 200).json(json)
    return
  }
  res.status(405).end('Method Not Allowed')
}
