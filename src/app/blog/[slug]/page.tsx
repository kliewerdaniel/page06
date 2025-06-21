import { notFound } from "next/navigation";
import { getPostData, getAllPostSlugs } from "@/lib/posts";
import MarkdownRenderer from "@/components/markdown-renderer";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Page({ params }: PageProps) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl dark:prose-invert mx-auto">
        <h1>{post.title}</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        {post.serializedContent && (
          <MarkdownRenderer source={post.serializedContent} />
        )}
      </article>
    </main>
  );
}
