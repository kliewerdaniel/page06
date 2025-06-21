import { getAllPostSlugs } from "@/lib/posts";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}
