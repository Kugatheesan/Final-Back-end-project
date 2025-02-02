import { Request, Response } from "express";
import pool from "../database";

// ✅ Get all services with categories
export const getAllServices = async (req: Request, res: Response) => {
    try {
        const query = `
            SELECT s.id, s.name, s.description, 
                   json_agg(c.name) AS categories
            FROM services s
            LEFT JOIN service_categories sc ON s.id = sc.service_id
            LEFT JOIN categories c ON sc.category_id = c.id
            GROUP BY s.id;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Get services by category
export const getServicesByCategory = async (req: Request, res: Response) => {
    try {
        const { categoryName } = req.params;
        const query = `
            SELECT s.id, s.name, s.description,  
                   json_agg(c.name) AS categories
            FROM services s
            JOIN service_categories sc ON s.id = sc.service_id
            JOIN categories c ON sc.category_id = c.id
            WHERE c.name = $1
            GROUP BY s.id;
        `;
        const result = await pool.query(query, [categoryName]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: `No services found for category: ${categoryName}` });
        }

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Get a single service by ID
export const getServiceById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const query = `
            SELECT s.id, s.name, s.description, 
                   json_agg(c.name) AS categories
            FROM services s
            LEFT JOIN service_categories sc ON s.id = sc.service_id
            LEFT JOIN categories c ON sc.category_id = c.id
            WHERE s.id = $1
            GROUP BY s.id;
        `;
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Create a new service with multiple categories
export const createService = async (req: Request, res: Response) => {
    try {
        const { name, description, price, categories } = req.body; // Categories will be an array

        // Insert into services table
        const serviceResult = await pool.query(
            "INSERT INTO services (name, description) VALUES ($1, $2) RETURNING id",
            [name, description, price]
        );
        const serviceId = serviceResult.rows[0].id;

        // Insert categories and link them to the service
        for (const category of categories) {
            let categoryResult = await pool.query("SELECT id FROM categories WHERE name = $1", [category]);

            // If category does not exist, create it
            if (categoryResult.rows.length === 0) {
                categoryResult = await pool.query("INSERT INTO categories (name) VALUES ($1) RETURNING id", [category]);
            }

            const categoryId = categoryResult.rows[0].id;
            await pool.query("INSERT INTO service_categories (service_id, category_id) VALUES ($1, $2)", [serviceId, categoryId]);
        }

        res.status(201).json({ message: "Service created successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
