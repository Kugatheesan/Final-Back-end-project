import express from "express";
import { getAllServices, getServiceById, getServicesByCategory, createService } from "../conrollers/serviceController";

const router = express.Router();

router.get("/", getAllServices); // Get all services
router.get("/:id", getServiceById); // Get service by ID
router.get("/category/:categoryName", getServicesByCategory); // Get services by category name
router.post("/", createService); // Create a service

export default router;
