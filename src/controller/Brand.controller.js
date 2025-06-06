import { pool } from "../db.js";

// Obtener todas las marcas
export const getBrands = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Marca");
        res.send(rows);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching brands." });
    }
};

// Crear una nueva marca
export const createBrand = async (req, res) => {
    const { Nombre, Estado } = req.body;
    try {
        const [result] = await pool.query(
            "INSERT INTO Marca (Nombre, Estado) VALUES (?, ?)",
            [Nombre, Estado]
        );
        res.send({
            id: result.insertId,
            message: "Brand created successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: "Error creating brand." });
    }
};

// Obtener una marca por ID
export const getBrandById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM Marca WHERE id_marca = ?", [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Brand not found" });
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching brand." });
    }
};

// Eliminar una marca por ID
export const deleteBrandById = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query("DELETE FROM Marca WHERE id_marca = ?", [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Brand not found" });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Error deleting brand." });
    }
};

// Actualizar una marca por ID
export const updateBrandById = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Estado } = req.body;
    try {
        const [result] = await pool.query(
            `UPDATE Marca SET 
                Nombre = IFNULL(?, Nombre),
                Estado = IFNULL(?, Estado)
             WHERE id_marca = ?`,
            [Nombre, Estado, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: "Brand not found" });

        res.send({
            id,
            message: "Brand updated successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: "Error updating brand." });
    }
};
