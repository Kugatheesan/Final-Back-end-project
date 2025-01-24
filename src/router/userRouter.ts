import { Router } from "express";
import { createUser } from "../conrollers/userController";

const router=Router();

router.post('/',createUser);

export default router;