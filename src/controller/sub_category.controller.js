import { pool } from "../db.js";


export const getSubCategory = async (req, res) => {
    try {
        const [sub_categorys_Get] = await pool.query("SELECT * FROM sub_categorias")
        res.send(sub_categorys_Get);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" })
    }
}


export const Create_sub_category = async (req, res) => {
    const { name } = req.body
    const {description} = req.body
    const {photo} = req.body
    const {spare_parts_category_id} = req.body

    try {
        const [result] = await pool.query("CALL Create_sub_category (?,?,?,?)",
             [name, description,photo, spare_parts_category_id])
        
        res.json(result[0][0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong while creating the user." })
    }
}


export const get_Sub_Category_Id = async (req, res) => {
    const { id } = req.params
    try {
        const [Sub_category_id] = await pool.query("SELECT * FROM sub_categorias where id_sub_categorias = ?", [id])
        if (Sub_category_id.length === 0) return res.status(404).json({ message: "Sub category not found" })
        res.json(Sub_category_id[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" })

    }
}


export const delete_Spare_Parts_Category_Id = async (req, res) => {
    const { id } = req.params
    try {
        const [Sub_category_id] = await pool.query("delete FROM sub_categorias where id_sub_categorias = ?", [id])
        if (Sub_category_id.affectedRows <= 0) return res.status(404).json({ message: "Sub category not found" })
            
            res.json(Sub_category_id[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" })

    }
}


export const Update_sub_category = async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const { description } = req.body
    const { photo } = req.body
    const { status } = req.body
    try {
        const [result] = await pool.query("CALL Update_sub_category (?,?,?,?,?)",
            [id,name, description,photo,status])

            if (result[0]?.[0]?.error_message  === "The sub category not exists") {
                return res.status(404).json({ message: "Sub category not found" })  
            }
            else{
                return res.status(200).json({ message: result[0]?.[0]?.successful_message })  
            }
          
        
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong while updating the user type" })

    }

}