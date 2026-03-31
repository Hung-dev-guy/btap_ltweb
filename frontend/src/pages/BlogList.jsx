import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.summary.toLowerCase().includes(search.toLowerCase())
  );

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

      <main className="container">
        {/* Search Bar */}
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch('')}>
              ✕
            </button>
          )}
        </div>

        {/* States */}
        {loading && (
          <div className="state-box">
            <div className="spinner" />
            <p>Loading articles…</p>
          </div>
        )}

        {error && (
          <div className="state-box error-box">
            <p className="error-title">⚠ Failed to load blogs</p>
            <p className="error-msg">{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="state-box">
            <p>No articles found matching "<strong>{search}</strong>".</p>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && !error && (
          <div className="blog-grid">
            {filtered.map((blog) => (
              <Link to={`/blog/${blog.slug}`} key={blog.id} className="blog-card">
                <div className="card-accent" />
                <div className="card-body">
                  <div className="card-meta">
                    <span className="card-author">{blog.author}</span>
                    <span className="card-dot">·</span>
                    <span className="card-date">{formatDate(blog.createdAt)}</span>
                  </div>
                  <h2 className="card-title">{blog.title}</h2>
                  <p className="card-summary">{blog.summary}</p>
                  <span className="card-cta">Read article →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className="site-footer">
        <p>© 2024 DevBlog · Built with React + Node.js</p>
      </footer>
    </div>
  );
}
