import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mailRoutes from "./routes/mailRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", mailRoutes);
app.get('/', (req, res) => res.send('Hello World'));
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

