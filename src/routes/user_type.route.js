import { Router } from "express";
import {getUsersType, createUserType, getUsersTypeId, deleteUsersTypeId,updateUsersTypeId} from "../controller/user_type.controller.js";
const router = Router();


router.get("/user_type", getUsersType);
router.post("/user_type", createUserType);
router.get("/user_type/:id", getUsersTypeId);
router.delete("/user_type/:id", deleteUsersTypeId);
router.patch("/user_type/:id", updateUsersTypeId);




export default router;