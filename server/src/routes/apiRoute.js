import { Router } from "express";
import { registerUser,loginUser, getAllUsers } from "../controllers/user.controller.js";
import { fillSymptoms } from "../controllers/symptomHandler.controller.js";
import { addUserController } from "../controllers/guardian.controller.js";
import { createRoom, deleteRoom } from "../controllers/user.controller.js"
import { getAllcaretakers, getCaretaker } from "../controllers/caretaker.controller.js";
const router = Router();
 
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/putSymptoms',fillSymptoms);
router.post('/addGuardian',addUserController);
router.post('/createRoom', createRoom);
router.post('/deleteRoom', deleteRoom);
router.get('/getUsers', getAllUsers);
router.get('/getCaretakers', getAllcaretakers);
router.post('/getCaretaker', getCaretaker);

export default router;