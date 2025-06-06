import { Router } from "express";
import {
    getCompanies,
    createCompany,
    getCompanyById,
    deleteCompanyById,
    updateCompanyById
} from "../controller/Company.controller.js";

const router = Router();

router.get("/company", getCompanies);
router.post("/company", createCompany);
router.get("/company/:id", getCompanyById);
router.patch("/company/:id", updateCompanyById);
router.delete("/company/:id", deleteCompanyById);

export default router;
