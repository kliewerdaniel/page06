type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  return (
    <main>
      <h1>Blog Post: {slug}</h1>
      <p>More content coming soon.</p>
    </main>
  );
}
