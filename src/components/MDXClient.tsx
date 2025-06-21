"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import React from "react";

interface MDXClientProps {
  source: MDXRemoteSerializeResult;
  components?: Record<string, React.ComponentType>;
}

export default function MDXClient({ source, components }: MDXClientProps) {
  return <MDXRemote {...source} components={components} />;
}
