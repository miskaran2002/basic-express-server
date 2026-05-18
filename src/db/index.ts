import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
    connectionString: config.connection_string,
});

export const initDB = async () => {
    try {
        await pool.query(` 
        CREATE TABLe  IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) ,
            email VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            is_active BOOLEAN DEFAULT true,
            age INT,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        ) 
        `);
        console.log('Database created successfully');
    } catch (error) {
        console.log(error);
    }
};

