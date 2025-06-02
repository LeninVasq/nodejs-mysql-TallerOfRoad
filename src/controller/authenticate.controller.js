import { pool } from "../db.js";
import bcrypt from 'bcrypt';


const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


export const close_session = async (req, res) => {
    const {id} = req.body;
    try {
        const [result] = await pool.query("CALL close_session (?)", [id]);
        if (result.affectedRows <= 0) return res.status(404).json({ message: "could not close session" })

        res.json(result[0][0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong while closing the session." });
    }
}

export const sign_up_user = async (req, res) => {
    const { name } = req.body
    const {last_name} = req.body
    const {email} = req.body
    const {password} = req.body
    const {phone} = req.body
    const {id_user_type} = req.body
    const {status} = req.body

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        const [result] = await pool.query("CALL sign_up (?,?,?,?,?,?,?)",
             [name, last_name,email,hashedPassword,phone,id_user_type, status])

        
        res.json(result[0][0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong while creating the user." })
    }
}



export const sign_in_user = async (req, res) => {
    const { email } = req.body
    const { password } = req.body
    const token = await bcrypt.hash(email+password, saltRounds);
    try {
        const [result] = await pool.query("CALL sign_in (?,?)",
             [email,token])

             if (result[0]?.[0]?.successful_message  === "Invalid credentials") {
                return res.status(400).json({ message: "Invalid credentials"});

              } else {

                const user = result[0][0];
                const isMatch = await bcrypt.compare(password, user.contrasenia);
                if (!isMatch) {
                    return res.status(401).json({ message: "Invalid credentialss" });
                }
                res.send(result[0][0]);
            }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong while verifying the user." })
    }
}
