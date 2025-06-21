import { getPostData, getAllPostSlugs } from '../../../lib/posts';
import BlogPostClient from '@/components/blog-post-client';
import type { Metadata, NextPage } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const typedParams = params as { slug: string };
  const postData = await getPostData(typedParams.slug);
  return {
    title: postData.title,
    description: postData.description,
  };
}

export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts;
}

const Post: NextPage<PageProps> = async ({ params }) => {
  const typedParams = params as { slug: string };
  const postData = await getPostData(typedParams.slug);

  return (
    <BlogPostClient postData={postData} />
  );
};

export default Post;
