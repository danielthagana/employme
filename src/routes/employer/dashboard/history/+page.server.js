import db from '$lib/database';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const userId = Number(cookies.get('user_id'));

	if (!userId) {
		throw redirect(302, '/login');
	}

	const [history] = await db.query(
		`SELECT
			a.id,
			a.application_status,
			a.applied_at,
			a.reviewed_at,
			a.notes,
			j.id AS job_listing_id,
			j.title,
			j.company_name,
			j.location AS job_location,
			j.employment_type,
			j.salary_min,
			j.salary_max,
			j.start_datetime,
			j.end_datetime,
			j.application_deadline,
			u.name AS candidate_name,
			u.email AS candidate_email,
			u.phone_number AS candidate_phone,
			u.location AS candidate_location
		FROM applications a
		JOIN job_listings j ON j.id = a.job_listing_id
		JOIN users u ON u.id = a.applicant_user_id
		WHERE j.posted_by_user_id = ?
		ORDER BY COALESCE(a.reviewed_at, a.applied_at) DESC`,
		[userId]
	);

	const completedStatuses = ['hired', 'rejected', 'shortlisted', 'reviewed'];
	const completedHistory = history.filter((item) =>
		completedStatuses.includes(String(item.application_status || '').toLowerCase())
	);

	const stats = {
		total: history.length,
		hired: history.filter((item) => item.application_status === 'hired').length,
		shortlisted: history.filter((item) => item.application_status === 'shortlisted').length,
		rejected: history.filter((item) => item.application_status === 'rejected').length,
		completed: completedHistory.length
	};

	const jobs = [...new Set(history.map((item) => item.title).filter(Boolean))];

	return { history, stats, jobs };
}
