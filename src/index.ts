import express, { type Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./routes/index.js";
import './utils/db.connect.js'
import deserializeUser from "./middleware/deserializedToken.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(deserializeUser)

routes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
