import db from '$lib/database';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const userId = Number(cookies.get('user_id'));

	if (!userId) {
		throw redirect(302, '/login');
	}

	const [users] = await db.query(
		`SELECT
			id,
			name,
			email,
			age,
			phone_number,
			location,
			job_id,
			role_id,
			profile_image,
			bio,
			skills,
			experience_years,
			is_active,
			created_at,
			updated_at
		FROM users
		WHERE id = ?
		LIMIT 1`,
		[userId]
	);
// ignore if (users.length === 0) {
	if (users.length === 0) {
		cookies.delete('user_id', { path: '/' });
		throw redirect(302, '/login');
	}
// ignore if (users.length === 0) {
	return { user: users[0] };
}

export const actions = {
	default: async ({ request, cookies }) => {
		const userId = Number(cookies.get('user_id'));

		if (!userId) {
			throw redirect(302, '/login');
		}

		const formData = await request.formData();

		const name = String(formData.get('name') ?? '').trim();
		const email = String(formData.get('email') ?? '').trim();
		const phone_number = String(formData.get('phone_number') ?? '').trim();
		const location = String(formData.get('location') ?? '').trim();
		const profile_image = String(formData.get('profile_image') ?? '').trim();
		const bio = String(formData.get('bio') ?? '').trim();
		const skills = String(formData.get('skills') ?? '').trim();
		const password = String(formData.get('password') ?? '').trim();

		const ageValue = String(formData.get('age') ?? '').trim();
		const experienceYearsValue = String(formData.get('experience_years') ?? '').trim();
		const jobIdValue = String(formData.get('job_id') ?? '').trim();

		const age = ageValue ? Number(ageValue) : null;
		const experience_years = experienceYearsValue ? Number(experienceYearsValue) : null;
		const job_id = jobIdValue ? Number(jobIdValue) : null;

		if (!name || !email) {
			return fail(400, { error: 'Name and email are required.' });
		}

		if (age !== null && Number.isNaN(age)) {
			return fail(400, { error: 'Age must be a valid number.' });
		}

		if (experience_years !== null && Number.isNaN(experience_years)) {
			return fail(400, { error: 'Experience years must be a valid number.' });
		}

		if (job_id !== null && Number.isNaN(job_id)) {
			return fail(400, { error: 'Job ID must be a valid number.' });
		}

		try {
			if (password) {
				await db.query(
					`UPDATE users
					SET
						name = ?,
						email = ?,
						age = ?,
						phone_number = ?,
						location = ?,
						job_id = ?,
						profile_image = ?,
						bio = ?,
						skills = ?,
						experience_years = ?,
						password = ?
					WHERE id = ?`,
					[
						name,
						email,
						age,
						phone_number || null,
						location || null,
						job_id,
						profile_image || null,
						bio || null,
						skills || null,
						experience_years ?? 0,
						password,
						userId
					]
				);
			} else {
				await db.query(
					`UPDATE users
					SET
						name = ?,
						email = ?,
						age = ?,
						phone_number = ?,
						location = ?,
						job_id = ?,
						profile_image = ?,
						bio = ?,
						skills = ?,
						experience_years = ?
					WHERE id = ?`,
					[
						name,
						email,
						age,
						phone_number || null,
						location || null,
						job_id,
						profile_image || null,
						bio || null,
						skills || null,
						experience_years ?? 0,
						userId
					]
				);
			}

			return { success: true };
		} catch (error) {
			if (error && typeof error === 'object' && 'code' in error && error.code === 'ER_DUP_ENTRY') {
				return fail(400, { error: 'That email is already in use.' });
			}

			console.error('Profile update failed:', error);
			return fail(500, { error: 'Failed to update profile. Please try again.' });
		}
	}
};
