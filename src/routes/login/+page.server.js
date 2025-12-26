import db from '$lib/database'
import { fail } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, cookies }) => {

        const data = await request.formData();

        const email = data.get('email');
        const password = data.get('password');

        // Validation
        if (!email || !password) {
            return {
                success: false,
                error: 'Email and password are required'
            };
        }

        try {
            // Query the database for user with matching email
            const [users] = await db.query(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );
            
            console.log("DbUser here", users);

            // Check if user exists
            if (users.length === 0) {
               return fail(400, {
                   error: 'Invalid email or Password'
               });
            }

            const user = users[0];

            // Check password
            if (user.password !== password) {
               return fail(400, {
                   error: 'Invalid email or Password'
               });
            }
            

            // // Check if user is active
            // if (!user.is_active) {
            //     return {
            //         success: false,
            //         error: 'Your account has been deactivated'
            //     };
            // }

            // Set session cookie with user info
            cookies.set('user_id', String(user.id), {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7 // 7 days
            });

            return {
                success: true,
                message: 'Login successful',
                userId: user.id,
                userName: user.name
            };

        } catch (error) {
            console.error('Error occurred during login:', error);
            return {
                success: false,
                error: 'An error occurred during login. Please try again.'
            };
        }

    }
};
