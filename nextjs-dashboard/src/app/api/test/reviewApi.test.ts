import { describe, it, expect, vi } from 'vitest'
import handlerIndex from '@/app/api/reviews/test-compat/index'
import handlerProduct from '@/app/api/reviews/test-compat/productId'

// Mock a minimal clientPromise that returns a fake db with collection methods
const inserted: Record<string, unknown>[] = []
const fakeCollection = () => ({
  insertOne: async (doc: Record<string, unknown>) => {
    const _id = `fakeid_${inserted.length}`
    inserted.push({ ...(doc as Record<string, unknown>), _id })
    return { insertedId: _id }
  },
  find: () => ({ sort: () => ({ toArray: async () => inserted }) }),
})

vi.mock('@/app/lib/mongodb', () => ({
  default: Promise.resolve({ db: () => ({ collection: (_name: string) => fakeCollection() }) }),
}))

// Clear in-memory fake DB between tests
beforeEach(() => {
  inserted.length = 0
})

type ReqLike = { method?: string; body?: Record<string, unknown>; query?: Record<string, unknown> }
type ResLike = {
  status: (code: number) => ResLike
  json: (v: unknown) => ResLike
  end: (s?: string) => ResLike
  setHeader?: (k: string, v: string) => void
}

const makeReqRes = (opts: { method?: string; body?: Record<string, unknown>; query?: Record<string, unknown> } = {}) => {
  const req: ReqLike = { method: opts.method || 'GET', body: opts.body || {}, query: opts.query || {} }
  const res: ResLike = {
    status: vi.fn().mockImplementation(function (_code: number) { return res }),
    json: vi.fn().mockImplementation(function (_v: unknown) { return res }),
    end: vi.fn().mockImplementation(function (_s?: string) { return res }),
    setHeader: vi.fn(),
  }
  return { req, res }
}

describe('reviews API', () => {
  it('POST /api/reviews should insert a review', async () => {
    const { req, res } = makeReqRes({ method: 'POST', body: { productId: 'p1', userId: 'u1', username: 'name', rating: 5, comment: 'ok' } })
    await handlerIndex(req, res)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalled()
  })

  it('GET /api/reviews/:productId should return reviews', async () => {
    const { req, res } = makeReqRes({ method: 'GET', query: { productId: 'p1' } })
    await handlerProduct(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalled()
  })
})
