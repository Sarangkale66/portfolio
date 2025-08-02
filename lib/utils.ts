import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { LRUCache } from 'lru-cache'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type Key = string
type Value = any

export const lruCache = new LRUCache<Key, Value>({
  max: 10,
  ttl: 10000 * 60 * 5,
});