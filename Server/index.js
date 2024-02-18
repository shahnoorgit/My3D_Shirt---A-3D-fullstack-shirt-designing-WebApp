import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import dalleRoute from "./Routes/Dalle.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/dalle", dalleRoute);

app.listen(8080, () => console.log("running"));
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hii Thereee" });
});
