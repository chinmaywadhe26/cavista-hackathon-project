import { Router } from "express";
import { registerUser,loginUser } from "../controllers/user.controller.js";
import { fillSymptoms } from "../controllers/symptomHandler.controller.js";
import { addUserController } from "../controllers/guardian.controller.js";
const router = Router();
 
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/putSymptoms',fillSymptoms);
router.post('/addGuardian',addUserController);


export default router;