import { Router } from "express";
import { sign_up_user,sign_in_user } from "../controller/authenticate.controller.js";
const router = Router();


router.post("/sign_up_user", sign_up_user );
router.post("/sign_in_user", sign_in_user );


export default router;