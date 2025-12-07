import { Router } from "express";
import { productos, generarId } from "../data/productos.db";
import { ProductoSchema } from "../schemas/producto.schema";

const router = Router();

// ➤ GET /productos
router.get("/", (req, res) => {
  res.json(productos);
});

// ➤ GET /productos/:id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    return res
      .status(404)
      .json({ error: true, message: "Producto no encontrado" });
  }

  res.json(producto);
});

// ➤ POST /productos
router.post("/", (req, res, next) => {
  try {
    const data = ProductoSchema.parse(req.body);
    const nuevo = { id: generarId(), ...data };
    productos.push(nuevo);

    res.status(201).json(nuevo);
  } catch (error) {
    next(error);
  }
});

// ➤ PUT /productos/:id
router.put("/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const index = productos.findIndex(p => p.id === id);

    if (index === -1) {
      return res
        .status(404)
        .json({ error: true, message: "Producto no encontrado" });
    }

    const data = ProductoSchema.partial().parse(req.body);

    productos[index] = {
      ...productos[index],
      ...data,
      id // 🔥 Solución para evitar errores de TypeScript
    };

    res.json(productos[index]);
  } catch (error) {
    next(error);
  }
});

// ➤ DELETE /productos/:id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = productos.findIndex(p => p.id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ error: true, message: "Producto no encontrado" });
  }

  productos.splice(index, 1);

  res.json({ message: "Producto eliminado" });
});

export default router;
