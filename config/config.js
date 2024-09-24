import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();


const pool = mysql.createPool({
  host: process.env.DB_HOST,  
  user: process.env.DB_USER ,     
  password: process.env.DB_PASSWORD,                   
  database: process.env.DB_NAME, 
  waitForConnections: true,
  connectionLimit: 10,  
  queueLimit: 0          
});


export const getConnection = async () => {
  try {
    const connection = await pool.getConnection();
    
    // Handle connection errors
    connection.on('error', (err) => {
      console.error('MySQL Connection Error:', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.');
      } else if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.');
      } else if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.');
      }
    });

    console.log('MySQL Database Connected Successfully');
    return connection;
  } catch (err) {
    console.error('Error connecting to the MySQL Database:', err);
    throw err;  // Rethrow error so it can be caught where this function is called
  }
};

export default pool;
