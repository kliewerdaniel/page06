import { getAllPostSlugs } from "@/lib/posts";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}
