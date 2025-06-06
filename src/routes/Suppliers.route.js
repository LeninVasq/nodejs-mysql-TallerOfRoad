import { Router } from "express";
import {
    getSuppliers,
    createSupplier,
    getSupplierById,
    updateSupplierById,
    deleteSupplierById
} from "../controller/Suppliers.controller.js";

const router = Router();

router.get("/suppliers", getSuppliers);
router.post("/suppliers", createSupplier);
router.get("/suppliers/:id", getSupplierById);
router.patch("/suppliers/:id", updateSupplierById);
router.delete("/suppliers/:id", deleteSupplierById);

export default router;
