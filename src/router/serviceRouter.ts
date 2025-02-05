import express from "express";
import { getAllServices, getServicesByCategory, getServiceById, createService, createCategory, getAllCategories,  } from "../conrollers/serviceController";

const routers = express.Router();

routers.get("/", getAllServices); // Get all services
routers.get("/category/:category", getServicesByCategory); // Get services by category
routers.get("/:id", getServiceById); // Get single service by ID
routers.post("/services", createService)
routers.post("/addcatgeocary", createCategory)
routers.get("/all", getAllCategories)

export default routers;
