import { getPostData, getAllPostSlugs } from '@/lib/posts';
import BlogPostClient from '@/components/blog-post-client';
import type { Metadata } from 'next';

interface Props {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const postData = await getPostData(params.slug);
  return {
    title: postData.title,
    description: postData.description,
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = getAllPostSlugs(); // returns string[] like ['post-1', 'post-2']
  return slugs.map((slug) => ({ slug }));
}

export default async function Post({ params }: Props) {
  const postData = await getPostData(params.slug);
  return <BlogPostClient postData={postData} />;
}