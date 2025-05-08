import { pool } from "../db.js";


export const getUsersType = async (req, res) => {
    try {
        const [User_Get] = await pool.query("SELECT * FROM tipo_usuario")
        res.send(User_Get);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" })
    }
}

export const createUserType = async (req, res) => {
    const { nombre } = req.body
    try {
        const [result] = await pool.query("INSERT INTO tipo_usuario (nombre) VALUES (?)", [nombre])

        res.send({
            id: result.insertId,
            nombre,
            message: "Tipo de usuario Creado"
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong while creating the user type." })
    }
}

export const getUsersTypeId = async (req, res) => {
    const { id } = req.params
    try {
        const [User_Get] = await pool.query("SELECT * FROM tipo_usuario where id_tipo_usuario = ?", [id])
        if (User_Get.length === 0) return res.status(404).json({ message: "User Type not found" })
        res.json(User_Get[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" })

    }
}


export const deleteUsersTypeId = async (req, res) => {
    const { id } = req.params
    try {
        const [result] = await pool.query("delete FROM tipo_usuario where id_tipo_usuario = ?", [id])
        if (result.affectedRows <= 0) return res.status(404).json({ message: "User Type not found" })
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong while deleting the user type" })
    }
}


export const updateUsersTypeId = async (req, res) => {
    const { id } = req.params
    const { nombre } = req.body
    try {
        const [result] = await
            pool.query("UPDATE tipo_usuario set nombre = IFNULL(?, nombre) where id_tipo_usuario = ?", [nombre, id])
        if (result.affectedRows <= 0) return res.status(404).json({ message: "User Type not found" })
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong while updating the user type" })

    }

}
