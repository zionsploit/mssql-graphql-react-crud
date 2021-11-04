import sql from 'mssql';
import config from '../config';

const sqlConfig = {
    user: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME,
    server: config.DB_SERVER,
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

const Connection = async () => {
    try {
        const pool = await sql.connect(sqlConfig)
        return pool
    } catch (error) {
        console.log(`Error Connection Database: ${error}`)
    }
}

export { sql, Connection }