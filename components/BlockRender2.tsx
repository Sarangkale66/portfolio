import { getNotionPageRecordMap, getProjects } from '@/lib/notion'; // Ensure these are correctly imported
import { NotionRenderer } from 'react-notion-x';

// Import react-notion-x default styles and optional dependencies
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css'; // For code block syntax highlighting
import 'katex/dist/katex.min.css';       

export async function generateStaticParams() {
  const projects = await getProjects(); 

  return projects.map((project:{ id:string }) => ({
    id: project.id, 
  }));
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const recordMap = await getNotionPageRecordMap(id);

  if (!recordMap) {
    return <div>Project content not found or failed to load.</div>;
  }

  // Extract the title from the recordMap if needed (optional)
  const pageBlock = recordMap.block[id]?.value;
  const title = pageBlock?.properties?.title?.[0]?.[0] || 'Untitled Project';

  return (
    <div>
      <h1>{title}</h1>
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false} // Set to true if you want Notion's default full page styling
        disableHeader={true} // Usually disable the Notion header if you have your own
        // Add more options as needed:
        // previewImages={true} // To enable image previews
        // components={{
        //   Code: CustomCodeBlockComponent, // You can override default components
        //   Collection: CustomCollectionComponent,
        // }}
      />
    </div>
  );
}

export const revalidate = 60;