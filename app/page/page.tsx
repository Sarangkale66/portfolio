"use client";
import { useTheme } from '@/components/ContextAPI';
import { getProjects } from '@/lib/notion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type postType = {
  id: string;
  title: string;
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
            <Link key={post.id} className='text-green-400 block w-fit my-3.5' href={`/page/${post.id}`} prefetch>
              {post.title}
            </Link>
          ))}
        </ul>
      </div>
    )
  );
}