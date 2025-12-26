/** @type {import('./$types').PageServerLoad} */

export async function load() {
    return {};
};

export const actions = {
	default: async ({request, cookies}) => {

        // console.log(request);
        // console.log((await request.formData()));
        const data = await request.formData();

        const email = data.get('email');
        const password = data.get('password');

        console.log(email, password);

        

	}
};
