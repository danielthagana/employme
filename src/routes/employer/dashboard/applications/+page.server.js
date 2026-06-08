import db from '$lib/database';
import { fail, redirect } from '@sveltejs/kit';

const database = /** @type {any} */ (db);

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const userId = Number(cookies.get('user_id'));

	if (!userId) {
		throw redirect(302, '/login');
	}

	const [applications] = await database.query(
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
			j.application_deadline,
			u.name AS candidate_name,
			u.email AS candidate_email,
			u.phone_number AS candidate_phone,
			u.location AS candidate_location
		FROM applications a
		JOIN job_listings j ON j.id = a.job_listing_id
		JOIN users u ON u.id = a.applicant_user_id
		WHERE j.posted_by_user_id = ?
		ORDER BY a.applied_at DESC`,
		[userId]
	);

	const stats = {
		total: applications.length,
		pending: applications.filter((/** @type {any} */ item) => item.application_status === 'pending')
			.length,
		reviewed: applications.filter(
			(/** @type {any} */ item) => item.application_status === 'reviewed'
		).length,
		shortlisted: applications.filter(
			(/** @type {any} */ item) => item.application_status === 'shortlisted'
		).length,
		hired: applications.filter((/** @type {any} */ item) => item.application_status === 'hired')
			.length,
		rejected: applications.filter(
			(/** @type {any} */ item) => item.application_status === 'rejected'
		).length
	};

	const jobs = [
		...new Set(applications.map((/** @type {any} */ item) => item.title).filter(Boolean))
	];

	return { applications, stats, jobs };
}

export const actions = {
	updateStatus: async ({ request, cookies }) => {
		const userId = Number(cookies.get('user_id'));

		if (!userId) {
			throw redirect(302, '/login');
		}

		const formData = await request.formData();
		const applicationId = Number(formData.get('application_id'));
		const status = String(formData.get('status') || 'pending');
		const allowedStatuses = ['pending', 'reviewed', 'shortlisted', 'hired', 'rejected'];

		if (!applicationId || !allowedStatuses.includes(status)) {
			return fail(400, { message: 'Invalid application update.' });
		}

		await database.query(
			`UPDATE applications a
			JOIN job_listings j ON j.id = a.job_listing_id
			SET a.application_status = ?, a.reviewed_at = NOW()
			WHERE a.id = ? AND j.posted_by_user_id = ?`,
			[status, applicationId, userId]
		);

		return { success: true, message: 'Application status updated.' };
	},

	saveNote: async ({ request, cookies }) => {
		const userId = Number(cookies.get('user_id'));

		if (!userId) {
			throw redirect(302, '/login');
		}

		const formData = await request.formData();
		const applicationId = Number(formData.get('application_id'));
		const notes = String(formData.get('notes') || '').trim();

		if (!applicationId) {
			return fail(400, { message: 'Choose a valid application.' });
		}

		await database.query(
			`UPDATE applications a
			JOIN job_listings j ON j.id = a.job_listing_id
			SET a.notes = ?, a.reviewed_at = COALESCE(a.reviewed_at, NOW())
			WHERE a.id = ? AND j.posted_by_user_id = ?`,
			[notes, applicationId, userId]
		);

		return { success: true, message: 'Note saved.' };
	}
};
