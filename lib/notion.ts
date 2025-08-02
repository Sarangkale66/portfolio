"use server"
import { Client } from "@notionhq/client";
import { NotionAPI } from 'notion-client';
import { lruCache } from "./utils";

const notion = new Client({
  auth: process.env.NOTION_API_KEY
});

const notionXClient = new NotionAPI({
  activeUser: process.env.NOTION_ACTIVE_USER,
  authToken: process.env.NOTION_TOKEN_V2
});

export async function getNotionPageRecordMap(pageId: string) {
  try {
    const cacheKey = `page:${pageId}`
    const cached = lruCache.get(cacheKey);
    if (cached) return cached

    console.log("caching happens");

    const recordMap = await notionXClient.getPage(pageId);
    lruCache.set(cacheKey, recordMap);
    return recordMap;

  } catch (error) {
    console.error(`Error fetching Notion page record map for ID ${pageId}:`, error);
    return null;
  }
}

export async function getImageSrcs(pageId: string) {
  const page: any = await notion.pages.retrieve({ page_id: pageId });

  let icon: string | null = null;
  if (page.icon) {
    if (page.icon.type === 'emoji') {
      icon = page.icon.emoji;
    } else if (page.icon.type === 'external') {
      icon = page.icon.external.url;
    } else if (page.icon.type === 'file') {
      icon = page.icon.file.url;
    }
  }

  const blocks: any = await notion.blocks.children.list({ block_id: pageId });

  const imageSrcArray: string[] = [];
  blocks.results.forEach((block: any) => {
    if (block.type === 'image') {
      const imgSrc = block.image.type === 'external' ? block.image.external.url : block.image.file.url;
      imageSrcArray.push(imgSrc);
    }
  });

  return [icon, imageSrcArray];
}
export async function getPageContent(pageId: string) {
  const blocks: any = await notion.blocks.children.list({ block_id: pageId });

  return blocks.results;
}

export async function getProjects() {
  const databaseId = process.env.NOTION_PROJECTS_DATABASE_ID;
  if (!databaseId) {
    throw new Error("NOTION_PROJECTS_DATABASE_ID is not defined.");
  }

  const response: any = await notion.databases.query({
    database_id: databaseId,
    sorts: [{ timestamp: "created_time", direction: "ascending" }]
  });

  return response.results.map((page: any) => ({
    id: page.id,
    title: page.properties.Title?.title?.[0]?.plain_text || 'Untitled',
  }));
}
