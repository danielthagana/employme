import { redirect } from '@sveltejs/kit';
import db from '$lib/database';


/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
    const userId = Number(cookies.get('user_id'));
    
        if (!userId) {
            throw redirect(302, '/login');
        }
// select from db usig userId to get user info and pass it toc the layout
    const [user] = await db.query(
        `SELECT id, name, email FROM users WHERE id = ?`,
        [userId]
    )
console.log(user[0])
    return {
        user: user[0]
    };
    };
