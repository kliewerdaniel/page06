import { allModuleDocs } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { serialize } from 'next-mdx-remote/serialize';
import MarkdownRenderer from '@/components/markdown-renderer';

interface ModulePageProps {
  params: {
    slug: string;
  };
}

export default async function ModulePage({ params }: ModulePageProps) {
  const module = allModuleDocs.find((doc) => doc.slug === params.slug);

  if (!module) {
    notFound();
  }

  const mdxSource = await serialize(module.body.raw, {
    // You might need to configure options here if you have custom MDX components or processing
  });

  if (!mdxSource) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{module.title}</h1>
      <p className="text-lg mb-4">Weeks: {module.weeks}</p>
      <p className="text-md mb-8">Status: {module.status}</p>
      <MarkdownRenderer source={mdxSource} />
    </div>
  );
}
