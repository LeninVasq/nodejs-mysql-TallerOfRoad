import { Router } from "express";
import {
    getBrands,
    createBrand,
    getBrandById,
    deleteBrandById,
    updateBrandById
} from "../controller/Brand.controller.js";

const router = Router();

router.get("/brands", getBrands);
router.post("/brands", createBrand);
router.get("/brands/:id", getBrandById);
router.delete("/brands/:id", deleteBrandById);
router.put("/brands/:id", updateBrandById);

export default router;
