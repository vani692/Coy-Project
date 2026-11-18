import { NextResponse } from 'next/server';
import { readDb, writeDb, publicProfile, findProfile } from '@/lib/db';

export const dynamic = 'force-dynamic';

// Records a like or pass. A match is created only when the user likes a
// profile that has already liked them. Passing never creates a match, and a
// non-match response never says whether the other person liked the user.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { profileId, action } = body;

  if (action !== 'like' && action !== 'pass') {
    return NextResponse.json({ error: 'action must be "like" or "pass"' }, { status: 400 });
  }

  const profile = findProfile(profileId);
  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }

  const db = readDb();

  if (db.swipes[profileId] !== undefined) {
    return NextResponse.json({ error: 'Already swiped on this profile' }, { status: 409 });
  }

  db.swipes[profileId] = action;

  let matched = false;
  if (action === 'like' && db.inboundLikes.includes(profileId)) {
    matched = true;
    if (!db.matches.includes(profileId)) db.matches.push(profileId);
  }

  writeDb(db);

  return NextResponse.json({
    matched,
    profile: matched ? publicProfile(profile) : null,
  });
}
