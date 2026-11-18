'use client';

import { useRef, useState } from 'react';

// How far (px) a drag must travel before it counts as a swipe.
const THRESHOLD = 100;
const FLY_OUT = 1000;

export default function SwipeCard({ profile, isTop, exitDir, onSwipe }) {
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(null);

  const handlePointerDown = (e) => {
    if (!isTop || exitDir) return;
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const handlePointerMove = (e) => {
    if (startX.current === null) return;
    setDx(e.clientX - startX.current);
  };

  const handlePointerEnd = (e) => {
    if (startX.current === null) return;
    const delta = e.clientX - startX.current;
    startX.current = null;
    setDragging(false);

    if (Math.abs(delta) > THRESHOLD) {
      onSwipe(delta > 0 ? 'right' : 'left');
    } else {
      setDx(0); // spring back to centre
    }
  };

  // While exiting, the card flies off in the swipe direction.
  const offset = exitDir ? (exitDir === 'right' ? FLY_OUT : -FLY_OUT) : dx;
  const likeOpacity = Math.min(Math.max(offset, 0) / THRESHOLD, 1);
  const nopeOpacity = Math.min(Math.max(-offset, 0) / THRESHOLD, 1);

  const style = isTop
    ? {
        transform: `translateX(${offset}px) rotate(${offset / 18}deg)`,
        transition: dragging ? 'none' : 'transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1)',
      }
    : undefined;

  return (
    <article
      className={`card ${isTop ? 'top' : 'stacked'}`}
      style={style}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      aria-label={`${profile.name}, ${profile.age}, ${profile.city}`}
    >
      <img
        className="card-photo"
        src={profile.photo}
        alt=""
        draggable={false}
      />

      {isTop && (
        <>
          <span className="stamp like" style={{ opacity: likeOpacity }}>Like</span>
          <span className="stamp nope" style={{ opacity: nopeOpacity }}>Pass</span>
        </>
      )}

      <div className="card-info">
        <h2 className="card-name">
          {profile.name}, {profile.age}
        </h2>
        <p className="card-meta">{profile.city}</p>
        <p className="card-bio">{profile.bio}</p>
        <div className="chips">
          {profile.interests.map((interest) => (
            <span key={interest} className="chip">{interest}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
