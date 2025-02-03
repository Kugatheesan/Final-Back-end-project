import express from "express";
import { getAllServices, getServicesByCategory, getServiceById, createService } from "../conrollers/serviceController";

const router = express.Router();

router.get("/", getAllServices); // Get all services
router.get("/category/:category", getServicesByCategory); // Get services by category
router.get("/:id", getServiceById); // Get single service by ID
router.post("/", createService); // Create a new service

export default router;
