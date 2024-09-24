// Import necessary modules
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// routing 
import employeeRoutes from './routes/employeeRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

//  route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/employees', employeeRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
