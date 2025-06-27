"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import React from "react";

interface MarkdownRendererProps {
  source: MDXRemoteSerializeResult;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components?: Record<string, React.ComponentType<any>>;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ source, components }) => {
  return (
    <div className="prose dark:prose-invert max-w-none [&>h2]:text-4xl [&>h3]:text-3xl [&>h4]:text-2xl [&>p]:mb-6 [&>ul]:mb-6 [&>ol]:mb-6">
      <MDXRemote {...source} components={components} />
    </div>
  );
};

export default MarkdownRenderer;
