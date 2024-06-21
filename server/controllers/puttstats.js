import { loginDB } from '../utils/database.js'; // Use the correct connection

export const getPuttStats = async (req, res) => {
    try {
        const result = await loginDB.query('SELECT AVG(putt_dist) as avg_putt_dist FROM putt_stats');
        const avgPuttDist = result[0][0].avg_putt_dist;
        res.json({ avgPuttDist });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch putt stats' });
    }
};
