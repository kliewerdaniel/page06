import { allModuleDocs } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { serialize } from 'next-mdx-remote/serialize';
import MarkdownRenderer from '@/components/markdown-renderer';
import { InfoBlock, SectionTitle, SubSectionTitle, ChecklistItem } from '@/app/genai-course/components';

const customComponents = {
  InfoBlock,
  SectionTitle,
  SubSectionTitle,
  ChecklistItem,
};

interface ModulePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ModulePage({ params }: ModulePageProps) {
  const resolvedParams = await params;
  const currentModule = allModuleDocs.find((doc) => doc.slug === resolvedParams.slug);

  if (!currentModule) {
    notFound();
  }

  const mdxSource = await serialize(currentModule.body.raw, {
    // You might need to configure options here if you have custom MDX components or processing
  });

  if (!mdxSource) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{currentModule.title}</h1>
      <p className="text-lg mb-4">Weeks: {currentModule.weeks}</p>
      <p className="text-md mb-8">Status: {currentModule.status}</p>
      <MarkdownRenderer source={mdxSource} components={customComponents} />
      <p className="text-lg mt-8 mb-8">
        This course is offered completely free of charge! If you find value in this content and would like to support the creator, you can{' '}
        <a href="https://www.paypal.com/ncp/payment/H4FUU55N9V7CW" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          send a tip via PayPal
        </a>. Your support is greatly appreciated!
      </p>
    </div>
  );
}
