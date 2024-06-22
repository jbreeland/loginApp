import { loginDB } from '../utils/database.js'; // Use the correct connection

export const getAvgPuttDist = async () => {
    try {
        const result = await loginDB.query('SELECT AVG(putt_dist) as avg_putt_dist FROM putt_stats');
        const avgPuttDist = result[0][0].avg_putt_dist;
        return avgPuttDist;
    } catch (error) {
        throw new Error('Failed to fetch putt stats: ' + error.message);
    }
};