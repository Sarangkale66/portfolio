"use server"
import { NextRequest } from 'next/server'
import { NotionAPI } from 'notion-client'
import { getNotionPageRecordMap } from '@/lib/notion'

const notion = new NotionAPI()

export async function GET(req: NextRequest) {
  const pageId = req.nextUrl.searchParams.get('pageId')

  if (!pageId) {
    return new Response(JSON.stringify({ error: 'Missing or invalid pageId' }), { status: 400 })
  }

  try {
    const recordMap = await getNotionPageRecordMap(pageId)
    return new Response(JSON.stringify(recordMap), { status: 200 })
  } catch (error) {
    console.error(`Failed to fetch Notion record map for ${pageId}`, error)
    return new Response(JSON.stringify({ error: 'Failed to fetch record map' }), { status: 500 })
  }
}
