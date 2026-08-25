import { officialTracks } from './catalog.js';
export default function handler(req, res) {
  res.status(200).json({ source: 'published top-song listings', songs: officialTracks, lastUpdated: new Date().toISOString() });
}
