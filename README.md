# Coy · Discover

A swipe-based "Discover" tab for Coy, built as a standalone Next.js app. It
includes a blank Home tab, a Discover tab with swipe cards and a Matches tab.


## Features

**Profiles.** The app ships with 32 seeded mock profiles, each with a name,
age, city, bio, interests and a placeholder photo. Eight of them have already
liked the logged-in user, so matches happen during a demo.

**Swiping.** Drag a card right to like or left to pass on mobile. On desktop,
use the buttons or the arrow keys. Cards animate off-screen, and a Like or Pass
stamp fades in as you drag. A swiped profile never comes back. When the deck is
empty, a "You're all caught up" state appears.

**Matching.** A match happens only when the user likes someone who has already
liked them. The "It's a match!" screen appears at that moment. Passing never
creates a match.

**Privacy.** The app never reveals who has liked the user unless the like is
mutual. The inbound-like list lives only on the server, and no API route
returns it. The feed returns only profiles the user has not swiped on, and a
non-match swipe response does not say whether the other person liked the user.

## API

| Method | Path       | Purpose                                                                 |
| ------ | ---------- | ----------------------------------------------------------------------- |
| GET    | `/api/feed`    | Profiles the user has not swiped on yet                             |
| POST   | `/api/swipe`   | Body `{ "profileId": "p03", "action": "like" \| "pass" }`. Returns `{ "matched": boolean, "profile": {...} \| null }` |
| GET    | `/api/matches` | The user's mutual matches, newest first                             |

Errors return JSON with an `error` message. Status codes: 400 for an invalid
action, 404 for an unknown profile, and 409 if the user has already swiped on
that profile.

## Project layout

```
app/
  api/feed/route.js       GET  /api/feed
  api/swipe/route.js      POST /api/swipe (mutual-match logic)
  api/matches/route.js    GET  /api/matches
  globals.css             design tokens, layout and motion
  layout.js, page.js      app shell and tab bar
components/
  HomeTab.js              blank placeholder
  DiscoverTab.js          deck, swipe flow, buttons, empty state
  SwipeCard.js            drag gesture and stamps
  MatchModal.js           "It's a match!" overlay
  MatchesTab.js           list of mutual matches
lib/
  seed.js                 32 mock profiles and inbound-like IDs
  db.js                   JSON-file persistence
data/
  db.json                 created on first run
```



