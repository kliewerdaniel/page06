import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkMath from 'remark-math';
// Removed rehypeHighlight as it's causing issues. Will investigate alternative or compatible versions later.
// import rehypeHighlight from 'rehype-highlight';
// Removed rehypeKatex as it's causing issues. Will investigate alternative or compatible versions later.
// import rehypeKatex from 'rehype-katex';

const ModuleDoc = defineDocumentType(() => ({
  name: 'ModuleDoc',
  filePathPattern: `modules/*/page.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    weeks: { type: 'string', required: true },
    status: { type: 'string', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/')[doc._raw.flattenedPath.split('/').length - 2],
    },
  },
}));

const JournalDoc = defineDocumentType(() => ({
  name: 'JournalDoc',
  filePathPattern: `journal/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').pop(),
    },
  },
}));

const SyllabusDoc = defineDocumentType(() => ({
  name: 'SyllabusDoc',
  filePathPattern: `syllabus.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    weeks: { type: 'string', required: true },
    status: { type: 'string', required: true },
  },
}));

export default makeSource({
  contentDirPath: 'src/app/genai-course',
  documentTypes: [ModuleDoc, JournalDoc, SyllabusDoc],
  mdx: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [], // Removed rehypeKatex
  },
});
