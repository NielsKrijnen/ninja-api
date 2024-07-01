export type CursorList<T extends Record<string, any>> = {
  cursor: {
    name: string
    offset: number
    count: number
    expires: number
  }
  results: T[]
}