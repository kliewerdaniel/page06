"use client";
import { useState, useEffect, useRef } from 'react';
import { getSortedPostsData, PostData } from '../../lib/posts';

const POSTS_PER_PAGE = 10;

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
    <div>
      {posts.map((post) => (
        <div key={post.slug}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
      ))}
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more posts to load.</p>}
      <div ref={containerRef} style={{ height: '20px' }} />
    </div>
  );
}
