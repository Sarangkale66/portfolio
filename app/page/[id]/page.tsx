'use client'
import { RefObject, use, useEffect, useRef, useState } from 'react'
import NotionPage from '../../../components/NotionPage'
import { getPageContent, getPageProperties } from '@/lib/notion'
import { Print } from '@/components/Print'
import { ExtendedRecordMap } from 'notion-types'
import { BlockObjectResponse, PartialBlockObjectResponse } from '@notionhq/client'
import Render from '@/components/BlockRender3'
import ThemeToggleButton from '@/components/ui/theme-toggle-button'
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Link from 'next/link'
import LoadingImage from '@/components/ImageLoading'

interface PageLinkType {
  title?: string;
  pageId?: string
}

interface PropertyTypes {
  cover: string;
  properties: any;
  icon: string;
  created: { start: string };
  status: string;
  color: string;
  deadline: { start: string };
  headline: string;
}

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [recordMap, setRecordMap] = useState<(BlockObjectResponse | PartialBlockObjectResponse)[]>([])
  const [property, setProperty] = useState<PropertyTypes>({ cover: "", properties: {}, icon: "", created: { start: "" }, status: "", color: "", deadline: { start: "" }, headline: "" });
  const [loading, setLoading] = useState(true);
  const targetRef: RefObject<null | HTMLDivElement> = useRef(null);
  const headerRef: RefObject<null | HTMLDivElement> = useRef(null);
  const iconRef: RefObject<null | HTMLDivElement> = useRef(null);

  useEffect(() => {
    const fetchRecordMap = async () => {
      try {
        setLoading(true)
        const properties = await getPageProperties(id);
        const data = await getPageContent(id);
        console.log(properties.headline);
        setProperty(properties);
        setRecordMap(data);
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
    <div className="!overflow-hidden w-[100%] h-full flex justify-center bg-white dark:bg-[#191919] text-zinc-900 dark:text-white">
      <div className='h-full w-[30%] hidden lg:block '>
      </div>
      <div className='scrollbar overflow-y-scroll w-full sm:w-[70%] border-l-1 border-r-1 border-zinc-700 ' id='scrollbar1'>
        {loading ? (
          <div className='md:flex w-[100%] h-full md:justify-center relative'>
            <div role="status" className=" animate-pulse h-full w-[100%] md:w-[100%] py-15 px-9 md:py-8 md:px-9">
              <div className='w-full z-50 fixed left-[88%] sm:left-[63%] lg:left-[78%]'>
                <ThemeToggleButton />
              </div>
              <div className="h-10 md:h-13 w-[80%] md:mt-5 rounded-sm dark:bg-gray-700 bg-gray-300 mb-9"></div>
              <div>
                <div className="h-5 w-5 rounded-full md:ml-1 mr-1.5 inline-block dark:bg-gray-700 bg-gray-300 mb-2.5"></div>
                <div className="h-5 rounded-full inline-block dark:bg-gray-700 bg-gray-300 min-w-20 mb-2.5 mr-12"></div>
                <div className="h-5 rounded-full inline-block dark:bg-gray-700 bg-gray-300 min-w-20 md:min-w-50 mb-2.5"></div>
              </div>
              <div className='mb-7'>
                <div className="h-5 w-5 rounded-full md:ml-1 mr-1.5 inline-block dark:bg-gray-700 bg-gray-300 mb-2.5"></div>
                <div className="h-5 rounded-full inline-block dark:bg-gray-700 bg-gray-300 min-w-15 mb-2.5 mr-17"></div>
                <div className="h-5 rounded-full inline-block dark:bg-gray-700 bg-gray-300 min-w-20 mb-2.5"></div>
              </div>
              <div className="h-5 rounded-full dark:bg-gray-700 bg-gray-300 w-40 md:max-w-[330px] mb-2.5"></div>
              <div className="h-3 rounded-full dark:bg-gray-700 bg-gray-300 w-full md:max-w-[330px] mb-2.5"></div>
              <div className="h-3 rounded-full dark:bg-gray-700 bg-gray-300 md:max-w-[300px] mb-2.5"></div>
              <div className="h-3 rounded-full dark:bg-gray-700 bg-gray-300 md:max-w-[360px] mb-2.5"></div>
              <div className="h-3 rounded-full dark:bg-gray-700 bg-gray-300 md:max-w-[330px] mb-2.5"></div>
              <div className="h-3 rounded-full dark:bg-gray-700 bg-gray-300 md:max-w-[330px] mb-5"></div>
              <div className="h-5 rounded-full dark:bg-gray-700 bg-gray-300 md:max-w-[330px] mb-2.5"></div>
              <div className="h-3 rounded-full dark:bg-gray-700 bg-gray-300 md:max-w-[360px] mb-2.5"></div>
              <div className="h-3 rounded-full dark:bg-gray-700 bg-gray-300 md:max-w-[330px] mb-2.5"></div>
              <div className="h-3 rounded-full dark:bg-gray-700 bg-gray-300 md:max-w-[330px] mb-2.5"></div>
              <div className="h-3 rounded-full dark:bg-gray-700 bg-gray-300 md:max-w-[300px] mb-2.5"></div>
              <div className="h-3 rounded-full dark:bg-gray-700 bg-gray-300 md:max-w-[360px] mb-5"></div>
              <div className="h-5 rounded-full dark:bg-gray-700 bg-gray-300 w-40 md:max-w-[330px] mb-2.5"></div>
              <div className="h-3 rounded-full dark:bg-gray-700 bg-gray-300 md:max-w-[330px] mb-2.5"></div>
              <div className="h-3 rounded-full dark:bg-gray-700 bg-gray-300 md:max-w-[300px] mb-2.5"></div>
              <div className="h-3 rounded-full dark:bg-gray-700 bg-gray-300 md:max-w-[360px]"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>) : (<div className="px-4 lg:px-10 py-15 bg-white dark:bg-[#191919] text-zinc-900 dark:text-white relative" >
            <div className='w-fit rounded-sm z-50 fixed left-[88%] sm:left-[63%] lg:left-[78%] bg-zinc-300 dark:bg-zinc-800'>
              <ThemeToggleButton />
            </div>
            {property.headline && <div
              style={{ backgroundImage: `url(${property.cover})` }}
              className={` text-3xl md:text-5xl uppercase font-extrabold h-30 w-full relative bg-cover bg-center bg-no-repeat rounded-sm pl-8 py-8`}>
              <h1 className='text-white mix-blend-difference'>{property.headline}</h1>
            </div>}
            <Render recordMap={recordMap} />
            {<Print targetRef={targetRef} headerRef={headerRef} iconRef={iconRef} />}
          </div>)
        }
      </div>
      <div className='w-[30%] lg:w-[20%] h-full bg-white dark:bg-[#191919] text-zinc-900 dark:text-white hidden sm:block  '>
        <div className='text-[8px] lg:text-sm'>
          <div ref={iconRef} className='w-fit mx-auto py-5'>
            {property.icon && (
              typeof property.icon === 'string' && property.icon.startsWith('http')
                ? (
                  <img
                    src={property.icon}
                    width={140}
                    alt="icon"
                    className="border border-zinc-400 rounded-md object-contain"
                  />
                )
                : (
                  <span className="text-6xl">{property.icon}</span>
                )
            )}
          </div>
          <div ref={headerRef} className='border-b-1 font-bold text-zinc-600 dark:text-zinc-300 px-5 py-3 flex flex-col gap-3'>
            {property.created["start"] && <div className='flex justify-between'>
              <p className='w-20'>Created</p>
              <p>{property.created["start"]}</p>
            </div>}
            {property.deadline["start"] && <div className='flex justify-between'>
              <p className='w-20'>Deadline</p>
              <p>{property.deadline["start"]}</p>
            </div>}
            {property.status && <div className='flex justify-between'>
              <p className='w-20'>Status</p>
              <p className={`dark:bg-zinc-50 bg-zinc-800 dark:text-black text-white border-2 border-${property.color}-500 text-[12px] tracking-wider capitalize border-2 rounded-lg px-2`}><span className={`text-${property.color}-500 text-md`}>• </span>{property.status}</p>
            </div>}
          </div>
        </div>
        <div className='mt-4 pl-5 relative'>
          <input type="checkbox" id="toggle" className="peer hidden" defaultChecked />
          {targetRef.current && <label htmlFor="toggle" className=" cursor-pointer mb-2 font-bold flex ">
            <svg xmlns="http://www.w3.org/2000/svg" className='h-7' viewBox="0 0 24 24" fill="currentColor"><path d="M12.1717 12.0005L9.34326 9.17203L10.7575 7.75781L15.0001 12.0005L10.7575 16.2431L9.34326 14.8289L12.1717 12.0005Z"></path></svg>
            <p className='shiny-text dark:bg-[linear-gradient(120deg,_rgba(255,255,255,1)_35%,_rgba(255,255,255,1)_50%,_rgba(255,255,255,0)_50%,_rgba(255,255,255,0)_50%,_rgba(255,255,255,1)_65%)] bg-[linear-gradient(135deg,_rgba(0,0,0,1)_40%,_rgba(0,0,0,0)_50%,_rgba(0,0,0,1)_60%)] hover:underline'>Related Pages</p>
          </label>}
          <div
            className="max-h-0 overflow-hidden transition-all duration-500 ease-in-out peer-checked:max-h-100"
            ref={targetRef}
          >
          </div>
        </div>
      </div>
    </div>
  )
}
