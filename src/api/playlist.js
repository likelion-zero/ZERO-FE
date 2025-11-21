import { BASE_URL } from '@/api/api';

export const getSongDetail = async (songId) => {
    try {
        const response = await fetch(`${BASE_URL}/playlist/play/${songId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}` 
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        return await response.json();
        
    } catch (error) {
        console.error("Fetch Song Detail Error:", error);
        throw error; 
    }
};