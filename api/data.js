import { artist, officialTracks, filmography } from './catalog.js';

export default function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
  res.status(200).json({
    artist,
    officialTracks,
    filmography,
    catalog: { source: 'Published / verified listings', status: 'live' },
    lastUpdated: new Date().toISOString()
  });
}
