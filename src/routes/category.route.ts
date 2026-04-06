import { Hono } from "hono";
import { categoryController } from "@/controllers/category.controller";

const categoryRouter = new Hono();

categoryRouter.post("/create", categoryController.createCategory);
categoryRouter.get("/get/all", categoryController.getCategories);
categoryRouter.patch("/:id", categoryController.updateCategory);
categoryRouter.delete("/:id", categoryController.deleteCategory);

export default categoryRouter;