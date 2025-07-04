import { allSyllabusDocs } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { serialize } from 'next-mdx-remote/serialize';
import MarkdownRenderer from '@/components/markdown-renderer';
import { InfoBlock, SectionTitle, SubSectionTitle, CustomTable, ChecklistItem } from '../components';
import React from 'react';

// Define a generic type for MDX components to satisfy ESLint and MDXRemote
type MDXComponent = React.ComponentType<{ children?: React.ReactNode; [key: string]: unknown }>;

export default async function SyllabusPage() {
  const syllabus = allSyllabusDocs.find((doc: { _raw: { sourceFileName: string } }) => doc._raw.sourceFileName === 'syllabus.mdx');

  if (!syllabus) {
    notFound();
  }

  const mdxSource = await serialize(syllabus.body.raw, {
    // You might need to configure options here if you have custom MDX components or processing
  });

  if (!mdxSource) {
    notFound();
  }

  const customComponents: Record<string, MDXComponent> = {
    InfoBlock: InfoBlock as MDXComponent,
    SectionTitle: SectionTitle as MDXComponent,
    SubSectionTitle: SubSectionTitle as MDXComponent,
    CustomTable: CustomTable as MDXComponent, // Keep CustomTable defined for other uses if any
    ChecklistItem: ChecklistItem as MDXComponent,
    // You can also override default HTML elements if needed, e.g.,
    // h1: (props) => <h1 className="text-5xl font-extrabold my-8" {...props} />,
    // table: CustomTable as MDXComponent, // Removed explicit override for now
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{syllabus.title}</h1>
      <p className="text-lg mb-4">Weeks: {syllabus.weeks}</p>
      <p className="text-md mb-8">Status: {syllabus.status}</p>
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
