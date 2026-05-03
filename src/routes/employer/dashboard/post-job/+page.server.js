import db from '$lib/database';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const userId = Number(cookies.get('user_id'));

	if (!userId) {
		throw redirect(302, '/login');
	}

	return {};
}

export const actions = {
	default: async ({ request, cookies }) => {
		const userId = Number(cookies.get('user_id'));

		if (!userId) {
			throw redirect(302, '/login');
		}

		const data = await request.formData();

		const title = String(data.get('title') ?? '').trim();
		const company_name = String(data.get('company_name') ?? '').trim();
		const description = String(data.get('description') ?? '').trim();
		const requirements = String(data.get('requirements') ?? '').trim();
		const location = String(data.get('location') ?? '').trim();
		const employment_type = String(data.get('employment_type') ?? '').trim();
		const start_datetime = String(data.get('start_datetime') ?? '').trim();
		const end_datetime = String(data.get('end_datetime') ?? '').trim();
		const application_deadline = String(data.get('application_deadline') ?? '').trim();
		const jobIdValue = String(data.get('job_id') ?? '').trim();
		const salaryMinValue = String(data.get('salary_min') ?? '').trim();
		const salaryMaxValue = String(data.get('salary_max') ?? '').trim();
		const is_active = data.get('is_active') === 'on' ? 1 : 0;

		const job_id = jobIdValue ? Number(jobIdValue) : null;
		const salary_min = salaryMinValue ? Number(salaryMinValue) : null;
		const salary_max = salaryMaxValue ? Number(salaryMaxValue) : null;

		if (!title || !company_name || !description || !requirements || !location || !employment_type) {
			return fail(400, { error: 'Please fill in all required job details.' });
		}

		if (job_id !== null && Number.isNaN(job_id)) {
			return fail(400, { error: 'Job ID must be a valid number.' });
		}

		if (salary_min !== null && Number.isNaN(salary_min)) {
			return fail(400, { error: 'Minimum salary must be a valid number.' });
		}

		if (salary_max !== null && Number.isNaN(salary_max)) {
			return fail(400, { error: 'Maximum salary must be a valid number.' });
		}

		if (salary_min !== null && salary_max !== null && salary_min > salary_max) {
			return fail(400, { error: 'Minimum salary cannot be higher than maximum salary.' });
		}

		try {
			// @ts-ignore
			await db.query(
				`INSERT INTO job_listings (
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
					views_count
				)
				VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
				[
					title,
					company_name,
					job_id,
					description,
					requirements,
					location,
					employment_type,
					start_datetime || null,
					end_datetime || null,
					salary_min,
					salary_max,
					userId,
					application_deadline || null,
					is_active
				]
			);

			return { success: true };
		} catch (error) {
			console.error('Job post creation failed:', error);
			return fail(500, { error: 'Failed to create job post. Please try again.' });
		}
	}
};
