import { getConnection } from "../config.js";
import bcrypt from 'bcrypt';

export const addNewEmploy = async (req, res) => {
  try {
    const { EPF_No, firstName, lastName, role, teamNumber, shiftCount, password } = req.body;
    const connection = await getConnection();
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO Employee (EPF_No, firstName, lastName, role, teamNumber, shiftCount, password)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await connection.execute(query, [
      EPF_No,
      firstName,
      lastName,
      role,
      teamNumber,
      shiftCount,
      hashedPassword,
    ]);

    const newEmployee = {
      EPF_No,
      firstName,
      lastName,
      role,
      teamNumber,
      shiftCount,
    };

    res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });

    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding employee', error: err.message });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const connection = await getConnection();

    const [rows] = await connection.query("SELECT * FROM Employee");

    connection.release();

    res.status(200).json({ employees: rows });
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
