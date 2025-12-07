
## **API CRUD de Productos Agrícolas (Marketplace Agrícola)**

##  **Descripción del Proyecto**

Este proyecto implementa una **API REST CRUD** para gestionar productos agrícolas del *Marketplace Agrícola*.
Está desarrollada usando:

* **Node.js**
* **Express**
* **TypeScript**
* **Zod** para validación de datos

Los datos se almacenan temporalmente en un **arreglo en memoria**, sin base de datos.

Este proyecto forma parte de la práctica evaluada de Desarrollo de APIs, aplicando:

* Validación mediante Zod
* CRUD completo
* Manejo centralizado de errores
* Buenas prácticas de arquitectura
* Documentación y pruebas con Thunder Client/Postman

---

#  **Tecnologías utilizadas**

| Tecnología  | Uso                    |
| ----------- | ---------------------- |
| Node.js     | Backend runtime        |
| Express     | Framework web          |
| TypeScript  | Tipado estático        |
| Zod         | Validación de datos    |
| ts-node-dev | Servidor de desarrollo |

---

#  **Estructura del Proyecto**

```
src/
│── index.ts
│── data/
│   └── productos.db.ts
│── schemas/
│   └── producto.schema.ts
│── routes/
│   └── productos.routes.ts
│── middlewares/
│   └── error-handler.ts
│── capturas/
│     ├── post-crear.png
│     ├── get-listado.png
│     ├── get-id.png
│     ├── put-actualizar.png
│     ├── delete-eliminar.png
│     └── pruebaerrores/
│           └── error-validacion.png
```

---

# **Instalación y ejecución**

###  Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/marketplace-productos.git
cd marketplace-productos
```

###  Instalar dependencias

```bash
npm install
```

###  Ejecutar en desarrollo

```bash
npm run dev
```

Servidor disponible en:
**[http://localhost:3000](http://localhost:3000)**

---

#  **Modelo de Datos – Producto Agrícola**

```ts
{
  id: number;
  nombre: string;
  categoria: string;
  precioUnitario: number;
  unidadMedida: "kg" | "lb" | "unidad" | "litro";
  stock: number;
  esOrganico: boolean;
  productor: string;
}
```

---

#  **Validación con Zod**

Ejemplo del esquema usado en la API:

```ts
const ProductoSchema = z.object({
  nombre: z.string().min(3),
  categoria: z.string().min(3),
  precioUnitario: z.number().positive(),
  unidadMedida: z.enum(["kg", "lb", "unidad", "litro"]),
  stock: z.number().int().nonnegative(),
  esOrganico: z.boolean(),
  productor: z.string().min(3)
});
```

La API retornará errores estructurados si los datos no cumplen la validación.

---

#  **Documentación de Endpoints**

---

## ** Listar productos**

### GET `/productos`

####  Respuesta 200:

```json
[
  {
    "id": 1,
    "nombre": "Papa chola",
    "categoria": "Tubérculo",
    "precioUnitario": 0.30,
    "unidadMedida": "kg",
    "stock": 200,
    "esOrganico": true,
    "productor": "Finca El Sol"
  }
]
```

---

## ** Obtener producto por ID**

### GET `/productos/:id`

####  Respuesta 200:

```json
{
  "id": 1,
  "nombre": "Papa chola",
  "categoria": "Tubérculo",
  "precioUnitario": 0.30,
  "unidadMedida": "kg",
  "stock": 200,
  "esOrganico": true,
  "productor": "Finca El Sol"
}
```

#### Respuesta 404:

```json
{
  "error": true,
  "message": "Producto no encontrado"
}
```

---

## ** Crear producto**

### POST `/productos`

### Body (JSON):

```json
{
  "nombre": "Papa chola",
  "categoria": "Tubérculo",
  "precioUnitario": 0.30,
  "unidadMedida": "kg",
  "stock": 200,
  "esOrganico": true,
  "productor": "Finca El Sol"
}
```

#### Respuesta 201:

```json
{
  "id": 1,
  "nombre": "Papa chola",
  "categoria": "Tubérculo",
  "precioUnitario": 0.30,
  "unidadMedida": "kg",
  "stock": 200,
  "esOrganico": true,
  "productor": "Finca El Sol"
}
```

---

## ** Actualizar producto**

### PUT `/productos/:id`

### Body:

```json
{
  "precioUnitario": 0.40,
  "stock": 180
}
```

####  Respuesta 200:

```json
{
  "id": 1,
  "nombre": "Papa chola",
  "categoria": "Tubérculo",
  "precioUnitario": 0.40,
  "unidadMedida": "kg",
  "stock": 180,
  "esOrganico": true,
  "productor": "Finca El Sol"
}
```

---

## ** Eliminar producto**

### DELETE `/productos/:id`

#### ✔ Respuesta 200:

```json
{
  "message": "Producto eliminado"
}
```

---

# Manejo Centralizado de Errores

Ejemplo de error Zod:

```json
{
  "error": true,
  "message": "Error de validación",
  "detalles": [
    {
      "campo": "precioUnitario",
      "mensaje": "Expected number, received string"
    }
  ]
}
```

---

# **CAPTURAS DE PRUEBAS (Thunder Client / Postman)**

## POST – Crear producto

![POST crear](src/capturas/metodo POST.png)

## GET – Listar productos

![GET listado](src/capturas/metodo GET.png)

## GET – Obtener por ID

![GET ID](src/capturas/metodo GET.png)

## PUT – Actualizar producto

![PUT actualizar](src/capturas/metodo PUT.png)

## DELETE – Eliminar producto

![DELETE eliminar](src/capturas/metodo DELETEr.png)

---

# **Prueba de error de validación**

![Error Zod](src/capturas/prueba de errores/prueba de error.png)

---

# **Repositorio**


## https://github.com/jhandryJ/marketplace-productos.git

