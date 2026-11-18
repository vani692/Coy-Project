'use client';

export default function MatchModal({ profile, onClose }) {
  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="match-title">
      <div className="match-card">
        <h2 id="match-title">It&apos;s a match!</h2>
        <img className="match-photo" src={profile.photo} alt={profile.name} />
        <p>You and {profile.name} liked each other.</p>
        <button type="button" className="btn primary" onClick={onClose} autoFocus>
          Keep discovering
        </button>
      </div>
    </div>
  );
}
