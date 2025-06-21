import { getSortedPostsData } from '../../lib/posts';

export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div>
      {allPostsData.map((post) => (
        <div key={post.slug}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
}
