import express from 'express'
import LRUCache from 'lru-cache'

const router = express.Router()
export const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
})

export const getCacheKey = (req) => {
  return `${req.url}`
}

router.use((req, res, next) => {
  const key = getCacheKey(req)

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    console.log(`CACHE HIT: ${key}`)
    res.send(ssrCache.get(key))
    return
  }
  next()
})

export const cacheMiddleware = router



