import { Router } from "express";
import { sign_up_user,sign_in_user,close_session } from "../controller/authenticate.controller.js";
const router = Router();


router.post("/sign_up_user", sign_up_user );
router.post("/close_session", close_session );
router.post("/sign_in_user", sign_in_user );


export default router;