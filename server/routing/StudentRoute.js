
import express from "express";
import { Studentinfo, getAllStudents , deleteStudent,updateStudent} from "../Controller/Studentdetails.js";


const router = express.Router();


router.post("/studentinfo", Studentinfo);      // Existing route
router.get("/studentinfo", getAllStudents);    // New GET route
router.delete("/studentinfo/:id",  deleteStudent ); 
router.put("/studentinfo/:id", updateStudent);


export default router;
