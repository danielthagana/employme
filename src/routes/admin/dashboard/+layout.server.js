import { redirect } from '@sveltejs/kit';
import db from '$lib/database';
/** @type {import('./$types').LayoutServerLoad} */

export async function load({ cookies }) {
    console.log("layout server load called")
    const userId = Number(cookies.get('user_id'));
    if (!userId) {
        throw redirect(302, '/login');
    }
    const [user] = await db.query(
        `SELECT id, name, email, role_id FROM users WHERE id = ?`,
        [userId]

    )
    //@ts-ignore
    if (user[0].role_id !== 3) {
        cookies.delete('user_id', { path: '/' });
        throw redirect(302, '/login');
    }
//@ts-ignore
    return { user: user[0] };

}