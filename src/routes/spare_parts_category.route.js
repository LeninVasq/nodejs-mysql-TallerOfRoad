import { Router } from "express";
const router = Router();
import {getSparePartCategory, Created_Spare_parts_Category,get_Spare_Parts_Category_Id,delete_Spare_Parts_Category_Id,Update_Spare_parts_Category} from "../controller/spare_parts_category.controller.js";



router.get("/Spare_Parts_Category", getSparePartCategory);
router.get("/Spare_Parts_Category/:id", get_Spare_Parts_Category_Id);
router.post("/Spare_parts_Category", Created_Spare_parts_Category);
router.delete("/Spare_parts_Category/:id", delete_Spare_Parts_Category_Id);
router.patch("/Spare_parts_Category/:id", Update_Spare_parts_Category);




export default router;