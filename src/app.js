import express from "express";
import cors from 'cors';
import usersRoutes from "./routes/users.route.js"
import userTypeRoutes from "./routes/user_type.route.js"
import authenticateRoutes from "./routes/authenticate.route.js"
import SparepartsCategoryRoutes from "./routes/spare_parts_category.route.js"
import SubCategryRoutes from "./routes/sub_category.route.js"
import SparepartsRoutes from "./routes/spare_parts.route.js"
const app = express();

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:8081', // aquí va la URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // si usas cookies o sesiones
  }));

app.use("/api",SparepartsRoutes)
app.use("/api",SubCategryRoutes)
app.use("/api",SparepartsCategoryRoutes)
app.use("/api",authenticateRoutes)
app.use("/api",userTypeRoutes)
app.use("/api",usersRoutes)

app.use((req, res) => {
    res.status(404).json({ message: "endpoint not Found" })
})

export default app;