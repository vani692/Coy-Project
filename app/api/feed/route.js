import { NextResponse } from 'next/server';
import { readDb, publicProfile, PROFILES } from '@/lib/db';

export const dynamic = 'force-dynamic';

// Returns only profiles the user has not swiped on yet.
// Nothing here reveals who has liked the user.
export async function GET() {
  const db = readDb();
  const profiles = PROFILES
    .filter((p) => db.swipes[p.id] === undefined)
    .map(publicProfile);

  return NextResponse.json({ profiles });
}
