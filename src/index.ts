import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import swaggerUI from "swagger-ui-express";
import { errorHandler } from "./core/middlewares/errorHandler";

import swaggerDocument from "../swagger.json";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.get("/", (req, res) => {
    res.json({
        timestamp: new Date(),
    });
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

export default app;

