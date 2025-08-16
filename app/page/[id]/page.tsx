'use client'
import { RefObject, use, useEffect, useRef, useState } from 'react'
import NotionPage from '../../../components/NotionPage'
import { getPageContent, getPageProperties, getProjects } from '@/lib/notion'
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
import { useTheme } from '@/components/ContextAPI'

interface PageLinkType {
  title?: string;
  pageId?: string
}

type postType = {
  id: string;
  title: string;
  icon: string | null;
  cover: string | null;
  properties: any;
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

  const { LoadingScreenDown } = useTheme();
  const [posts, setPosts] = useState<postType[]>([]);
  useEffect(() => {
    getProjects()
      .then((post) => {
        console.log(post);
        setPosts(post);
        console.log(post);

        setTimeout(() => {
          LoadingScreenDown();
        }, 2000);
      }).catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const fetchRecordMap = async () => {
      try {
        setLoading(true)
        const properties = await getPageProperties(id);
        const data = await getPageContent(id);
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
      <div className='scrollbar1 hidden h-full w-[30%] overflow-y-auto lg:block '>
        {posts.length > 0 && (
          <div className='inter-para relative'>
            <h1 className="py-5 px-5 sticky top-0 z-50 dark:bg-zinc-900 bg-white dark:text-white border-b border-zinc-950 dark:border-zinc-700 text-2xl font-bold playwrite-head underline">Projects</h1>
            <div className="grid grid-cols-1 gap-2 px-4 py-3">
              {posts.map((post: postType) => (
                <Link
                  key={post.id}
                  href={`/page/${post.id}`}
                  prefetch
                  className="relative block rounded-[2px] overflow-hidden shadow-lg group"
                >
                  {post.icon && (
                    typeof post.icon === "string" && post.icon.startsWith("http") ? (
                      <img src={post.icon} alt="" className="w-6 h-6 rounded absolute left-1.5 top-1.5 inset-0 z-40" />
                    ) : (
                      <span className="text-2xl absolute inset-0 z-40">{post.icon}</span>
                    )
                  )}

                  <button className='absolute min-w-1/4 right-0 z-40 text-[10px] px-3 py-0.5 text-white dark:text-black dark:bg-white font-extrabold bg-black'>{post.properties.Status.status.name}</button>

                  {post.cover ? (
                    <div
                      className="h-38 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url(${post.cover})` }}
                    />
                  ) :
                    <svg
                      className="h-48 w-full bg-blue-50 transition-transform duration-300 group-hover:scale-105"
                      viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="120" height="120"></rect> <path
                        className="animate-pulse" fillRule="evenodd" clipRule="evenodd" d="M33.2503 38.4816C33.2603 37.0472 34.4199 35.8864 35.8543 35.875H83.1463C84.5848 35.875 85.7503 37.0431 85.7503 38.4816V80.5184C85.7403 81.9528 84.5807 83.1136 83.1463 83.125H35.8543C34.4158 83.1236 33.2503 81.957 33.2503 80.5184V38.4816ZM80.5006 41.1251H38.5006V77.8751L62.8921 53.4783C63.9172 52.4536 65.5788 52.4536 66.6039 53.4783L80.5006 67.4013V41.1251ZM43.75 51.6249C43.75 54.5244 46.1005 56.8749 49 56.8749C51.8995 56.8749 54.25 54.5244 54.25 51.6249C54.25 48.7254 51.8995 46.3749 49 46.3749C46.1005 46.3749 43.75 48.7254 43.75 51.6249Z" fill="#687787">
                      </path> </g></svg>
                  }

                  <div className="absolute top-0 inset-0 bg-black/40 flex flex-col justify-end text-white">
                    <div className="items-center gap-2 border text-white rounded-t-xl dark:text-black bg-zinc-950 dark:bg-white flex rounded-[2px] justify-center w-fit mx-auto px-2">
                      <h2 className="text-sm font-extrabold uppercase">{post.title}</h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>)}
      </div>
      <div className='scrollbar scrollbar1 overflow-y-scroll w-full sm:w-[70%] border-l-1 border-r-1 border-zinc-700 ' >
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
          </div>) : (<div className="inter-para  px-4 lg:px-10 py-15 bg-white dark:bg-[#191919] text-zinc-900 dark:text-white relative" >
            <div className='w-fit rounded-sm z-50 fixed left-[88%] sm:left-[63%] lg:left-[78%] bg-zinc-300 dark:bg-zinc-800'>
              <ThemeToggleButton />
            </div>
            {property.headline && <div
              style={{ backgroundImage: `url(${property.cover})` }}
              className={` text-3xl md:text-5xl uppercase font-extrabold h-30 w-full relative bg-cover bg-center bg-no-repeat rounded-sm flex items-end`}>
              <h1 className='text-white dark:text-black bg-zinc-950 dark:bg-white text-right px-2 w-fit rounded'>{property.headline}</h1>
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
            {property.created && property.created["start"] && <div className='flex justify-between'>
              <p className='w-20'>Created</p>
              <p>{property.created["start"]}</p>
            </div>}
            {property.deadline && property.deadline["start"] && <div className='flex justify-between'>
              <p className='w-20'>Deadline</p>
              <p>{property.deadline["start"]}</p>
            </div>}
            {property.status && <div className='flex justify-between'>
              <p className='w-20'>Status</p>
              <p className={`dark:bg-zinc-50 bg-zinc-800 dark:text-black text-white border-2 border-${property.color}-500 text-[12px] tracking-wider capitalize border-2 px-1.5`}><span className={`text-${property.color}-500 text-md`}>• </span>{property.status}</p>
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
