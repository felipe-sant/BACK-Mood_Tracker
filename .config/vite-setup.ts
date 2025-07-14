import { vi } from 'vitest'

beforeAll(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {})
})
