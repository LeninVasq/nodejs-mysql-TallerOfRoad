import { pool } from "../db.js";

// Get all companies
export const getCompanies = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Empresas");
        res.send(rows);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching companies." });
    }
};

// Create a new company
export const createCompany = async (req, res) => {
    const { Nombre_empresas, Estado, Direccion, Telefono, Correo, NIT, Descripcion } = req.body;
    try {
        const [result] = await pool.query(
            `INSERT INTO Empresas (Nombre_empresas, Estado, Direccion, Telefono, Correo, NIT, Descripcion)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [Nombre_empresas, Estado, Direccion, Telefono, Correo, NIT, Descripcion]
        );
        res.send({
            id: result.insertId,
            message: "Company created successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: "Error creating company." });
    }
};

// Get company by ID
export const getCompanyById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM Empresas WHERE id_empresas = ?", [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Company not found" });
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching company." });
    }
};

// Delete company by ID
export const deleteCompanyById = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query("DELETE FROM Empresas WHERE id_empresas = ?", [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Company not found" });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Error deleting company." });
    }
};

// Update company by ID
export const updateCompanyById = async (req, res) => {
    const { id } = req.params;
    const { Nombre_empresas, Estado, Direccion, Telefono, Correo, NIT, Descripcion } = req.body;
    try {
        const [result] = await pool.query(
            `UPDATE Empresas SET
                Nombre_empresas = IFNULL(?, Nombre_empresas),
                Estado = IFNULL(?, Estado),
                Direccion = IFNULL(?, Direccion),
                Telefono = IFNULL(?, Telefono),
                Correo = IFNULL(?, Correo),
                NIT = IFNULL(?, NIT),
                Descripcion = IFNULL(?, Descripcion)
             WHERE id_empresas = ?`,
            [Nombre_empresas, Estado, Direccion, Telefono, Correo, NIT, Descripcion, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: "Company not found" });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Error updating company." });
    }
};
