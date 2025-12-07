import { z } from "zod";

export const ProductoSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener mínimo 3 caracteres"),
  categoria: z.string().min(3, "La categoría es obligatoria"),
  precioUnitario: z.number().positive("El precio debe ser mayor que 0"),
  unidadMedida: z.enum(["kg", "lb", "unidad", "litro"]),
  stock: z.number().int().nonnegative("El stock debe ser un entero ≥ 0"),
  esOrganico: z.boolean(),
  productor: z.string().min(3, "El productor es obligatorio")
});

export type Producto = z.infer<typeof ProductoSchema>;
