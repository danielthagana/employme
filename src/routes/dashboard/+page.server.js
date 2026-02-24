import db from '$lib/database';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const [job_listings ] = await db.query(
        'SELECT job_listings.*, users.email, users.phone_number FROM job_listings JOIN users ON job_listings.posted_by_user_id = users.id'
    
    
    
    );

    console.log("Job listings here", job_listings);
    

    return { job_listings
    };
};