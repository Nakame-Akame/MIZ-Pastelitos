import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/api", (_req, res) => {
  res.json({
    message: "API de MIZ Pastelitos funcionando",
  });
});

app.listen(PORT, () => {
  console.log(
    `MIZ Pastelitos API ejecutándose en http://localhost:${PORT}`
  );
});