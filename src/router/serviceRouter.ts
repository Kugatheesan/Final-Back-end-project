import express from "express";
import { getAllServices, getServicesByCategory, getServiceById } from "../conrollers/serviceController";

const routers = express.Router();

routers.get("/", getAllServices); // Get all services
routers.get("/category/:category", getServicesByCategory); // Get services by category
routers.get("/:id", getServiceById); // Get single service by I


export default routers;
