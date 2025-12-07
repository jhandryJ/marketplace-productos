import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);

  // Validación con Zod
  if (error instanceof ZodError) {
    return res.status(400).json({
      error: true,
      message: "Error de validación",
      detalles: error.issues.map((issue) => ({
        campo: issue.path.join("."),
        mensaje: issue.message,
      })),
    });
  }

  // Error genérico
  return res.status(500).json({
    error: true,
    message: error instanceof Error ? error.message : "Error interno del servidor",
  });
}
