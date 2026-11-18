'use client';

import { useCallback, useEffect, useState } from 'react';
import SwipeCard from './SwipeCard';
import MatchModal from './MatchModal';

// Time for the fly-out animation before the card is removed from the deck.
const EXIT_MS = 300;

export default function DiscoverTab() {
  const [queue, setQueue] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [exitDir, setExitDir] = useState(null);     // 'left' | 'right' | null
  const [matchedProfile, setMatchedProfile] = useState(null);
  const [toast, setToast] = useState(null);

  const loadFeed = useCallback(async () => {
    setStatus('loading');
    try {
      const res = await fetch('/api/feed', { cache: 'no-store' });
      if (!res.ok) throw new Error('feed failed');
      const data = await res.json();
      setQueue(data.profiles);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  const showToast = useCallback((text) => {
    setToast(text);
    setTimeout(() => setToast(null), 1800);
  }, []);

  const swipe = useCallback(
    (dir) => {
      if (exitDir || queue.length === 0 || matchedProfile) return;

      const current = queue[0];
      const action = dir === 'right' ? 'like' : 'pass';

      // Play the fly-out, then take the card off the deck. The server call
      // runs in the background, so the next card appears immediately.
      setExitDir(dir);
      setTimeout(() => {
        setQueue((q) => q.filter((p) => p.id !== current.id));
        setExitDir(null);
        showToast(action === 'like' ? `Liked ${current.name}` : `Passed on ${current.name}`);

        fetch('/api/swipe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profileId: current.id, action }),
        })
          .then(async (res) => {
            const data = await res.json().catch(() => ({}));
            // 409 means the swipe was already saved, so it is safe to ignore.
            if (!res.ok && res.status !== 409) throw new Error(data.error || 'Swipe failed');
            if (data.matched) setMatchedProfile(data.profile);
          })
          .catch(() => {
            showToast("Couldn't save that swipe. Reloading.");
            loadFeed();
          });
      }, EXIT_MS);
    },
    [exitDir, queue, matchedProfile, showToast, loadFeed]
  );

  // Arrow keys on desktop.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') swipe('right');
      if (e.key === 'ArrowLeft') swipe('left');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [swipe]);

  const topId = queue[0]?.id;
  const visible = queue.slice(0, 2);
  const hasCards = queue.length > 0;

  return (
    <section className="discover" aria-label="Discover">
      <header className="screen-header">
        <h1>Discover</h1>
      </header>

      <div className="deck">
        {status === 'loading' && (
          <div className="state">
            <p>Finding people for you…</p>
          </div>
        )}

        {status === 'error' && (
          <div className="state">
            <h2>Couldn&apos;t load profiles</h2>
            <p>Check your connection, then try again.</p>
            <button type="button" className="btn primary" onClick={loadFeed}>
              Try again
            </button>
          </div>
        )}

        {status === 'ready' && !hasCards && (
          <div className="state">
            <h2>You&apos;re all caught up</h2>
            <p>You have seen everyone for now. Check back later for new people.</p>
            <button type="button" className="btn" onClick={loadFeed}>
              Refresh
            </button>
          </div>
        )}

        {status === 'ready' &&
          [...visible].reverse().map((profile) => (
            <SwipeCard
              key={profile.id}
              profile={profile}
              isTop={profile.id === topId}
              exitDir={profile.id === topId ? exitDir : null}
              onSwipe={swipe}
            />
          ))}
      </div>

      {status === 'ready' && hasCards && (
        <div className="actions">
          <button
            type="button"
            className="action pass"
            onClick={() => swipe('left')}
            disabled={!!exitDir}
            aria-label="Pass"
          >
            ✕
          </button>
          <button
            type="button"
            className="action like"
            onClick={() => swipe('right')}
            disabled={!!exitDir}
            aria-label="Like"
          >
            ♥
          </button>
        </div>
      )}

      {matchedProfile && (
        <MatchModal profile={matchedProfile} onClose={() => setMatchedProfile(null)} />
      )}

      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </section>
  );
}
