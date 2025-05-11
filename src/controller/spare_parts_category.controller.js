import { pool } from "../db.js";


export const getSparePartCategory = async (req, res) => {
    try {
        const [spare_parts_category_Get] = await pool.query("SELECT * FROM categorias_repuestos")
        res.send(spare_parts_category_Get);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" })
    }
}


export const Created_Spare_parts_Category = async (req, res) => {
    const { name } = req.body
    const {description} = req.body
    const {photo} = req.body

    try {
        const [result] = await pool.query("CALL Created_Spare_parts_Category (?,?,?)",
             [name, description,photo])

        
        res.json(result[0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong while creating the user." })
    }
}

export const get_Spare_Parts_Category_Id = async (req, res) => {
    const { id } = req.params
    try {
        const [Spare_parts_category] = await pool.query("SELECT * FROM categorias_repuestos where id_categorias_repuestos = ?", [id])
        if (Spare_parts_category.length === 0) return res.status(404).json({ message: "Spare parts category not found" })
        res.json(Spare_parts_category[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" })

    }
}



export const delete_Spare_Parts_Category_Id = async (req, res) => {
    const { id } = req.params
    try {
        const [Spare_parts_category] = await pool.query("delete FROM categorias_repuestos where id_categorias_repuestos = ?", [id])
        if (Spare_parts_category.length === 0) return res.status(404).json({ message: "Spare parts category not found" })
        res.json(Spare_parts_category[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" })

    }
}



export const Update_Spare_parts_Category = async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const { description } = req.body
    const { photo } = req.body
    const { status } = req.body
    try {
        const [result] = await pool.query("CALL Update_Spare_parts_Category (?,?,?,?,?)",
            [id,name, description,photo,status])
            
            if (result[0]?.[0]?.error_message  === "The spare parts category not exists") {
                return res.status(404).json({ message: "Spare parts category not found" })  
            }
            else{
                return res.status(200).json({ message: result[0]?.[0]?.successful_message })  
            }
          
        
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong while updating the user type" })

    }

}


