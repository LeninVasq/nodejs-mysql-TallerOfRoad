import { Router } from "express";
const router = Router();
import {getSparePart, Create_spare_parts,get_Spare_Parts_Id, delete_Spare_Parts_Id,
    get_Spare_Parts_Id_Category,Update_Spare_parts} from "../controller/spare_parts.controller.js";


router.get("/Spare_parts", getSparePart);
router.post("/Spare_parts", Create_spare_parts);
router.get("/Spare_parts/:id", get_Spare_Parts_Id);
router.get("/Spare_parts_Category_Id/:id", get_Spare_Parts_Id_Category);
router.delete("/Spare_parts/:id", delete_Spare_Parts_Id);
router.patch("/Spare_parts/:id", Update_Spare_parts);




export default router;