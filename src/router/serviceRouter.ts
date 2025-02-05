import express from "express";
import { getAllServices, getServicesByCategory, getServiceById, createService, createCategory, getAllCategories, editCategory, editService, deleteService, deleteCategory,  } from "../conrollers/serviceController";

const routers = express.Router();

routers.get("/", getAllServices); // Get all services
routers.get("/category/:category", getServicesByCategory); // Get services by category
routers.get("/:id", getServiceById); // Get single service by I
routers.get("/:id", getServiceById); // Get single service by ID
routers.post("/services", createService)
routers.post("/addcatgeocary", createCategory)
routers.get("/all", getAllCategories)
routers.put("/catedit", editCategory )
routers.put("/seredit", editService)
routers.delete("/serdelete", deleteService)
routers.delete("/catdelete",deleteCategory)


export default routers;
