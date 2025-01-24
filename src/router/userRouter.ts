import { Router } from "express";
import { createUser, loginuser } from "../conrollers/userController";

const router=Router();

router.post('/register',createUser);
router.post('/login',loginuser);

export default router;