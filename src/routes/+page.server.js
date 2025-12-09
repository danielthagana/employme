import db from '$lib/database'

/** @type {import('./$types').PageServerLoad} */
export async function load() {

    const [results, fields] = await db.query('SELECT * FROM roles')

    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
    return {};
};