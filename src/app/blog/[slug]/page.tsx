import { notFound } from "next/navigation";
import { getPostData } from "@/lib/posts";
import MarkdownRenderer from "@/components/markdown-renderer";

export { generateStaticParams } from "./generate-static-params";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page(props: any) {
  const { params } = props;

  const post = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl dark:prose-invert mx-auto" style={{fontSize: '1.1rem', lineHeight: '1.75'}}>
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
