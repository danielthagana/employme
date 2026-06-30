import db from '$lib/database';

export async function load() {
    try {
        const [jobs] = await db.query(`
            SELECT 
                id,
                title,
                company_name,
                job_id,
                description,
                requirements,
                location,
                employment_type,
                start_datetime,
                end_datetime,
                salary_min,
                salary_max,
                posted_by_user_id,
                application_deadline,
                is_active,
                views_count,
                created_at,
                updated_at
            FROM job_listings
            ORDER BY created_at DESC
        `);
        
        return {
            jobs: jobs || []
        };
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return {
            jobs: [],
            error: 'Failed to load jobs'
        };
    }
}

export const actions = {
    deleteJob: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        
        try {
            await db.query('UPDATE jobs SET is_active = 0 WHERE id = ?', [id]);
            return { success: true };
        } catch (error) {
            console.error('Error deleting job:', error);
            return { success: false, error: error.message };
        }
    },
    
    toggleActive: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        const isActive = data.get('isActive') === 'true';
        
        try {
            await db.query('UPDATE jobs SET is_active = ? WHERE id = ?', [!isActive ? 1 : 0, id]);
            return { success: true };
        } catch (error) {
            console.error('Error toggling job status:', error);
            return { success: false, error: error.message };
        }
    }
};