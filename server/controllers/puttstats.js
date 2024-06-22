import { getAvgPuttDist } from '../services/puttstatsService.js';

export const getPuttStats = async (req, res) => {
    try {
        const avgPuttDist = await getAvgPuttDist();
        res.json({ avgPuttDist });
    } catch (error) {
        console.error('Error fetching putt stats:', error);
        res.status(500).json({ error: 'Failed to fetch putt stats' });
    }
};