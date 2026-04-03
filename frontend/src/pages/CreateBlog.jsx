import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newBlog = {
      title,
      slug,
      summary,
      content,
    };

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create blog');
      }

      // Success: redirect to home
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <header className="site-header">
        <div className="header-inner">
          <div className="logo">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="logo-icon">✦</span>
              <span className="logo-text">DevBlog</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container" style={{ maxWidth: '600px', marginTop: '2rem' }}>
        <h1 style={{ marginBottom: '1.5rem' }}>Create New Blog</h1>
        
        {error && (
          <div className="state-box error-box" style={{ marginBottom: '1rem' }}>
            <p className="error-msg">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="search-input"
              style={{ width: '100%', boxSizing: 'border-box' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="search-input"
              placeholder="e.g. my-new-post"
              style={{ width: '100%', boxSizing: 'border-box' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Summary</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="search-input"
              style={{ width: '100%', boxSizing: 'border-box', minHeight: '80px', resize: 'vertical' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Content (HTML allowed)</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="search-input"
              style={{ width: '100%', boxSizing: 'border-box', minHeight: '200px', resize: 'vertical' }}
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={{
              padding: '0.75rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '1rem'
            }}
          >
            {loading ? 'Creating...' : 'Create Blog'}
          </button>
        </form>
      </main>
    </div>
  );
}
