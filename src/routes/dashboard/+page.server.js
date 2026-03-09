import db from '$lib/database';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const userId = Number(cookies.get('user_id'));

	if (!userId) {
		throw redirect(302, '/login');
	}

	const [job_listings] = await db.query(
		`SELECT
			job_listings.*,
			users.email,
			users.phone_number,
			CASE WHEN applications.id IS NULL THEN 0 ELSE 1 END AS has_applied
		FROM job_listings
		JOIN users ON job_listings.posted_by_user_id = users.id
		LEFT JOIN applications
			ON applications.job_listing_id = job_listings.id
			AND applications.applicant_user_id = ?
		WHERE job_listings.is_active = 1
		ORDER BY job_listings.created_at DESC`,
		[userId]
	);

	return { job_listings };
}

export const actions = {
	apply: async ({ request, cookies }) => {
		const userId = Number(cookies.get('user_id'));

		if (!userId) {
			throw redirect(302, '/login');
		}

		const formData = await request.formData();
		const jobListingId = Number(formData.get('job_listing_id'));

		if (!jobListingId) {
			return fail(400, { error: 'Invalid job listing.' });
		}

		const [existingApplications] = await db.query(
			'SELECT id FROM applications WHERE job_listing_id = ? AND applicant_user_id = ? LIMIT 1',
			[jobListingId, userId]
		);
// @ts-ignore
		if (existingApplications.length > 0) {
			return { success: true, alreadyApplied: true, jobListingId };
		}

		await db.query(
			`INSERT INTO applications (job_listing_id, applicant_user_id, application_status)
			VALUES (?, ?, 'pending')`,
			[jobListingId, userId]
		);

		return { success: true, jobListingId };
	}
};
