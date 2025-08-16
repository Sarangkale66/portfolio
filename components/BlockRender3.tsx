'use client'

import React from 'react'
import Link from 'next/link'
import type {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
import LoadingImage from './ImageLoading'
import { Terminal } from "./magicui/terminal"
import 'react-medium-image-zoom/dist/styles.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

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
    if (annotations.code) {
      element = <code className="text-md px-1 py-0.5 font-bold rounded font-mono italic text-orange-500 bg-zinc-200 dark:bg-zinc-700">{element}</code>
    }
    if (href) {
      element = (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {element}
        </Link>
      )
    }

    return <React.Fragment key={`${index}-${plain_text}-${href || ''}`}>{element}</React.Fragment>
  })
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  if (!block || typeof block !== 'object' || !('type' in block)) return null

  const { type, id } = block

  switch (type) {
    case 'paragraph':
      return <p key={id} className="inter-para my-4 text-md leading-relaxed">{renderRichText(block.paragraph.rich_text)}</p>

    case 'heading_1':
      return <h1 key={id} className="inter-para text-4xl font-extrabold my-6">{renderRichText(block.heading_1.rich_text)}</h1>

    case 'heading_2':
      return <h2 key={id} className="inter-para text-3xl font-bold my-5">{renderRichText(block.heading_2.rich_text)}</h2>

    case 'heading_3':
      return <h3 key={id} className="inter-para text-2xl font-semibold my-4 dark:text-gray-300 text-black">{renderRichText(block.heading_3.rich_text)}</h3>

    case 'bulleted_list_item':
      return <li key={id} className="list-disc ml-6 my-2 inter-para">{renderRichText(block.bulleted_list_item.rich_text)}</li>

    case 'numbered_list_item':
      return <li key={id} className="list-decimal ml-6 my-2 inter-para">{renderRichText(block.numbered_list_item.rich_text)}</li>

    case 'to_do':
      return (
        <div key={id} className="flex items-start gap-2 my-3 inter-para">
          <input type="checkbox" checked={block.to_do.checked} readOnly className="accent-blue-600 w-4 h-4 mt-1" />
          <label>{renderRichText(block.to_do.rich_text)}</label>
        </div>
      )

    case 'image': {
      const source = block.image.type === 'external' ? block.image.external.url : block.image.file.url
      return (
        <div key={id} className="my-6 rounded overflow-hidden border border-gray-200 shadow-sm">
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
        <Terminal key={id} className="rounded overflow-x-auto text-sm font-mono my-3 whitespace-pre-wrap !h-fit">
          <div className='dark:hidden'>
            <SyntaxHighlighter language={block.code.language} style={oneLight} >
              {block.code.rich_text.map(rt => rt.plain_text).join('')}
            </SyntaxHighlighter>
          </div>
          <div className='dark:block hidden'>
            <SyntaxHighlighter language={block.code.language} style={oneDark} >
              {block.code.rich_text.map(rt => rt.plain_text).join('')}
            </SyntaxHighlighter>
          </div>
        </Terminal>
      )

    case 'callout':
      return (
        <div key={id} className="flex items-start bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md my-4 shadow-sm">
          <div className="text-yellow-800">{renderRichText(block.callout.rich_text)}</div>
        </div>
      )

    case 'divider':
      return (
        <div key={id} className="flex justify-center my-8">
          <hr className="w-[60%] border-t dark:border-gray-300 border-gray-500" />
        </div>
      )

    case 'table': {
      if (!block.has_children || !('children' in block)) {
        return <p key={id} className="text-sm italic text-gray-500">⚠️ Table exists but has no rows (children not fetched).</p>
      }

      const rows = (block as any).children

      return (
        <table key={id} className="table-auto border-collapse w-full my-6 shadow rounded overflow-hidden">
          <tbody>
            {rows.map((row: any) => {
              if (row.type !== 'table_row') return null

              return (
                <tr key={row.id} className="border-t">
                  {row.table_row.cells.map((cell: any[], colIndex: number) => (
                    <td
                      key={`${row.id}-${colIndex}`}
                      className="border px-4 py-2 text-sm"
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
        <div key={id} className="notion-page-link my-3 w-fit hover:shadow transition-all duration-150">
          <h4 className="text-md font-medium flex pb-1 delay-0 transition-colors items-center gap-1">
            <svg className="w-5 dark:block hidden" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="url(#shinyWhite)">
              <defs>
                <linearGradient id="shinyWhite" x1="0%" y1="0%" x2="100%" y2="0%" >
                  <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="white" stopOpacity="0" />
                  <stop offset="100%" stopColor="white" stopOpacity="0.8" />
                  <animateTransform
                    attributeName="gradientTransform"
                    type="translate"
                    from="-1 0"
                    to="1 0"
                    dur="7s"
                    repeatCount="indefinite"
                  />
                </linearGradient>
              </defs>
              <path d="M5 8V20H19V8H5ZM5 6H19V4H5V6ZM20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM7 10H11V14H7V10ZM7 16H17V18H7V16ZM13 11H17V13H13V11Z"></path>
            </svg>

            <svg className="w-5 block dark:hidden" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="url(#shinyBlack)">
              <defs>
                <linearGradient id="shinyBlack" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(120, 0.5, 0.5) translate(-1 0)">
                  <stop offset="0%" stopColor="black" stopOpacity="1" />
                  <stop offset="50%" stopColor="black" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="black" stopOpacity="0.8" />
                  <animateTransform
                    attributeName="gradientTransform"
                    type="translate"
                    from="-1 0"
                    to="1 0"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </linearGradient>
              </defs>
              <path d="M5 8V20H19V8H5ZM5 6H19V4H5V6ZM20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM7 10H11V14H7V10ZM7 16H17V18H7V16ZM13 11H17V13H13V11Z"></path>
            </svg>
            <Link href={`/page/${childId}`} className='text-zinc-600 font-bold dark:text-zinc-200 hover:underline'>
              {title}
            </Link>
          </h4>
        </div>
      )
    }

    case 'toggle': {
      return (
        <details key={id} className="my-2 group">
          <summary className="cursor-pointer hover:underline">
            {renderRichText(block.toggle?.rich_text || [])}
          </summary>
          <div className="ml-4 mt-2">
            {'children' in block && Array.isArray(block.children) ? (
              block.children.map(childBlock => (
                <Render key={childBlock.id} recordMap={childBlock} />
              ))
            ) : (
              <p className="text-sm italic text-gray-500">⚠️ Toggle has no children or not fetched.</p>
            )}
          </div>
        </details>
      )
    }


    default:
      return (
        <p key={id} className="text-sm italic my-2">
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