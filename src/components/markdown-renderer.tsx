import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import remarkGfm from "remark-gfm";
import rehypePrismPlus from "rehype-prism-plus";

interface MarkdownRendererProps {
  source: MDXRemoteSerializeResult;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ source }) => {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <MDXRemote {...source} components={{}} />
    </div>
  );
};

export default MarkdownRenderer;
