import express from "express";
const router = express.Router();
import { getAllEmployees,addNewEmploy} from "../controllers/employeeController.js"


router.get('/', getAllEmployees); 
router.post('/', addNewEmploy); 

export default router;