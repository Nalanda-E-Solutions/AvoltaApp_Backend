import { getConnection } from '../config.js';

export const getAllEmployees = async (req, res) => {
  try {
    const connection = await getConnection();

    const [rows] = await connection.query('SELECT * FROM Employee');
    
    connection.release();

    res.status(200).json({ employees: rows });
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};
