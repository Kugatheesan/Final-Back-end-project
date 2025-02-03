import { Request, Response } from "express";
import pool from '../database'
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
// Get services by category (corporate, family, television, etc.)
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
export const createService = async (req: Request, res: Response) => {
    try {
        const { name, category, description, price } = req.body;
        const result = await pool.query(
            "INSERT INTO services (name, category, description) VALUES ($1, $2, $3) RETURNING *",
            [name, category, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
