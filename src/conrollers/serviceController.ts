import { Request, Response } from "express";
import pool from '../database'
import { promises } from "dns";


// not working

export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query("SELECT * FROM categories");

        if (result.rows.length === 0) {
            // Send the response without returning res
            res.status(404).json({ message: "No categories found." });
            return; // Just return here, no need to return res
        }

        // Send the result rows as JSON
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Create a new category
export const createCategory = async (req: Request, res: Response):Promise<any>  => {
    try {
        const { name, description, service_id } = req.body;

        // Validate input
        if (!name || !service_id) {
            return res.status(400).json({ message: "Category name and service_id are required." });
        }

        // Check if the service_id exists in the services table
        const serviceCheck = await pool.query("SELECT id FROM services WHERE id = $1", [service_id]);

        if (serviceCheck.rows.length === 0) {
            return res.status(400).json({ message: `Service with ID ${service_id} does not exist.` });
        }

        // Insert new category
        const result = await pool.query(
            "INSERT INTO categories (name, description, service_id) VALUES ($1, $2, $3) RETURNING *",
            [name, description, service_id]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all services (without filtering)
export const getAllServices = async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM services");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get services by category (corporate, family, television, etc.) not working
export const getServicesByCategory = async (req: Request, res: Response): Promise<any> => {
    const { category } = req.params;

    if (!category) {
        return res.status(400).json({ message: "Category parameter is required" });
    }

    try {
        const result = await pool.query("SELECT * FROM services WHERE category = $1", [category]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: `No services found for category: ${category}` });
        }

        return res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching services by category:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Get a single service by ID
export const getServiceById = async (req: Request, res: Response):Promise<any> => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM services WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Create a new service (with category)
// Create a new service
export const createService = async (req: Request, res: Response):Promise<any> => {
    try {
        const { name } = req.body;

        // Ensure the name is provided
        if (!name) {
            return res.status(400).json({ message: "Service name is required." });
        }

        const result = await pool.query(
            "INSERT INTO services (name) VALUES ($1) RETURNING *",
            [name]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error creating service:", error);
        res.status(500).json({ message: "Server error" });
    }
};

//editCaregoty
export const editCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { name, description, service_id } = req.body;

        // Validate input
        if (!id) {
            return res.status(400).json({ message: "Category ID is required." });
        }
        if (!name || !service_id) {
            return res.status(400).json({ message: "Category name and service_id are required." });
        }

        // Check if the category exists
        const categoryCheck = await pool.query("SELECT id FROM categories WHERE id = $1", [id]);
        if (categoryCheck.rows.length === 0) {
            return res.status(404).json({ message: `Category with ID ${id} not found.` });
        }

        // Check if the service_id exists
        const serviceCheck = await pool.query("SELECT id FROM services WHERE id = $1", [service_id]);
        if (serviceCheck.rows.length === 0) {
            return res.status(400).json({ message: `Service with ID ${service_id} does not exist.` });
        }

        // Update category
        const result = await pool.query(
            "UPDATE categories SET name = $1, description = $2, service_id = $3 WHERE id = $4 RETURNING *",
            [name, description, service_id, id]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Server error" });
    }
};

//edit service
export const editService = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        // Validate input
        if (!id) {
            return res.status(400).json({ message: "Service ID is required." });
        }
        if (!name) {
            return res.status(400).json({ message: "Service name is required." });
        }

        // Check if the service exists
        const serviceCheck = await pool.query("SELECT id FROM services WHERE id = $1", [id]);
        if (serviceCheck.rows.length === 0) {
            return res.status(404).json({ message: `Service with ID ${id} not found.` });
        }

        // Update service
        const result = await pool.query(
            "UPDATE services SET name = $1, description = $2 WHERE id = $3 RETURNING *",
            [name, description, id]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error updating service:", error);
        res.status(500).json({ message: "Server error" });
    }
};

//delete service
export const deleteService = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        // Validate input
        if (!id) {
            return res.status(400).json({ message: "Service ID is required." });
        }

        // Check if the service exists
        const serviceCheck = await pool.query("SELECT id FROM services WHERE id = $1", [id]);
        if (serviceCheck.rows.length === 0) {
            return res.status(404).json({ message: `Service with ID ${id} not found.` });
        }

        // Delete service
        await pool.query("DELETE FROM services WHERE id = $1", [id]);

        res.status(200).json({ message: "Service deleted successfully." });
    } catch (error) {
        console.error("Error deleting service:", error);
        res.status(500).json({ message: "Server error" });
    }
};
//delete category
export const deleteCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        // Validate input
        if (!id) {
            return res.status(400).json({ message: "Category ID is required." });
        }

        // Check if the category exists
        const categoryCheck = await pool.query("SELECT id FROM categories WHERE id = $1", [id]);
        if (categoryCheck.rows.length === 0) {
            return res.status(404).json({ message: `Category with ID ${id} not found.` });
        }

        // Delete category
        await pool.query("DELETE FROM categories WHERE id = $1", [id]);

        res.status(200).json({ message: "Category deleted successfully." });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Server error" });
    }
};


