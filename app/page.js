'use client';

import { useState } from 'react';
import HomeTab from '@/components/HomeTab';
import DiscoverTab from '@/components/DiscoverTab';
import MatchesTab from '@/components/MatchesTab';

const TABS = [
  { id: 'home', label: 'Home' },
  { id: 'discover', label: 'Discover' },
  { id: 'matches', label: 'Matches' },
];

export default function Page() {
  const [tab, setTab] = useState('discover');

  return (
    <div className="app">
      <main className="content">
        {tab === 'home' && <HomeTab />}
        {tab === 'discover' && <DiscoverTab />}
        {tab === 'matches' && <MatchesTab />}
      </main>

      <nav className="tabbar" aria-label="Main">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-current={tab === t.id ? 'page' : undefined}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
