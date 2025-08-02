'use client'
import { RefObject, use, useEffect, useRef, useState } from 'react'
import NotionPage from '../../../components/NotionPage'
import { getImageSrcs, getNotionPageRecordMap } from '@/lib/notion'
import { Print } from '@/components/Print'

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [recordMap, setRecordMap] = useState<any>(null)
  const [arr, setArr] = useState<string[]>([]);
  const [icon, setIcon] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const targetRef: RefObject<null | HTMLDivElement> = useRef(null);
  const headerRef: RefObject<null | HTMLDivElement> = useRef(null);
  const iconRef: RefObject<null | HTMLDivElement> = useRef(null);
  useEffect(() => {
    const fetchRecordMap = async () => {
      try {
        setLoading(true)
        const data = await getNotionPageRecordMap(id);
        const [icon1, imageSrcArray]: any = await getImageSrcs(id);
        setIcon(icon1);
        setArr(imageSrcArray)
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
  }, [id])

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
          </div>) : (<>
            <NotionPage recordMap={recordMap} loading={loading} />
            <Print arr={arr} icon={icon} targetRef={targetRef} headerRef={headerRef} iconRef={iconRef} />
          </>)
        }
      </div>
      <div className='w-[30%] lg:w-[25%] h-full bg-[#191919] text-white hidden sm:block  '>
        <div ref={iconRef} className='py-5'>

        </div>
        <div ref={headerRef} className='border-b-1'></div>
        <div ref={targetRef} className='py-3'></div>
      </div>
    </div>
  )
}
