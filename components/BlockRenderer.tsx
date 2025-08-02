// ... existing imports
import { BlockObjectResponse, RichTextItemResponse, PartialBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Link from 'next/link';
import React from 'react';

const renderRichText = (richTextArr: Array<RichTextItemResponse>) => {
  return richTextArr.map((textItem, index) => {
    const { annotations, plain_text, href } = textItem;
    let content:any = plain_text;

    if (annotations.bold) content = <strong>{content}</strong>;
    if (annotations.italic) content = <em>{content}</em>;
    if (annotations.strikethrough) content = <s>{content}</s>;
    if (annotations.underline) content = <u>{content}</u>;
    if (annotations.code) content = <code>{content}</code>;

    if (href) {
      content = <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
    }

    return <React.Fragment key={index}>{content}</React.Fragment>;
  });
};

interface BlockRendererProps {
  block: BlockObjectResponse | PartialBlockObjectResponse;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  if (!('type' in block)) {
    return null;
  }

  switch (block.type) {
    case 'paragraph':
      return <p>{renderRichText(block.paragraph.rich_text)}</p>;
    case 'heading_1':
      return <h1>{renderRichText(block.heading_1.rich_text)}</h1>;
    case 'heading_2':
      return <h2>{renderRichText(block.heading_2.rich_text)}</h2>;
    case 'heading_3':
      return <h3>{renderRichText(block.heading_3.rich_text)}</h3>;
    case 'bulleted_list_item':
      return <li>{renderRichText(block.bulleted_list_item.rich_text)}</li>;
    case 'numbered_list_item':
      return <li>{renderRichText(block.numbered_list_item.rich_text)}</li>;
    case 'to_do':
      return (
        <div>
          <input type="checkbox" checked={block.to_do.checked} readOnly />
          <label>{renderRichText(block.to_do.rich_text)}</label>
        </div>
      );
    case 'image':
      const imgSrc = block.image.type === 'external' ? block.image.external.url : block.image.file.url;
      return <img src={imgSrc} alt="Notion Image" />;
    case 'code':
      return (
        <pre>
          <code>{renderRichText(block.code.rich_text)}</code>
        </pre>
      );
    case 'callout':
      return (
        <div style={{ padding: '10px', borderLeft: '3px solid blue', backgroundColor: '#e6f7ff' }}>
          {renderRichText(block.callout.rich_text)}
        </div>
      );
    case 'child_page':
      // Render a link to the child page
      // You'll need to decide on a URL structure for your child pages.
      // For example: /blog/[child_page_id] or /projects/[child_page_id]
      const childPageTitle = block.child_page.title;
      const childPageId = block.id; // The ID of the child page is the block's ID

      // IMPORTANT: You'll need to define how your Next.js routes map to these child pages.
      // If this child page is a blog post, you'd link to /blog/some-slug-or-id
      // If this child page is a project detail, you'd link to /projects/some-slug-or-id
      // For simplicity, let's assume we link to /projects/[id]
      return (
        <div className="notion-child-page">
          <h3>
            <Link href={`/projects/${childPageId}`}>
              {childPageTitle}
            </Link>
          </h3>
        </div>
      );
    // ... add more block types as needed
    default:
      return <p>Unsupported block type: {block.type}</p>;
  }
};

export default BlockRenderer;

