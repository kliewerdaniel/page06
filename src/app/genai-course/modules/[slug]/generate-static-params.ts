import { allModuleDocs } from 'contentlayer/generated';

export async function generateStaticParams() {
  return allModuleDocs.map((module) => ({
    slug: module.slug,
  }));
}
