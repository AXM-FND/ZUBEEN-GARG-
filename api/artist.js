import { artist } from './catalog.js';
export default function handler(req, res) { res.status(200).json(artist); }
