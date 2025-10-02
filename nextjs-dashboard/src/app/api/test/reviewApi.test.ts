import { describe, it, expect, vi } from 'vitest'
import handlerIndex from '@/app/api/reviews/index'
import handlerProduct from '@/app/api/reviews/[productId]'

// Mock a minimal clientPromise that returns a fake db with collection methods
const inserted: any[] = []
const fakeCollection = () => ({
  insertOne: async (doc: any) => {
    const _id = `fakeid_${inserted.length}`
    inserted.push({ ...doc, _id })
    return { insertedId: _id }
  },
  find: () => ({ sort: () => ({ toArray: async () => inserted }) }),
})

vi.mock('@/lib/mongodb', () => ({
  default: Promise.resolve({ db: () => ({ collection: (_name: string) => fakeCollection() }) }),
}))

const makeReqRes = (opts: any = {}) => {
  const req: any = { method: opts.method || 'GET', body: opts.body || {}, query: opts.query || {} }
  const res: any = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    end: vi.fn().mockReturnThis(),
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
