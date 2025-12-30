import db from '$lib/database'
import { fail } from '@sveltejs/kit';



/** @type {import('./$types').PageServerLoad} */
export async function load() {

    const [roles] = await db.query(
        'SELECT role_name,id  FROM roles WHERE role_name != "admin"',
    );
    console.log("roles here", roles);

    // get ,
    return {
        roles: roles
    };
};


export const actions = {
    default: async ({request}) => {
        const data = await request.formData();

        const role = data.get('role');
        const email = data.get('email');
        const password = data.get('password');
        const confirmPassword = data.get('confirmPassword');
        const idnumber = data.get('idnumber');
        const fullname = data.get('fullname');

        try {
            const result = await db.query(
                'INSERT INTO users (role_id, email, password, id_number, name) VALUES (?, ?, ?, ?, ?)',
                [role, email, password, idnumber, fullname]
            )
            console.log("Insert result", result);

            return {
                success: true
            };
            
        } catch (error) {
            console.error('Error during user signup:', error);
            
        }
    }


}