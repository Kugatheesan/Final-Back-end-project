import express from "express";
import { getAllServices, getServicesByCategory, getServiceById, createService, createCategory, getAllCategories,  } from "../conrollers/serviceController";

const routers = express.Router();

routers.get("/", getAllServices); // Get all services
routers.get("/category/:category", getServicesByCategory); // Get services by category
<<<<<<< HEAD
routers.get("/:id", getServiceById); // Get single service by I

=======
routers.get("/:id", getServiceById); // Get single service by ID
routers.post("/services", createService)
routers.post("/addcatgeocary", createCategory)
routers.get("/all", getAllCategories)
>>>>>>> 51c51d2a4c8749f3053d59064742f9aafa12fcd7

export default routers;
