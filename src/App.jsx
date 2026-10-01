import React, { useState, useEffect } from 'react';
import { getQuestionPapers, createQuestionPaper } from './lib/supabase';

export default function App() {
  // Authentication State
  const [user, setUser] = useState(() => {
    return localStorage.getItem('ssn_user') || '';
  });
  const [emailInput, setEmailInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Question Papers State
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Upload Form State
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploading, setUploading] = useState(false);

  // Expanded Papers (for reading)
  const [expandedPapers, setExpandedPapers] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  // Load papers on mount
  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getQuestionPapers();
      setPapers(res.data || []);
      setLoading(false);
    }
    load();
  }, []);

  // Handle Sign In
  const handleSignIn = (e) => {
    e.preventDefault();
    setAuthError('');

    const trimmed = emailInput.trim().toLowerCase();

    if (!trimmed) {
      setAuthError('Enter your email address.');
      return;
    }

    if (!trimmed.endsWith('@ssn.edu.in')) {
      setAuthError('Access denied: Email must end with @ssn.edu.in');
      return;
    }

    setUser(trimmed);
    localStorage.setItem('ssn_user', trimmed);
    setEmailInput('');
  };

  // Handle Sign Out
  const handleSignOut = () => {
    setUser('');
    localStorage.removeItem('ssn_user');
  };

  // Handle Upload
  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadError('');
    setUploadSuccess('');

    const trimmedTitle = title.trim();
    const trimmedText = text.trim();

    if (!trimmedTitle) {
      setUploadError('Provide a paper title.');
      return;
    }

    if (!trimmedText) {
      setUploadError('Provide the question paper text content.');
      return;
    }

    if (!user) {
      setUploadError('You must sign in with your @ssn.edu.in email to upload.');
      return;
    }

    setUploading(true);

    try {
      const res = await createQuestionPaper({
        paper_name: trimmedTitle,
        paper_text: trimmedText,
        uploaded_by: user
      });

      // Update local state immediately
      setPapers((prev) => [res.data, ...prev.filter(p => p.id !== res.data.id)]);
      setTitle('');
      setText('');
      setUploadSuccess('Paper uploaded successfully.');
      setTimeout(() => setUploadSuccess(''), 4000);
    } catch (err) {
      setUploadError('Upload failed: ' + (err.message || 'Unknown error'));
    } finally {
      setUploading(false);
    }
  };

  // Toggle expand
  const toggleExpand = (id) => {
    setExpandedPapers((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Copy paper text
  const handleCopy = (id, content) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Filter papers
  const filteredPapers = papers.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.paper_name?.toLowerCase().includes(q) ||
      p.paper_text?.toLowerCase().includes(q) ||
      p.uploaded_by?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="container">
      {/* Header */}
      <header>
        <div>
          <h1>SSN Question Papers</h1>
          <p className="text-muted">Student question paper repository</p>
        </div>

        <div>
          {user ? (
            <div className="row">
              <span style={{ fontSize: '0.85rem' }}>{user}</span>
              <button type="button" className="btn-outline btn-small" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          ) : (
            <span className="text-muted" style={{ fontSize: '0.85rem' }}>Not signed in</span>
          )}
        </div>
      </header>

      {/* Sign In Box (Only shown when not signed in) */}
      {!user && (
        <section className="box">
          <h2>Sign In</h2>
          <p className="text-muted" style={{ marginBottom: '12px' }}>
            Only SSN institutional emails ending in <strong>@ssn.edu.in</strong> are allowed. No password needed.
          </p>

          {authError && <div className="error-msg">{authError}</div>}

          <form onSubmit={handleSignIn}>
            <div className="form-group">
              <label htmlFor="signin-email">SSN Email</label>
              <input
                id="signin-email"
                type="email"
                placeholder="srikrishna2412069@ssn.edu.in"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
            </div>

            <div className="row">
              <button type="submit">Sign In</button>
              <button
                type="button"
                className="btn-outline btn-small"
                onClick={() => {
                  setEmailInput('srikrishna2412069@ssn.edu.in');
                  setAuthError('');
                }}
              >
                Use sample email
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Upload Box (Only shown when signed in) */}
      {user && (
        <section className="box">
          <h2>Upload Question Paper</h2>

          {uploadError && <div className="error-msg">{uploadError}</div>}
          {uploadSuccess && <div className="success-msg">{uploadSuccess}</div>}

          <form onSubmit={handleUpload}>
            <div className="form-group">
              <label htmlFor="paper-name">Question Paper Title</label>
              <input
                id="paper-name"
                type="text"
                placeholder="e.g. Data Structures - CAT 1 (2024)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="paper-text">Paper Content (Text Only)</label>
              <textarea
                id="paper-text"
                placeholder="Paste question paper text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <button type="submit" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload Paper'}
            </button>
          </form>
        </section>
      )}

      {/* Papers Section */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <h2>Available Papers ({filteredPapers.length})</h2>
          <div style={{ width: '260px' }}>
            <input
              type="text"
              placeholder="Search papers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '6px 8px', fontSize: '0.85rem' }}
            />
          </div>
        </div>

        {loading ? (
          <p className="text-muted">Loading papers...</p>
        ) : filteredPapers.length === 0 ? (
          <div className="box-gray">
            <p className="text-muted">No question papers found.</p>
          </div>
        ) : (
          filteredPapers.map((paper) => {
            const isExpanded = expandedPapers[paper.id];
            const dateStr = paper.created_at ? new Date(paper.created_at).toLocaleDateString() : 'N/A';

            return (
              <article key={paper.id} className="paper-item">
                <div className="paper-title">{paper.paper_name}</div>
                <div className="paper-meta">
                  Uploaded by: <strong>{paper.uploaded_by}</strong> | Date: {dateStr}
                </div>

                <pre className={`paper-content ${isExpanded ? 'expanded' : ''}`}>
                  {paper.paper_text}
                </pre>

                <div className="paper-actions">
                  <button
                    type="button"
                    className="btn-outline btn-small"
                    onClick={() => toggleExpand(paper.id)}
                  >
                    {isExpanded ? 'Show Less' : 'Show Full Paper'}
                  </button>

                  <button
                    type="button"
                    className="btn-outline btn-small"
                    onClick={() => handleCopy(paper.id, paper.paper_text)}
                  >
                    {copiedId === paper.id ? 'Copied!' : 'Copy Text'}
                  </button>
                </div>
              </article>
            );
          })
        )}
      </section>

      <footer>
        <span>SSN Question Papers</span>
        <span>Institutional access: @ssn.edu.in</span>
      </footer>
    </div>
  );
}
