import db from '$lib/database';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const userId = Number(cookies.get('user_id'));

	if (!userId) {
		throw redirect(302, '/login');
	}
	const [recentApplications] = await db.query(
		`SELECT
			applications.id,
			applications.application_status,
			job_listings.title AS role,
			job_listings.title,
			users.location,
			users.name,
			users.email,
			users.phone_number,
			4.8 AS rating
        FROM job_listings
        JOIN applications ON job_listings.id = applications.job_listing_id
		JOIN users ON users.id = applications.applicant_user_id
        WHERE job_listings.posted_by_user_id = ?
		ORDER BY applications.applied_at DESC`,
		[userId]
	);
	return { recentApplications };
}
