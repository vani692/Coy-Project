import fs from 'node:fs';
import path from 'node:path';
import { PROFILES, INBOUND_LIKE_IDS } from './seed';

// Simple JSON-file store. Good enough for a single logged-in user.
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

function freshState() {
  return {
    swipes: {},                          // profileId -> 'like' | 'pass'
    matches: [],                         // profileIds with a mutual like
    inboundLikes: [...INBOUND_LIKE_IDS], // profileIds that liked the user (private)
  };
}

export function readDb() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch {
    const state = freshState();
    writeDb(state);
    return state;
  }
}

export function writeDb(state) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmp = `${DB_FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(state, null, 2));
  fs.renameSync(tmp, DB_FILE); // atomic replace, so a crash cannot corrupt the file
}

// Only the fields the client is allowed to see.
export function publicProfile(p) {
  const { id, name, age, city, bio, interests, photo } = p;
  return { id, name, age, city, bio, interests, photo };
}

export function findProfile(id) {
  return PROFILES.find((p) => p.id === id) || null;
}

export { PROFILES };
