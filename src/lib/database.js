// place files you want to import through the `$lib` alias in this folder.
import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'employ_me'
});


export default db;