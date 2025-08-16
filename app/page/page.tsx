"use client";
import { useTheme } from '@/components/ContextAPI';
import { getProjects } from '@/lib/notion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type postType = {
  id: string;
  title: string;
  icon: string | null;
  cover: string | null;
  properties: any;
}

export default function Projects() {
  const { LoadingScreenDown } = useTheme();
  const [posts, setPosts] = useState<postType[]>([]);
  useEffect(() => {
    getProjects()
      .then((post) => {
        setPosts(post);
        setTimeout(() => {
          LoadingScreenDown();
        }, 2000);
      }).catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    posts.length > 0 && (
      <div>
        <h1>Projects</h1>
        <ul>
          {posts.map((post: postType) => (
            <Link key={post.id}
              href={`/page/${post.id}`}
              prefetch
              className="relative block rounded-lg overflow-hidden shadow-lg group">
              {post.cover ? (
                <div
                  className="h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url(${post.cover})` }}
                />
              ) :
                <svg
                  className="h-48 w-full bg-blue-50 transition-transform duration-300 group-hover:scale-105"
                  viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="120" height="120" fill="#EFF1F3"></rect> <path fillRule="evenodd" clipRule="evenodd" d="M33.2503 38.4816C33.2603 37.0472 34.4199 35.8864 35.8543 35.875H83.1463C84.5848 35.875 85.7503 37.0431 85.7503 38.4816V80.5184C85.7403 81.9528 84.5807 83.1136 83.1463 83.125H35.8543C34.4158 83.1236 33.2503 81.957 33.2503 80.5184V38.4816ZM80.5006 41.1251H38.5006V77.8751L62.8921 53.4783C63.9172 52.4536 65.5788 52.4536 66.6039 53.4783L80.5006 67.4013V41.1251ZM43.75 51.6249C43.75 54.5244 46.1005 56.8749 49 56.8749C51.8995 56.8749 54.25 54.5244 54.25 51.6249C54.25 48.7254 51.8995 46.3749 49 46.3749C46.1005 46.3749 43.75 48.7254 43.75 51.6249Z" fill="#687787"></path> </g></svg>
              }

              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white">
                <div className="flex items-center gap-2">
                  {post.icon && (
                    typeof post.icon === "string" && post.icon.startsWith("http") ? (
                      <img src={post.icon} alt="" className="w-6 h-6 rounded" />
                    ) : (
                      <span className="text-2xl">{post.icon}</span>
                    )
                  )}
                  <h2 className="text-lg font-semibold">{post.title}</h2>
                </div>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    )
  );
}