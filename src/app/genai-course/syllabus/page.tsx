import { allSyllabusDocs } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { serialize } from 'next-mdx-remote/serialize';
import MarkdownRenderer from '@/components/markdown-renderer';

export default async function SyllabusPage() {
  const syllabus = allSyllabusDocs.find((doc) => doc._raw.sourceFileName === 'syllabus.mdx');

  if (!syllabus) {
    notFound();
  }

  const mdxSource = await serialize(syllabus.body.raw, {
    // You might need to configure options here if you have custom MDX components or processing
  });

  if (!mdxSource) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{syllabus.title}</h1>
      <p className="text-lg mb-4">Weeks: {syllabus.weeks}</p>
      <p className="text-md mb-8">Status: {syllabus.status}</p>
      <MarkdownRenderer source={mdxSource} />
    </div>
  );
}
