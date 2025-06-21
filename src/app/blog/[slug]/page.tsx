import { getPostData, getAllPostSlugs } from '../../../lib/posts';
import BlogPostClient from '@/components/blog-post-client';
import type { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const postData = await getPostData(params.slug);
  return {
    title: postData.title,
    description: postData.description,
  };
}

export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts;
}

export default async function Post({ params }: PageProps) {
  const postData = await getPostData(params.slug);

  return (
    <BlogPostClient postData={postData} />
  );
}
