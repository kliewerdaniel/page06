// src/app/blog/[slug]/page.tsx

import { getPostData, getAllPostSlugs } from '@/lib/posts';
import BlogPostClient from '@/components/blog-post-client';
import type { Metadata, NextPage } from 'next';

interface PageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const postData = await getPostData(params.slug);
  return {
    title: postData.title,
    description: postData.description,
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = getAllPostSlugs(); // should return: ['slug1', 'slug2']
  return slugs.map((slug) => ({ slug }));
}

const Post: NextPage<PageProps> = async ({ params }) => {
  const postData = await getPostData(params.slug);
  return <BlogPostClient postData={postData} />;
};

export default Post;