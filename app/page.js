'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setShortUrl('');

    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Something went wrong');
      return;
    }

    setShortUrl(data.shortUrl);
  }

  return (
  <main className="shortener-container">
    <h1>URL Shortener</h1>

    <form className="shortener-form" onSubmit={handleSubmit}>
      <input
        type="url"
        placeholder="https://example.com"
        value={url}
        onChange={e => setUrl(e.target.value)}
        required
      />
      <button type="submit">Shorten</button>
    </form>

    <p className="url-rule">
      Link must include <strong>http://</strong> or <strong>https://</strong>
    </p>

    {shortUrl && (
      <div className="short-url-result">
        Short URL:&nbsp;
        <a href={shortUrl} target="_blank" rel="noopener noreferrer">
          {shortUrl}
        </a>
      </div>
    )}

    {error && <div className="error-text">{error}</div>}
  </main>
  );
}
