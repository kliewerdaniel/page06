"use client";
import { useState, useEffect, useRef } from 'react';
import { getSortedPostsData, PostData } from '../../lib/posts';
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import Link from 'next/link';

const POSTS_PER_PAGE = 10;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function BlogPage() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const newPosts = await getSortedPostsData(POSTS_PER_PAGE, page * POSTS_PER_PAGE);
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setLoading(false);
      if (newPosts.length < POSTS_PER_PAGE) {
        setHasMore(false);
      }
    };

    fetchPosts();
  }, [page]);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    observer.current = new IntersectionObserver(handleObserver);
    if (containerRef.current) {
      observer.current.observe(containerRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore, loading]);

  return (
    <section className="container py-12">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center text-4xl font-bold tracking-widest animate-flicker"
      >
        Blog Posts
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {posts.map((post) => (
          <motion.div key={post.slug} variants={itemVariants}>
            <Card className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-accent hover:underline relative overflow-hidden group"
                >
                  <span className="relative z-10">Read more</span>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more posts to load.</p>}
      <div ref={containerRef} style={{ height: '20px' }} />
    </section>
  );
}
