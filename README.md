# Zubeen Garg — Premium Legacy Website

A production-oriented monochrome artist archive built with Node.js + Express + vanilla HTML/CSS/JS.

## Run locally

```bash
npm install
cp .env.example .env
npm start
```

Open `http://localhost:3000`.

## Live catalog

`GET /api/releases` uses:

1. Spotify Web API when `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` are configured.
2. Apple iTunes Search API as a no-key fallback.

The backend caches the result for `CACHE_TTL_MS` (default 5 minutes).

The website never invents play counts, follower counts, release dates or streaming statistics.

## 24/7 audio

The persistent player is intentionally a metadata/navigation player. It does **not** download or redistribute copyrighted recordings.

To operate a genuine continuous stream, the site owner must supply audio they are legally authorized to stream. At that point, the player can be connected to licensed HLS/MP3 sources and automatic track advancement can be implemented without changing the visual design.

## Images

The initial visual archive uses Wikimedia Commons photographs with their stated licenses. Each gallery item links to its source/license page. Before commercial launch, replace or supplement them with photographs for which the site owner has explicit usage rights.

## API

- `GET /api/health`
- `GET /api/artist`
- `GET /api/data`
- `GET /api/releases`

## Production checklist

- Add final privacy/terms text.
- Add a custom domain and HTTPS.
- Add final licensed hero/gallery photography.
- Verify every official social/music destination.
- Configure Spotify credentials if desired.
- If licensed audio exists, connect the player to the licensed stream.
- Add server-side rate limiting and a structured logger before high-traffic launch.


V9: header is transparent over hero; supplied YouTube video rb3SlYel4eE is embedded in-page with a cassette-style visualizer. The supplied URL is a video URL, not a playlist URL.


V14: vintage black radio-style YouTube playlist player with dual animated cassette reels, VU meter and tape motion.


## V19 visual fixes

- Top-song cards now use different real Zubeen Garg concert photographs instead of repeating one image.
- Radio cassette reels, tape strip, VU meter and live indicator animate only while the embedded YouTube player reports `PLAYING`.
- Archive/legacy figures use editorial serif numerals instead of the previous UI-number treatment.
- Removed the visible `reported` wording from the archive/stat cards.
- Global typography refreshed to Manrope + Cormorant Garamond while retaining DM Mono for labels.
- The radio footer label no longer uses the year range.
- Wikimedia Commons photo attribution is shown in the site footer.
