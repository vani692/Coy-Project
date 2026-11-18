'use client';

import { useEffect, useState } from 'react';

export default function MatchesTab() {
  const [matches, setMatches] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/matches', { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error('matches failed');
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setMatches(data.matches);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="discover" aria-label="Matches" style={{ padding: 0 }}>
      <header className="screen-header">
        <h1>Matches</h1>
      </header>

      {error && (
        <div className="state">
          <h2>Couldn&apos;t load matches</h2>
          <p>Refresh the page to try again.</p>
        </div>
      )}

      {!error && matches === null && (
        <div className="state">
          <p>Loading matches…</p>
        </div>
      )}

      {!error && matches && matches.length === 0 && (
        <div className="state">
          <h2>No matches yet</h2>
          <p>When you and someone both like each other, they will appear here.</p>
        </div>
      )}

      {!error && matches && matches.length > 0 && (
        <ul className="match-list">
          {matches.map((m) => (
            <li key={m.id} className="match-item">
              <img className="match-thumb" src={m.photo} alt={m.name} />
              <div>
                <p className="match-name">
                  {m.name}, {m.age}
                </p>
                <p className="match-meta">{m.city}</p>
                <p className="match-bio">{m.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
