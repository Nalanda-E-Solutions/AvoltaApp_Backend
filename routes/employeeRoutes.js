import express from "express";
const router = express.Router();
import { 
  addNewEmploy, 
  getAllEmployees, 
  updateEmployee, 
  deleteEmployee, 
  updateShiftCount,
  updatePassword 
} from '../controllers/employeeController.js';

// Define routes
router.post('/', addNewEmploy); 
router.get('/', getAllEmployees); 
router.put('/:EPF_No', updateEmployee); 
router.delete('/:EPF_No', deleteEmployee); 
router.patch('/shiftCount/:EPF_No', updateShiftCount);
router.put('/password/:EPF_No', updatePassword); 

export default router;
