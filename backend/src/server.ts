import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const products = [
  {
    id: 1,
    name: "Galleta MIZ",
    description: "Deliciosa galleta MIZ Pastelitos.",
    price: 3.5,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1000&q=85",
    category: "Galletas",
    featured: true,
    available: true,
  },
  {
    id: 2,
    name: "Pastelito MIZ",
    description: "Suave y delicioso pastelito.",
    price: 4.5,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85",
    category: "Pastelitos",
    featured: true,
    available: true,
  },
  {
    id: 3,
    name: "Combo MIZ",
    description: "Una combinación especial de nuestros productos.",
    price: 10,
    image: "https://images.unsplash.com/photo-1576618148400-c9b5f5b2a0a8?auto=format&fit=crop&w=1000&q=85",
    category: "Combos",
    featured: true,
    available: true,
  },
  {
    id: 4,
    name: "Galletas Especiales",
    description: "Una opción especial para disfrutar.",
    price: 5,
    image: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=1000&q=85",
    category: "Galletas",
    featured: false,
    available: true,
  },
];

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

app.get("/api/products", (_req, res) => {
  res.json(products);
});