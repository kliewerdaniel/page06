import { getPostData, getAllPostSlugs } from '../../../lib/posts';
import BlogPostClient from '@/components/blog-post-client';
import type { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    then: Promise<any>['then'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch: Promise<any>['catch'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    finally: Promise<any>['finally'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [Symbol.toStringTag]: Promise<any>[typeof Symbol.toStringTag];
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
