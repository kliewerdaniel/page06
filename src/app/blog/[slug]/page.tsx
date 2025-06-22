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
    <main className="flex justify-center py-8">
      <article className="w-full max-w-3xl px-4 prose lg:prose-xl dark:prose-invert">
        <h1 className="text-5xl font-bold mb-8 text-center">{post.title}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-12">
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
