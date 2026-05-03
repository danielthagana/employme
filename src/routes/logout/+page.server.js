import { redirect } from '@sveltejs/kit';
/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
    const userId = Number(cookies.get('user_id'));

    if (!userId) {
        throw redirect(302, '/login');
    }
    cookies.delete('user_id', { path: '/' });
    throw redirect(302, '/login');
}