import { getConnection } from "../config.js";
import bcrypt from "bcrypt";

export const addNewEmploy = async (req, res) => { 
  try {
    const {
      EPF_No,
      firstName,
      lastName,
      role,
      teamNumber,
      shiftCount,
    } = req.body;
    const connection = await getConnection();
    const hashedPassword = await bcrypt.hash(EPF_No, 10);   // password -->  EPF_No @SupunBHerath
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
      shiftCount || 3,
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

    res
      .status(201)
      .json({ message: "Employee added successfully", employee: newEmployee });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error adding employee", error: err.message });
  } finally {
    if (connection) {
      connection.release(); // Release the connection back to the pool
    }
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
  } finally {
    if (connection) {
      connection.release(); 
    }
  }
};

export const getEmployeeByEPF = async (req, res) => {
  try {
    const { EPF_No } = req.params;

    const connection = await getConnection();
    const query = `
      SELECT * FROM Employee
      WHERE EPF_No = ?
    `;

    const [rows] = await connection.execute(query, [EPF_No]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ employee: rows[0] });
  } catch (err) {
    console.error("Error fetching employee:", err);
    res
      .status(500)
      .json({ message: "Error fetching employee", error: err.message });
  } finally {
    if (connection) {
      connection.release(); 
    }
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { EPF_No, firstName, lastName, role, teamNumber, shiftCount } =
      req.body;

    const query = `
      UPDATE Employee
      SET firstName = ?, lastName = ?, role = ?, teamNumber = ?, shiftCount = ?
      WHERE EPF_No = ?
    `;

    const [result] = await connection.execute(query, [
      firstName,
      lastName,
      role,
      teamNumber,
      shiftCount,
      EPF_No,
    ]);

    const updateEmployee = {
      EPF_No,
      firstName,
      lastName,
      role,
      teamNumber,
      shiftCount,
    };

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res
      .status(200)
      .json({
        message: "Employee updated successfully",
        employee: updateEmployee,
      });
  } catch (err) {
    console.error("Error updating employee:", err);
    res
      .status(500)
      .json({ message: "Error updating employee", error: err.message });
  } finally {
    if (connection) {
      connection.release(); // Release the connection back to the pool
    }
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { EPF_No } = req.params;

    const query = `
      DELETE FROM Employee
      WHERE EPF_No = ?
    `;

    const [result] = await connection.execute(query, [EPF_No]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res
      .status(500)
      .json({ message: "Error deleting employee", error: err.message });
  } finally {
    if (connection) {
      connection.release(); // Release the connection back to the pool
    }
  }
};

export const updateShiftCount = async (req, res) => {
  try {
    const { EPF_No, shiftCount } = req.body;

    const query = `
      UPDATE Employee
      SET shiftCount = ?
      WHERE EPF_No = ?
    `;

    const [result] = await connection.execute(query, [shiftCount, EPF_No]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Shift count updated successfully" });
  } catch (err) {
    console.error("Error updating shift count:", err);
    res
      .status(500)
      .json({ message: "Error updating shift count", error: err.message });
  } finally {
    if (connection) {
      connection.release(); 
    }
  }
};

export const updatePassword = async (req, res) => {
  let connection; 
  try {
    const { EPF_No } = req.params; 
    const { newPassword } = req.body; 


    connection = await getConnection();
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password

    const query = `
      UPDATE Employee
      SET password = ?
      WHERE EPF_No = ?
    `;

    const [result] = await connection.execute(query, [hashedPassword, EPF_No]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ message: 'Error updating password', error: err.message });
  } finally {
    if (connection) {
      connection.release(); 
    }
  }
};
