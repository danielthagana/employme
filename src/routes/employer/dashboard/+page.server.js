import db from '$lib/database';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
    const userId = Number(cookies.get('user_id'));

    if (!userId) {
        throw redirect(302, '/login');
    }
    const [recentApplications] = await db.query(
        `SELECT job_listings.title, users.location, users.name, users.email, users.phone_number 
        FROM job_listings 
        JOIN applications ON job_listings.id = applications.job_listing_id JOIN users ON users.id = applications.applicant_user_id
        WHERE job_listings.posted_by_user_id = ?`, 
        [userId]

    );
    return { recentApplications };
}
