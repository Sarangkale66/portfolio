'use client'
import { RefObject, use, useEffect, useRef, useState } from 'react'
import NotionPage from '../../../components/NotionPage'
import { getNotionPageRecordMap, getPageContent } from '@/lib/notion'
import { Print } from '@/components/Print'
import { ExtendedRecordMap } from 'notion-types'
import { NotionAPI } from 'notion-client'
import { BlockObjectResponse, PartialBlockObjectResponse } from '@notionhq/client'
import Render from '@/components/BlockRender3'

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const notion = new NotionAPI()
  const [recordMap, setRecordMap] = useState<(BlockObjectResponse | PartialBlockObjectResponse)[]>([])
  const [loading, setLoading] = useState(true);
  const targetRef: RefObject<null | HTMLDivElement> = useRef(null);
  const headerRef: RefObject<null | HTMLDivElement> = useRef(null);
  const iconRef: RefObject<null | HTMLDivElement> = useRef(null);

  useEffect(() => {
    const fetchRecordMap = async () => {
      try {
        setLoading(true)
        // const data = await getNotionPageRe(cordMap(id);
        const data = await getPageContent(id);
        setRecordMap(data)
      } catch (err) {
        if (!recordMap) {
          return <div className="text-center mt-10 text-red-500">Failed to load Notion data.</div>
        }
        console.error('Error loading record map:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRecordMap()
  }, [])

  return (
    <div className="!overflow-hidden w-[100%] h-full flex justify-center ">
      <div className='h-full w-[30%] bg-[#191919] hidden lg:block '>
        hello
      </div>
      <div className='scrollbar overflow-y-scroll w-full sm:w-[70%] border-l-1 border-r-1 border-zinc-700 ' id='scrollbar1'>
        {loading ? (
          <div className='md:flex w-[100%] h-full md:justify-center' style={{ backgroundColor: "#191919" }}>
            <div role="status" className=" animate-pulse h-full w-[100%] md:w-[100%] py-15 px-9 md:py-8 md:px-9">
              <div className="h-10 md:h-13 w-[100%] md:mt-5 rounded-sm bg-gray-700 mb-9"></div>
              <div>
                <div className="h-5 w-5 rounded-full md:ml-1 mr-1.5 inline-block bg-gray-700 mb-2.5"></div>
                <div className="h-5 rounded-full inline-block bg-gray-700 min-w-20 mb-2.5 mr-12"></div>
                <div className="h-5 rounded-full inline-block bg-gray-700 min-w-20 md:min-w-50 mb-2.5"></div>
              </div>
              <div className='mb-7'>
                <div className="h-5 w-5 rounded-full md:ml-1 mr-1.5 inline-block bg-gray-700 mb-2.5"></div>
                <div className="h-5 rounded-full inline-block bg-gray-700 min-w-15 mb-2.5 mr-17"></div>
                <div className="h-5 rounded-full inline-block bg-gray-700 min-w-20 mb-2.5"></div>
              </div>
              <div className="h-5 rounded-full bg-gray-700 w-40 md:max-w-[330px] mb-2.5"></div>
              <div className="h-3 rounded-full bg-gray-700 w-full md:max-w-[330px] mb-2.5"></div>
              <div className="h-3 rounded-full bg-gray-700 md:max-w-[300px] mb-2.5"></div>
              <div className="h-3 rounded-full bg-gray-700 md:max-w-[360px] mb-2.5"></div>
              <div className="h-3 rounded-full bg-gray-700 md:max-w-[330px] mb-2.5"></div>
              <div className="h-3 rounded-full bg-gray-700 md:max-w-[330px] mb-5"></div>
              <div className="h-5 rounded-full bg-gray-700 md:max-w-[330px] mb-2.5"></div>
              <div className="h-3 rounded-full bg-gray-700 md:max-w-[360px] mb-2.5"></div>
              <div className="h-3 rounded-full bg-gray-700 md:max-w-[330px] mb-2.5"></div>
              <div className="h-3 rounded-full bg-gray-700 md:max-w-[330px] mb-2.5"></div>
              <div className="h-3 rounded-full bg-gray-700 md:max-w-[300px] mb-2.5"></div>
              <div className="h-3 rounded-full bg-gray-700 md:max-w-[360px] mb-5"></div>
              <div className="h-5 rounded-full bg-gray-700 w-40 md:max-w-[330px] mb-2.5"></div>
              <div className="h-3 rounded-full bg-gray-700 md:max-w-[330px] mb-2.5"></div>
              <div className="h-3 rounded-full bg-gray-700 md:max-w-[300px] mb-2.5"></div>
              <div className="h-3 rounded-full bg-gray-700 md:max-w-[360px]"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>) : (<div className="" style={{ backgroundColor: "#191919" }}>
            {<Render recordMap={recordMap} />}
          </div>)
        }
      </div>
      <div className='w-[30%] lg:w-[25%] h-full bg-[#191919] text-white hidden sm:block  '>
        <div ref={iconRef} className='py-5'></div>
        <div ref={headerRef} className='border-b-1'></div>
        <div ref={targetRef} className='py-3'></div>
      </div>
    </div>
  )
}
