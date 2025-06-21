import React from 'react';
import Link from 'next/link';

interface BlogPostCardProps {
  title: string;
  description: string;
  slug: string;
  date: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ title, description, slug, date }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-xl transition duration-200 ease-in-out">
      <Link href={`/blog/${slug}`}>
        <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 transition duration-200 ease-in-out text-black">{title}</h2>
      </Link>
      <p className="text-gray-700 mb-4">{description}</p>
      <p className="text-gray-500 text-sm">Published on: {date}</p>
    </div>
  );
};

export default BlogPostCard;
