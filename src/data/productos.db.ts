import { Producto } from "../schemas/producto.schema";

export interface ProductoConId extends Producto {
  id: number;
}

export const productos: ProductoConId[] = [];

export function generarId() {
  return productos.length === 0 ? 1 : productos[productos.length - 1].id + 1;
}
