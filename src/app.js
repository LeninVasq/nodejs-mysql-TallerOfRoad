import express from "express";
import usersRoutes from "./routes/users.route.js"
import userTypeRoutes from "./routes/user_type.route.js"
import authenticateRoutes from "./routes/authenticate.route.js"
const app = express();

app.use(express.json())

app.use("/api",authenticateRoutes)
app.use("/api",userTypeRoutes)
app.use("/api",usersRoutes)

app.use((req, res) => {
    res.status(404).json({ message: "endpoint not Found" })
})

export default app;