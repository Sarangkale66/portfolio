import { GetStaticProps, GetStaticPaths } from 'next'
import { NotionAPI } from 'notion-client'
import dynamic from 'next/dynamic'
import { NotionRenderer } from 'react-notion-x'

import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'katex/dist/katex.min.css'
import Link from 'next/link'
import Image from 'next/legacy/image'

const Code = dynamic(() => import('react-notion-x/build/third-party/code').then(m => m.Code))
const Collection = dynamic(() => import('react-notion-x/build/third-party/collection').then(m => m.Collection))
const Equation = dynamic(() => import('react-notion-x/build/third-party/equation').then(m => m.Equation))
const Pdf = dynamic(() => import('react-notion-x/build/third-party/pdf').then(m => m.Pdf), { ssr: false })
const Modal = dynamic(() => import('react-notion-x/build/third-party/modal').then(m => m.Modal), { ssr: false })

const notion = new NotionAPI({
  authToken: process.env.NOTION_TOKEN_V2,
  activeUser: process.env.NOTION_ACTIVE_USER
})

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = ctx.params?.id as string
  const recordMap = await notion.getPage(id)
  return { props: { recordMap }, revalidate: 10 }
}

const defaultMapPageUrl = (pageId: string) => {
  return `/page/${pageId}`
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export default function NotionPage({ recordMap, loading }: { recordMap: any; loading: boolean; }) {
  if (!recordMap) return null

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage
      mapPageUrl={defaultMapPageUrl}
      darkMode={true}
      disableHeader={true}
      components={{
        Code,
        Collection,
        Equation,
        Modal,
        Pdf,
        nextImage: Image,
        nextLink: Link,
      }}
    />
  )
}

export const revalidate = 10; 
