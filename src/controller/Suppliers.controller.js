import { pool } from "../db.js";

// Get all suppliers
export const getSuppliers = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Proveedores");
        res.send(rows);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching suppliers." });
    }
};

// Create a new supplier
export const createSupplier = async (req, res) => {
    const { Nombre_proveedor, Apellido_Proveedor, Telefono, Correo, id_empresa } = req.body;
    try {
        const [result] = await pool.query(
            `INSERT INTO Proveedores (Nombre_proveedor, Apellido_Proveedor, Telefono, Correo, id_empresa)
             VALUES (?, ?, ?, ?, ?)`,
            [Nombre_proveedor, Apellido_Proveedor, Telefono, Correo, id_empresa]
        );
        res.send({
            id: result.insertId,
            message: "Supplier created successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: "Error creating supplier." });
    }
};

// Get supplier by ID
export const getSupplierById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM Proveedores WHERE id_proveedores = ?", [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Supplier not found" });
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching supplier." });
    }
};

// Delete supplier by ID
export const deleteSupplierById = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query("DELETE FROM Proveedores WHERE id_proveedores = ?", [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Supplier not found" });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Error deleting supplier." });
    }
};

// Update supplier by ID
export const updateSupplierById = async (req, res) => {
    const { id } = req.params;
    const { Nombre_proveedor, Apellido_Proveedor, Telefono, Correo, id_empresa } = req.body;
    try {
        const [result] = await pool.query(
            `UPDATE Proveedores SET
                Nombre_proveedor = IFNULL(?, Nombre_proveedor),
                Apellido_Proveedor = IFNULL(?, Apellido_Proveedor),
                Telefono = IFNULL(?, Telefono),
                Correo = IFNULL(?, Correo),
                id_empresa = IFNULL(?, id_empresa)
             WHERE id_proveedores = ?`,
            [Nombre_proveedor, Apellido_Proveedor, Telefono, Correo, id_empresa, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: "Supplier not found" });

        res.send({
            id,
            message: "Supplier updated successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: "Error updating supplier." });
    }
};
