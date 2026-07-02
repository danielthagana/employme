import db from '$lib/database';

export async function load() {
    try {
        const [jobs] = await db.query(`
            SELECT 
                jl.id,
                jl.title,
                jl.company_name,
                jl.job_id,
                jl.description,
                jl.requirements,
                jl.location,
                jl.employment_type,
                jl.start_datetime,
                jl.end_datetime,
                jl.salary_min,
                jl.salary_max,
                jl.posted_by_user_id,
                jl.application_deadline,
                jl.is_active,
                jl.views_count,
                jl.created_at,
                jl.updated_at,
                users.name

            FROM job_listings jl
            JOIN users ON jl.posted_by_user_id = users.id
            ORDER BY jl.created_at DESC

        `);
        // console.log('Jobs fetched==========:', jobs);
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
            //@ts-ignore
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
            //@ts-ignore
            return { success: false, error: error.message };
        }
    }
};