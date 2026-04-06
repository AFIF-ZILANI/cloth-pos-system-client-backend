import { Hono } from "hono";
import { validate } from "@/middleware/validate.middleware";
import { ProductController } from "@/controllers/product.controller";
import { createProductSchema, updateProductSchema } from "@/schemas/product.schema";

const productRouter = new Hono();

productRouter.post("/create", validate(createProductSchema), ProductController.create);
productRouter.get("/get/all", ProductController.getAll);
productRouter.get("/:id", ProductController.getById);
productRouter.patch("/:id", validate(updateProductSchema), ProductController.update);
productRouter.delete("/:id", ProductController.deleteById);

export default productRouter;