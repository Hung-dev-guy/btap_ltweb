import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setBlog(null);

    fetch(`/api/blogs/slug/${slug}`)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((body) => {
            throw new Error(body.error || `Server error: ${res.status}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  return (
    <div className="page">
      {/* Header */}
      <header className="site-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">✦</span>
            <span className="logo-text">DevBlog</span>
          </div>
          <p className="header-tagline">Insights for modern developers</p>
        </div>
      </header>

      <main className="container detail-container">
        <Link to="/" className="back-link">← Back to all articles</Link>

        {loading && (
          <div className="state-box">
            <div className="spinner" />
            <p>Loading article…</p>
          </div>
        )}

        {error && (
          <div className="state-box error-box">
            <p className="error-title">⚠ Could not load article</p>
            <p className="error-msg">{error}</p>
            <Link to="/" className="btn-home">← Back to list</Link>
          </div>
        )}

        {!loading && !error && blog && (
          <article className="article">
            <header className="article-header">
              <h1 className="article-title">{blog.title}</h1>
              <div className="article-meta">
                {blog.author && (
                  <span className="article-author">
                    <span className="author-avatar">{blog.author[0]}</span>
                    {blog.author}
                  </span>
                )}
                {blog.createdAt && (
                  <span className="article-date">{formatDate(blog.createdAt)}</span>
                )}
              </div>
            </header>
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>
        )}
      </main>

      <footer className="site-footer">
        <p>© 2024 DevBlog · Built with React + Node.js</p>
      </footer>
    </div>
  );
}
