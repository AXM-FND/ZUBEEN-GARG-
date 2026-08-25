export default function handler(req, res) { res.status(200).json({ ok: true, service: 'zubeen-garg-legacy', time: new Date().toISOString() }); }
