"use client";
import { useTheme } from '@/components/ContextAPI';
import { getProjects } from '@/lib/notion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Projects() {
  const { LoadingScreenDown } = useTheme();
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    getProjects()
      .then((post) => {
        setPosts(post);
        setTimeout(() => {
          LoadingScreenDown();
        }, 2000);
      }).catch((error) => {

      });
  }, []);

  return (
    posts.length > 0 && (
      <div>
        <h1>Projects</h1>
        <ul>
          {posts.map((post: any) => (
            <Link key={post.id} className='text-green-400 block w-fit my-3.5' href={`/page/${post.id}`} prefetch>
              {post.title}
            </Link>
          ))}
        </ul>
      </div>
    )
  );
}