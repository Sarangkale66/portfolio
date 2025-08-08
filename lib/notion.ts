"use server"
import { Client } from "@notionhq/client";
// import { NotionAPI } from "notion-client";
// import { lruCache } from "./utils";
import {
  // GetPageResponse,
  BlockObjectResponse,
  PartialBlockObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionAPI } from "notion-client";

// Create Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const notionXClient = new NotionAPI()

/**
 * Fetches a full Notion recordMap using notion-client (unofficial API)
 */
export async function getNotionPageRecordMap(pageId: string) {
  try {
    // const cacheKey = page:${pageId};
    // const cached = lruCache.get(cacheKey);
    // if (cached) return cached;
    // Create notion-client-X instance (unofficial)
    const recordMap = await notionXClient.getPage(pageId);
    // lruCache.set(cacheKey, recordMap);
    return recordMap;
  } catch (error) {
    console.error("Error fetching Notion page record map for ID ${pageId}:", error);
    return null;
  }
}

/**
 * Gets the page icon and a list of image URLs inside the page
 */
// export async function getImageSrcs(
//   pageId: string
// ): Promise<[string | null, string[]]> {
//   const page: GetPageResponse = await notion.pages.retrieve({ page_id: pageId });

//   let icon: string | null = null;
//   if (page) { //@ts-expect-error may found error
//     if (page.icon) //@ts-expect-error may found error
//       if (page?.icon?.type === "emoji") { //@ts-expect-error may found error
//         icon = page?.icon?.emoji; //@ts-expect-error may found error
//       } else if (page?.icon?.type === "external") { //@ts-expect-error may found error
//         icon = page?.icon?.external?.url; //@ts-expect-error may found error
//       } else if (page?.icon?.type === "file") { //@ts-expect-error may found error
//         icon = page?.icon?.file.url;
//       }
//   }

//   const blocks = await notion.blocks.children.list({ block_id: pageId });

//   const imageSrcArray: string[] = [];
//   blocks.results.forEach((block) => {
//     if (
//       "type" in block &&
//       block.type === "image" &&
//       "image" in block
//     ) {
//       const imgSrc =
//         block.image.type === "external"
//           ? block.image.external.url
//           : block.image.file.url;
//       imageSrcArray.push(imgSrc);
//     }
//   });

//   return [icon, imageSrcArray];
// }

/**
 * Returns list of blocks (basic page content)
 */
export async function getPageContent(
  pageId: string
): Promise<(BlockObjectResponse | PartialBlockObjectResponse)[]> {
  const blocks = await notion.blocks.children.list({ block_id: pageId });
  return blocks.results;
}

/**
 * Queries a database (projects)
 */
export async function getProjects(): Promise<
  {
    id: string;
    title: string;
  }[]
> {
  const databaseId = process.env.NOTION_PROJECTS_DATABASE_ID;
  if (!databaseId) {
    throw new Error("NOTION_PROJECTS_DATABASE_ID is not defined.");
  }

  const response: QueryDatabaseResponse = await notion.databases.query({
    database_id: databaseId,
    sorts: [{ timestamp: "created_time", direction: "ascending" }],
  });


  return response.results.map((page) => ({
    id: page.id, //@ts-expect-error may found error
    title: page.properties.Title?.title?.[0]?.plain_text || 'Untitled',
  }));
}

export async function getPageProperties(pageId: string) {
  const response = await notion.pages.retrieve({ page_id: pageId });
  //@ts-expect-error may found error
  const icon = response.icon?.type === 'emoji' ? response.icon.emoji : response.icon?.type === 'external' ? response.icon.external.url : response.icon?.type === 'file' ? response.icon.file.url : null;
  //@ts-expect-error may found error
  const cover = response.cover?.type === 'external' ? response.cover.external.url : response.cover?.type === 'file' ? response.cover.file.url : null;
  //@ts-expect-error may found error
  return { icon, cover, properties: response.properties, status: response.properties.Status.status.name, created: response.properties["created "].date, color: response.properties.Status.status.color, deadline: response.properties["Deadline"].date };
}
