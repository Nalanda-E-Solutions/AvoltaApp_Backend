import express from "express";
const router = express.Router();
import { getAllEmployees} from "../controllers/employeeController.js"


router.get('/', getAllEmployees); 


export default router;