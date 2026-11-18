import { NextResponse } from 'next/server';
import { readDb, publicProfile, findProfile } from '@/lib/db';

export const dynamic = 'force-dynamic';

// Returns only mutual matches, newest first.
export async function GET() {
  const db = readDb();
  const matches = [...db.matches]
    .reverse()
    .map(findProfile)
    .filter(Boolean)
    .map(publicProfile);

  return NextResponse.json({ matches });
}
