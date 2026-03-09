import db from '$lib/database';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const userId = Number(cookies.get('user_id'));

	if (!userId) {
		throw redirect(302, '/login');
	}

	const [applications] = await db.query(
		`SELECT
			a.id,
			a.application_status,
			a.applied_at,
			a.reviewed_at,
			a.notes,
			j.id AS job_listing_id,
			j.title,
			j.company_name,
			j.location,
			j.employment_type,
			j.salary_min,
			j.salary_max,
			j.application_deadline,
			u.email AS employer_email,
			u.phone_number AS employer_phone
		FROM applications a
		JOIN job_listings j ON j.id = a.job_listing_id
		LEFT JOIN users u ON u.id = j.posted_by_user_id
		WHERE a.applicant_user_id = ?
		ORDER BY a.applied_at DESC`,
		[userId]
	);

	const stats = {
		total: applications.length,
		pending: applications.filter((/** @type {any} */ app) => app.application_status === 'pending')
			.length,
		reviewed: applications.filter((/** @type {any} */ app) => app.application_status === 'reviewed')
			.length,
		shortlisted: applications.filter(
			(/** @type {any} */ app) => app.application_status === 'shortlisted'
		).length,
		rejected: applications.filter((/** @type {any} */ app) => app.application_status === 'rejected')
			.length
	};

	return { applications, stats };
}
