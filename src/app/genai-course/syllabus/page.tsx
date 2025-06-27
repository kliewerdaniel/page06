import { allSyllabusDocs } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { serialize } from 'next-mdx-remote/serialize';
import MarkdownRenderer from '@/components/markdown-renderer';
import { InfoBlock, SectionTitle, SubSectionTitle, CustomTable, ChecklistItem } from '../components';

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

  const customComponents: Record<string, React.ComponentType<any>> = {
    InfoBlock: InfoBlock as React.ComponentType<any>,
    SectionTitle: SectionTitle as React.ComponentType<any>,
    SubSectionTitle: SubSectionTitle as React.ComponentType<any>,
    CustomTable: CustomTable as React.ComponentType<any>,
    ChecklistItem: ChecklistItem as React.ComponentType<any>,
    // You can also override default HTML elements if needed, e.g.,
    // h1: (props) => <h1 className="text-5xl font-extrabold my-8" {...props} />,
    // table: CustomTable, // This line would be used if you wanted to replace all <table> tags
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{syllabus.title}</h1>
      <p className="text-lg mb-4">Weeks: {syllabus.weeks}</p>
      <p className="text-md mb-8">Status: {syllabus.status}</p>
      <MarkdownRenderer source={mdxSource} components={customComponents} />
    </div>
  );
}
