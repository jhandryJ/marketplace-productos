import express from "express";
import productosRoutes from "./routes/productos.routes";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
app.use(express.json());

app.use("/productos", productosRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("API corriendo en http://localhost:3000");
});
