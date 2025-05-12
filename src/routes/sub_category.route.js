import { Router } from "express";
const router = Router();

import { getSubCategory, Create_sub_category,get_Sub_Category_Id, delete_Spare_Parts_Category_Id, Update_sub_category } from "../controller/sub_category.controller.js";

router.get("/Sub_category", getSubCategory);
router.get("/Sub_category/:id", get_Sub_Category_Id);
router.post("/Sub_category", Create_sub_category);
router.delete("/Sub_category/:id", delete_Spare_Parts_Category_Id);
router.patch("/Sub_category/:id", Update_sub_category);



export default router;