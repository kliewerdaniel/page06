import { getPostData, getAllPostSlugs } from '@/lib/posts';
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

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = getAllPostSlugs(); // must return array of { slug }
  return slugs.map((slug) => ({ slug }));
}

export default async function Page(props: PageProps) {
  const { slug } = props.params;
  const postData = await getPostData(slug);
  return <BlogPostClient postData={postData} />;
}
