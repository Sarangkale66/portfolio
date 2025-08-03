'use client'

import React from 'react'
import Link from 'next/link'
import type {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
import LoadingImage from './ImageLoading'

export interface BlockRendererProps {
  block: BlockObjectResponse | PartialBlockObjectResponse
}

const renderRichText = (richText: Array<RichTextItemResponse>) => {
  return richText.map((item, index) => {
    const { plain_text, annotations, href } = item

    let element: React.ReactNode = plain_text

    if (annotations.bold) element = <strong className="font-semibold">{element}</strong>
    if (annotations.italic) element = <em className="italic">{element}</em>
    if (annotations.strikethrough) element = <s className="line-through">{element}</s>
    if (annotations.underline) element = <u className="underline">{element}</u>
    if (annotations.code) element = <code className="bg-gray-100 text-sm px-1 rounded font-mono">{element}</code>
    if (href) element = <Link href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{element}</Link>

    return <React.Fragment key={index}>{element}</React.Fragment>
  })
}

// 🎯 Main Renderer Component
const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  if (!block || typeof block !== 'object' || !('type' in block)) return null

  const { type, id } = block

  switch (type) {
    case 'paragraph':
      return <p className="my-4 text-gray-800 leading-relaxed">{renderRichText(block.paragraph.rich_text)}</p>

    case 'heading_1':
      return <h1 className="text-4xl font-extrabold my-6 text-gray-900">{renderRichText(block.heading_1.rich_text)}</h1>

    case 'heading_2':
      return <h2 className="text-3xl font-bold my-5 text-gray-800">{renderRichText(block.heading_2.rich_text)}</h2>

    case 'heading_3':
      return <h3 className="text-2xl font-semibold my-4 text-gray-700">{renderRichText(block.heading_3.rich_text)}</h3>

    case 'bulleted_list_item':
      return <li className="list-disc ml-6 my-2 text-gray-800">{renderRichText(block.bulleted_list_item.rich_text)}</li>

    case 'numbered_list_item':
      return <li className="list-decimal ml-6 my-2 text-gray-800">{renderRichText(block.numbered_list_item.rich_text)}</li>

    case 'to_do':
      return (
        <div className="flex items-start gap-2 my-3">
          <input type="checkbox" checked={block.to_do.checked} readOnly className="accent-blue-600 w-4 h-4 mt-1" />
          <label className="text-gray-800">{renderRichText(block.to_do.rich_text)}</label>
        </div>
      )

    case 'image': {
      const source =
        block.image.type === 'external'
          ? block.image.external.url
          : block.image.file.url

      return (
        <div className="my-6 rounded overflow-hidden border border-gray-200 shadow-sm">
          <LoadingImage
            src={source}
            alt="Notion image"
            width={800}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>
      )
    }

    case 'code':
      return (
        <pre className="bg-gray-100 border border-gray-300 rounded p-4 overflow-x-auto text-sm font-mono my-4 text-gray-800 whitespace-pre-wrap">
          <code>{renderRichText(block.code.rich_text)}</code>
        </pre>
      )

    case 'callout':
      return (
        <div className="flex items-start bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md my-4 shadow-sm">
          <div className="text-yellow-800">{renderRichText(block.callout.rich_text)}</div>
        </div>
      )

    case 'divider':
      return (
        <div className="flex justify-center my-8">
          <hr className="w-1/3 border-t border-gray-300 dark:border-gray-600" />
        </div>
      )

    case 'table': {
      console.log(block);

      if (!block.has_children || !('children' in block)) {
        return (
          <p className="text-sm italic text-gray-500">⚠️ Table exists but has no rows (children not fetched).</p>
        )
      }

      const rows = (block as any).children // assuming children are passed manually

      return (
        <table className="table-auto border-collapse w-full my-6 shadow rounded overflow-hidden">
          <tbody>
            {rows.map((row: any, rowIndex: number) => {
              if (row.type !== 'table_row') return null

              return (
                <tr key={row.id} className="border-t">
                  {row.table_row.cells.map((cell: any[], colIndex: number) => (
                    <td
                      key={colIndex}
                      className="border px-4 py-2 text-sm text-gray-800 bg-white"
                    >
                      {renderRichText(cell)}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    }

    case 'child_page': {
      const title = block.child_page.title
      const childId = block.id

      return (
        <div className="my-6 p-4 bg-gray-50 border border-gray-200 rounded hover:shadow transition-all duration-150">
          <h3 className="text-xl font-medium">
            <Link href={`/projects/${childId}`} className="text-blue-600 hover:underline">
              {title}
            </Link>
          </h3>
        </div>
      )
    }

    default:
      return (
        <p className="text-sm text-gray-400 italic my-2">
          ⚠️ Unsupported block type: <code>{type}</code>
        </p>
      )
  }
}

function Render({ recordMap }: { recordMap: any[] }) {
  return (
    <>
      {recordMap?.filter(Boolean).map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  )
}

export default Render
