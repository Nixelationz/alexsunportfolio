import { createServerFn } from '@tanstack/react-start'
import { env } from 'cloudflare:workers'

export const getHomepageVisits = createServerFn({ method: 'GET' }).handler(async () => {
  const result = await env.VISITS_DB.prepare(`
    SELECT count FROM site_counters WHERE name = 'homepage_visits'
  `).first<{ count: number }>()

  return result?.count ?? 0
})

export const incrementHomepageVisits = createServerFn({ method: 'POST' }).handler(async () => {
  const result = await env.VISITS_DB.prepare(`
    INSERT INTO site_counters (name, count)
    VALUES ('homepage_visits', 1)
    ON CONFLICT(name) DO UPDATE SET count = count + 1
    RETURNING count
  `).first<{ count: number }>()

  if (!result) {
    throw new Error('Failed to retrieve the homepage visit count after incrementing it.')
  }

  return result.count
})
